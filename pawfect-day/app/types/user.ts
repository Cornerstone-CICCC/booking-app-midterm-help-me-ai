export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
  createdAt: string;
  updatedAt?: string;
}

export type SafeUser = Omit<User, 'password'>;

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}