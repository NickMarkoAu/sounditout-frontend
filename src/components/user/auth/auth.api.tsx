import axios from 'axios';
import {
  AuthCredentials,
  ForgotPasswordConfirmation,
  InitAuthResponse,
  PageState,
} from './auth.model';

export const initAuth = async (email: string, pageState: PageState) => {
  const response = await axios.post<InitAuthResponse>('/api/auth/init', pageState, {
    params: {
      email
    }
  });
  return response.data;
};

export const login = (authCredentials: AuthCredentials) => axios.post('/api/auth/login', authCredentials);

export const logout = () => axios.post('/api/auth/logout', null);

export const forgotPassword = (username: string) =>
  axios.post('/api/auth/forgot-password', null, { params: { username } });

export const confirmForgotPassword = (forgotPasswordConfirmation: ForgotPasswordConfirmation) =>
  axios.post('/api/auth/confirm-forgot-password', forgotPasswordConfirmation);

export const REFRESH_TOKEN_ENDPOINT = '/api/auth/token/refresh';

export const refreshToken = () => axios.post(REFRESH_TOKEN_ENDPOINT);
