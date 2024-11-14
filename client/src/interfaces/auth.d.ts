// src/interfaces/auth.d.ts
export interface User {
  isAdmin: any;
  id: string;
  username: string;
  email: string;
  exp: number;
  // Add additional fields here as needed
}

export interface AuthState {
  user: User | null;
}
interface User {
  id: number;
  username: string;
  isAdmin: boolean;
}
export interface AuthContextProps {
  user: User | null;
  login: (userData: UserData) => void;
  logout: () => void;
}

export interface UserData {
  token: string;
}

export type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };
