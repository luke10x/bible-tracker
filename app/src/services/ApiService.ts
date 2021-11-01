import axios from 'axios';
import { Constants } from '../helpers/Constants';
import AuthService from './authService';

export class ApiService {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // TODO: Convert callbacks to promises
  // https://zellwk.com/blog/converting-callbacks-to-promises/
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public callApi(method: string, endpoint: string, payload: any): Promise<any> {
    return this.authService.getUser().then((user) => {
      if (user && user.access_token) {
        return this.doCallApi(
          user.access_token,
          method,
          endpoint,
          payload,
        ).catch((error) => {
          if (error.response.status === 401) {
            return this.authService
              .renewToken()
              .then((renewedUser) =>
                this.doCallApi(
                  renewedUser.access_token,
                  method,
                  endpoint,
                  payload,
                ),
              );
          }
          // TODO I don't think this works
          throw error;
        });
      }
      if (user) {
        return this.authService
          .renewToken()
          .then((renewedUser) =>
            this.doCallApi(renewedUser.access_token, method, endpoint, payload),
          );
      }
      throw new Error('user is not logged in');
    });
  }

  private doCallApi(
    token: string,
    method: string,
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any,
  ) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    if (method === 'post') {
      return axios.post(Constants.apiRoot + endpoint, JSON.stringify(payload), {
        headers,
      });
    }
    return axios.get(Constants.apiRoot + endpoint, { headers });
  }
}
