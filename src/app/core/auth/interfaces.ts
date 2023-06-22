export interface User {
  succsesLogin?: boolean;
  name: string;
  email: string;
  password: string;
  id: number;
}

export interface LoginRes {
  succsesLogin: boolean;
  message: string;
  statusCode: number;
}
