const assert = require('assert');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const Provider = require('oidc-provider');
const cors = require('cors');

assert(process.env.APP_URL, 'APP_URL missing');
console.log(`APP_URL=${process.env.APP_URL}`);

assert(process.env.AUTH_URL, 'AUTH_URL missing');
console.log(`AUTH_URL=${process.env.AUTH_URL}`);

assert(process.env.TZ, 'TZ missing');
console.log(`TZ=${process.env.TZ}`);

assert(process.env.PORT, 'process.env.PORT missing');
assert(process.env.SECURE_KEY, 'process.env.SECURE_KEY missing, run `heroku addons:create securekey`');
assert.equal(process.env.SECURE_KEY.split(',').length, 2, 'process.env.SECURE_KEY format invalid');

const jwks = require('./jwks.json');

// simple account model for this application, user list is defined like so
const Account = require('./account');

const startAuth = () => {

  const clientSettings = {
    client_id: 'fooclient',
    redirect_uris: [
      `${process.env.APP_URL}/signin-callback.html`,
      `${process.env.APP_URL}/silent-renew.html`
    ],
    post_logout_redirect_uris: [`${process.env.APP_URL}`],
    response_types: ['code'],
    grant_types: ['authorization_code', 'refresh_token'],
    token_endpoint_auth_method: 'none',
  };
  console.log('client settings', clientSettings);

  // Don't miss trailing slash here !!!
  const oidc = new Provider(`${process.env.AUTH_URL}/`, {
    // adapter: RedisAdapter,
    clients: [ clientSettings ],
    jwks,

    // oidc-provider only looks up the accounts by their ID when it has to read the claims,
    // passing it our Account model method is sufficient, it should return a Promise that resolves
    // with an object with accountId property and a claims method.
    findAccount: Account.findAccount,

    // let's tell oidc-provider you also support the email scope, which will contain email and
    // email_verified claims
    claims: {
      openid: ['sub'],
      email: ['email', 'email_verified'],
      profile: ['name'],
      offline_access: [],
    },

    formats: {
      AccessToken: 'jwt',
    },

    // let's tell oidc-provider where our own interactions will be
    // setting a nested route is just good practice so that users
    // don't run into weird issues with multiple interactions open
    // at a time.
    interactions: {
      url(ctx) {
        return `/interaction/${ctx.oidc.uid}`;
      },
    },
    features: {
      devInteractions: { enabled: false },
      introspection: { enabled: true },
      revocation: { enabled: true },
    },
    meta: {
      authorization: 'whateveritis'
    }
  });

  oidc.proxy = true;
  oidc.keys = process.env.SECURE_KEY.split(',');

  const expressApp = express();

  expressApp.use(cors());

  expressApp.set('trust proxy', true);
  expressApp.set('view engine', 'ejs');
  expressApp.set('views', path.resolve(__dirname, 'views'));

  const parse = bodyParser.urlencoded({ extended: false });

  function setNoCache(req, res, next) {
    res.set('Pragma', 'no-cache');
    res.set('Cache-Control', 'no-cache, no-store');
    next();
  }

  expressApp.get('/interaction/:uid', setNoCache, async (req, res, next) => {
    try {
      const details = await oidc.interactionDetails(req, res);
      console.log('see what else is available to you for interaction views', details);

      const { uid, prompt, params } = details;
      console.log('Prompt: ', JSON.stringify(prompt));

      const client = await oidc.Client.find(params.client_id);

      if (prompt.name === 'login') {
        return res.render('login', {
          client,
          uid,
          details: prompt.details,
          params,
          title: 'Sign-in',
          flash: undefined,
        });
      }

      return res.render('interaction', {
        client,
        uid,
        details: prompt.details,
        params,
        title: 'Authorize',
      });
    } catch (err) {
      return next(err);
    }
  });

  expressApp.post('/interaction/:uid/login', setNoCache, parse, async (req, res, next) => {
    try {
      const { uid, prompt, params } = await oidc.interactionDetails(req, res);
      const client = await oidc.Client.find(params.client_id);

      const accountId = await Account.authenticate(req.body.email, req.body.password);

      if (!accountId) {
        res.render('login', {
          client,
          uid,
          details: prompt.details,
          params: {
            ...params,
            login_hint: req.body.email,
          },
          title: 'Sign-in',
          flash: 'Invalid email or password.',
        });
        return;
      }

      const result = {
        login: {
          account: accountId,
        },
      };

      await oidc.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
    } catch (err) {
      next(err);
    }
  });

  expressApp.post('/interaction/:uid/confirm', setNoCache, parse, async (req, res, next) => {
    try {
      const result = {
        consent: {
          // rejectedScopes: [], // < uncomment and add rejections here
          // rejectedClaims: [], // < uncomment and add rejections here
        },
      };
      await oidc.interactionFinished(req, res, result, { mergeWithLastSubmission: true });
    } catch (err) {
      next(err);
    }
  });

  expressApp.get('/interaction/:uid/abort', setNoCache, async (req, res, next) => {
    try {
      const result = {
        error: 'access_denied',
        error_description: 'End-User aborted interaction',
      };
      await oidc.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
    } catch (err) {
      next(err);
    }
  });

  // leave the rest of the requests to be handled by oidc-provider, there's a catch all 404 there
  expressApp.use('/', oidc.callback);

  // express listen
  expressApp.listen(process.env.PORT);
}

setTimeout(startAuth, 1000);

