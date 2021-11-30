import { Log, User, UserManager, WebStorageStateStore } from 'oidc-client';

import { Constants } from '../../helpers/Constants';

export default class AuthService {
  private userManager: UserManager;

  constructor() {
    this.userManager = new UserManager({
      userStore: new WebStorageStateStore({ store: window.sessionStorage }),
      authority: Constants.stsAuthority,
      client_id: Constants.clientId,
      redirect_uri: `${Constants.clientRoot}/signin-callback.html`,
      silent_redirect_uri: `${Constants.clientRoot}/silent-renew.html`,
      post_logout_redirect_uri: `${Constants.clientRoot}`,
      response_type: Constants.responseType,
      scope: Constants.clientScope,
      extraQueryParams: {
        audience: Constants.audience,
      },
    });

    Log.logger = console;
    Log.level = Log.INFO;

    this.userManager.events.addSilentRenewError((e: Error) => {
      console.error('silent renew error', e.message);
    });

    this.userManager.events.addAccessTokenExpired(() => {
      this.signinSilent();
    });
  }

  public signinRedirectCallback() {
    return this.userManager.signinRedirectCallback();
  }

  public renewToken() {
    return this.userManager.signinSilent();
  }

  public async getUser() {
    const user = await this.userManager.getUser();
    return user;
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public signinRedirect() {
    localStorage.setItem('redirectUri', window.location.pathname);
    this.userManager.signinRedirect({});
  }

  public isAuthenticated = () => {
    const authUrl = process.env.REACT_APP_AUTH_URL;
    const identityClientId = process.env.REACT_APP_IDENTITY_CLIENT_ID;
    const item: string = sessionStorage.getItem(
      `oidc.user:${authUrl}:${identityClientId}`,
    ) as string;
    if (!item) {
      return false;
    }
    const oidcStorage = JSON.parse(item);

    return !!oidcStorage && !!oidcStorage.access_token;
  };

  public signinSilent() {
    this.userManager
      .signinSilent()
      .then((user?: User) => {
        // eslint-disable-next-line no-console
        console.log('silent signed in', user);
      })
      .catch((err: Error) => {
        console.error('Error while silent signin', err);
      });
  }

  public signinSilentCallback() {
    this.userManager.signinSilentCallback();
    console.log('hello');
  }

  public async logout() {
    await this.userManager
      .signoutRedirect({
        id_token_hint: localStorage.getItem('id_token'),
      })
      .catch((err) => {
        console.warn('😋 Eating error:', err);
        const returnTo = encodeURIComponent(Constants.clientRoot);
        const url =
          `${Constants.stsAuthority}/v2/logout?` +
          `client_id=${Constants.clientId}&returnTo=${returnTo}`;
        window.location.replace(url);

        // Because auth0 does not support normal end_session_url
        // https://auth0.com/docs/logout/guides/redirect-users-after-logout
        // https://github.com/IdentityModel/oidc-client-js/pull/1068
        // https://blog.ardourdigital.co.uk
        //   /b/blog/posts/using-javascript-oidc-client-with-auth0
      });

    this.userManager.clearStaleState();
  }

  public signoutRedirectCallback() {
    this.userManager.signoutRedirectCallback().then(() => {
      localStorage.clear();
      window.location.replace(process.env.REACT_APP_PUBLIC_URL || '');
    });
    this.userManager.clearStaleState();
  }
}
