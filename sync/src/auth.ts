import { JwksClient } from 'jwks-rsa';
import * as jwt  from "jsonwebtoken";
import { GetPublicKeyOrSecret, VerifyOptions } from 'jsonwebtoken';
import * as express from 'express';

const getKey: GetPublicKeyOrSecret = (header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) => {

  if (!process.env.JWKS_URL) {
    throw new Error("JWKS_URL not configured");
  }
  const jwksClientOpts = {
    jwksUri: process.env.JWKS_URL
  };
  console.log(jwksClientOpts);
  const client = new JwksClient(jwksClientOpts);
  

  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
        console.error("Error occured while fetching key: ", err);
    }
    const signingKey = key.getPublicKey();

    // TODO, debug line above `key.getPublicKey()`
    // to see if that is the same as commented line above:
    //
    // const signingKey = key.publicKey || key.rsaPublicKey;

    callback(null, signingKey);
  });
}

const verifyOptions: VerifyOptions = {};

export type UserInfo = {
  subject: string;
}

export const getUserInfo = async (token: string): Promise<UserInfo> => {


  const jwtPromise = new Promise<jwt.JwtPayload>((resolve, reject) => {
    const verifyCallback: jwt.VerifyCallback = (err, decoded: jwt.JwtPayload) => {
      if (err) {
        reject('Cannot verify this token: ' + err);
      } else {
        resolve(decoded);
      }
    }

    jwt.verify(token, getKey, verifyOptions, verifyCallback);
  });
  
  const jwtPayload = await jwtPromise;

  const userInfo: UserInfo = {subject: jwtPayload.sub || 'sub is not there'}

  return userInfo;
}

/**
 * Express middleware
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const authenticated: express.RequestHandler = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    const err = new Error("Authorization header is missing");
    res.status(400).json({'error': err});
    return next(err);
  }

  const token = authHeader.replace('Bearer ','');

  getUserInfo(token)
    .then((userInfo:  UserInfo) => {
      req.params.userId = userInfo.subject;
      return next();
    })
    .catch(err => {
      console.error(err);
      res.status(400).json({'error': err});
      return next(err);
    });
}
