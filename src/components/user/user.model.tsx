export interface User {
  id: string;
  name: string;
  email: string;
  tokens: UserTokens;
}

export interface UserTokens {
  tokens: number;
  freeTokens: number;
}