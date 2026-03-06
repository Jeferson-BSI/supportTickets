import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { runMigrations } from '@core/database/migrations/runMigrations';
import { useAuthStore } from '@features/auth/store/authStore';

export function useAppBootstrap() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isInitializing = useAuthStore((state) => state.isInitializing);

  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      try {
        await runMigrations();
        await initializeAuth();
      } catch (error) {
        console.error('Bootstrap error:', error);
      } finally {
        setDbReady(true);
      }
    }

    bootstrap();
  }, [initializeAuth]);

  const isAppReady = dbReady && !isInitializing;

  return {
    isAppReady,
  };
}
