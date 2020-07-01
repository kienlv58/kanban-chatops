import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { merge } from 'lodash';
import { throwErrorIfEmpty, throwErrorIfMalformed } from './errorHelpers';

const API_ENDPOINT = process.env.REACT_APP_BASE_URL;

interface User {
  accessToken: string | undefined;
}
/**
 * Universal user object
 * This user object is used throughout the app
 */
let user: User | undefined;

/**
 * Update access token into universal user object
 * @param authorizedUser
 */
export function updateAccessTokenToHeader(authorizedUser: User | undefined): void {
  if (authorizedUser) {
    user = {
      ...user,
      ...authorizedUser,
    };
  }
}

/**
 * Configure default request config
 * @param requestConfig
 */
export const configure = (requestConfig: AxiosRequestConfig = {}): AxiosRequestConfig => {
  const targetConfig = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  };
  if (user && user.accessToken) {
    merge(targetConfig, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
  }

  return merge(targetConfig, requestConfig);
};

/**
 * app API instance
 */
export const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return configure(config);
  },
  (error): Promise<Error> => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    throwErrorIfMalformed(response);
    throwErrorIfEmpty(response);
    return response;
  },
  (error: Error): Promise<Error> => {
    return Promise.reject(error);
  },
);

export default {
  axiosInstance,
};
