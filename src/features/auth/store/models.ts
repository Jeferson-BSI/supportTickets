export interface AuthUser {
  email: string;
  name: string;
}

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
}

export interface AuthActions {
  setSession: (token: string, user: AuthUser) => void;
  clearSession: () => void;
  initializeAuth: () => void;
}

export type AuthStore = AuthState & AuthActions;
