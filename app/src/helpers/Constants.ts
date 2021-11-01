export class Constants {
  public static stsAuthority = `${process.env.REACT_APP_AUTH_URL}`;

  public static clientId = `${process.env.REACT_APP_AUTH_CLIENT_ID}`;

  public static clientRoot = `${process.env.REACT_APP_URL}`;

  public static clientScope = 'openid profile email api offline_access';

  public static responseType = 'code';

  public static audience = `${process.env.REACT_APP_AUTH_AUDIENCE}`;

  public static afterWelcomeRoute = '/dashboard';

  public static apiRoot = `${process.env.REACT_APP_API_URL}`;
}
