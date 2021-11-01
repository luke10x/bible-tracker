import AuthService from './authService';

export interface SecureServiceCall {
  <RQ, RS>(accessToken: string, request: RQ): Promise<RS>;
}

export class AuthenticatedService<RQ, RS> {
  private authService: AuthService;

  constructor(private serviceCall: SecureServiceCall) {
    this.authService = new AuthService();
  }

  public callWithAccessToken(request: RQ): Promise<RS> {
    return this.authService.getUser().then((user) => {
      if (user && user.access_token) {
        return this.serviceCall<RQ, RS>(user.access_token, request).catch(
          (error) => {
            // This has some assumptions about the response,
            // TODO would be nice to have a isAuthExpired(error_rs: Error) function
            // being passed in the constuructor which we could be using here
            if (error.response.status === 401) {
              return this.authService
                .renewToken()
                .then((renewedUser) =>
                  this.serviceCall<RQ, RS>(renewedUser.access_token, request),
                );
            }
            // TODO I don't think this works
            // But this essentially means: The error is not Because of auth-expiration
            // So we chash here
            throw error;
          },
        );
      }

      // Make sure it is up to date for future calls
      if (user) {
        return this.authService
          .renewToken()
          .then((renewedUser) =>
            this.serviceCall(renewedUser.access_token, request),
          );
      }

      throw new Error('user is not logged in');
    });
  }
}
