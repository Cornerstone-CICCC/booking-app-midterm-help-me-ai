// TODO: REVIEW

export type UserRole = 'admin' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export type SafeUser = Omit<User, 'password'>;

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
}