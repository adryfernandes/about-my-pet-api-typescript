// Payload de entrada e saida de dados de um JWT
export interface AuthenticatorData {
  user: {
    uuid: string;
  };
  iat?: number;
  exp?: number;
}
