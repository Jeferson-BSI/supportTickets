import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from 'src/routes';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@features/auth/store/authStore';
import { runMigrations } from '@core/database/migrations/runMigrations';

import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_300Light,
  useFonts,
  Roboto_600SemiBold,
} from '@expo-google-fonts/roboto';

const queryClient = new QueryClient();

runMigrations();

export default function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isInitializing = useAuthStore((state) => state.isInitializing);

  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_600SemiBold,
  });

  useEffect(() => {
    void SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (fontsLoaded && !isInitializing) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isInitializing]);

  if (!fontsLoaded || isInitializing) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
