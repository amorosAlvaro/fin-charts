export interface User {
  succsesLogin?: boolean;
  name: string;
  email: string;
  password: string;
  id: number;
}

export interface Token {
  access_token: string;
}

export interface LoginRes {
  succsesLogin: boolean;
  message: string;
  statusCode: number;
}
