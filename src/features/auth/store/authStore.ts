import { create } from 'zustand';
import { mmkvStorage } from '@core/storage/mmkv';
import { AuthStore } from './models';

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isInitializing: true,

  setSession: (token, user) => {
    mmkvStorage.setString(mmkvStorage.KEYS.AUTH_TOKEN, token);
    set({ token, user, isAuthenticated: true });
  },

  clearSession: () => {
    mmkvStorage.remove(mmkvStorage.KEYS.AUTH_TOKEN);
    set({ token: null, user: null, isAuthenticated: false });
  },

  initializeAuth: () => {
    const savedToken = mmkvStorage.getString(mmkvStorage.KEYS.AUTH_TOKEN);

    if (savedToken) {
      try {
        const base64Payload = savedToken.replace('st_', '');
        const decoded = JSON.parse(atob(base64Payload)) as {
          email: string;
          iat: number;
        };

        set({
          token: savedToken,
          user: { email: decoded.email, name: 'Administrador' },
          isAuthenticated: true,
          isInitializing: false,
        });
        return;
      } catch {
        mmkvStorage.remove(mmkvStorage.KEYS.AUTH_TOKEN);
      }
    }

    set({ isInitializing: false });
  },
}));
