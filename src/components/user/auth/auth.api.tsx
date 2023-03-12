import axios from 'axios';
import {AuthCredentials, AuthResponse, ForgotPasswordConfirmation, InitAuthResponse, PageState,} from './auth.model';
import Config from "react-native-config";

export const initAuth = async (email: string, pageState: PageState) => {
  const response = await axios.post<InitAuthResponse>(`${Config.BACKEND_URL}/api/auth/init`, pageState, {
    params: {
      email
    }
  });
  return response.data;
};

export const login = async (authCredentials: AuthCredentials) => {
  try {
    const response = await axios.post<AuthResponse>(`/api/auth/login`, authCredentials);
    return response.data;
  } catch(e) {
    return e.response.data;
  }
};

export const refreshToken = async (token: string) => {
  try {
    const response = await axios.post<AuthResponse>(`/api/auth/refresh`, token);
    return response.data;
  } catch(e) {
    return e.response.data;
  }
}

export const logout = () => axios.post('/api/auth/logout', null);

export const forgotPassword = (username: string) =>
  axios.post('/api/auth/forgot-password', null, { params: { username } });

export const confirmForgotPassword = (forgotPasswordConfirmation: ForgotPasswordConfirmation) =>
  axios.post('/api/auth/confirm-forgot-password', forgotPasswordConfirmation);
