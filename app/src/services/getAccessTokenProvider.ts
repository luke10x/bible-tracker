import AuthService from './authService';

export const getAccessTokenProvider = (authService: AuthService) => {
  return (callback: (_token: string) => Promise<void>) => {
    return authService.getUser().then(async (user) => {
      if (user && user.access_token) {
        return await callback(user.access_token).catch((error) => {
          // This has some assumptions about the response,
          // TODO would be nice to have a isAuthExpired(error_rs: Error) function
          // being passed in the constuructor which we could be using here
          if (error.response?.status === 401) {
            return authService
              .renewToken()
              .then(
                async (renewedUser) => await callback(renewedUser.access_token),
              );
          }
          // TODO I don't think this works
          // But this essentially means: The error is not Because of auth-expiration
          // So we chash here
          throw error;
        });
      }

      // Make sure it is up to date for future calls.
      // Probably we don't need it here as the call is being retried
      // hence TODO - remove this
      // if (user) {
      //   return authService
      //     .renewToken()
      //     .then(
      //       async (renewedUser) => await callback(renewedUser.access_token),
      //     );
      // }

      throw new Error('user is not logged in');
    });
  };
};
