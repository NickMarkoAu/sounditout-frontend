export interface AuthCredentials {
  username: string;
  password: string;
}

export interface ForgotPasswordConfirmation {
  credentials: AuthCredentials;
  confirmationCode: string;
}

export interface PageState {
  fromLocation: string;
}

export interface InitAuthResponse {
  targetUsername?: string;
  hasIdentityProvider: boolean;
  authoriseUrl?: string;
}