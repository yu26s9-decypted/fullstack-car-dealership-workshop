export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  region: string;
  password: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}