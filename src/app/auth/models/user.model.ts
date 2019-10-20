export interface User {
  id: number;
  username: string;
  role: Role;
}

export interface Credentials {
  username: string;
  password: string;
}

export type Role = 'user' | 'admin';
