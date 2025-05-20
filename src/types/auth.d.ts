export interface User {
  username: string;
  password: string;
}

export interface AuthSession {
  username: string;
}

export interface AuthContextType {
  user: AuthSession | null;
  login: (username: string) => void;
  logout: () => void;
}
