export interface AuthenticatorData {
  user: {
    uuid: string;
  };
  iat?: number;
  exp?: number;
}
