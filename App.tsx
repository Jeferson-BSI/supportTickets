import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { RootNavigator } from 'src/routes';
import { useAppBootstrap } from '@core/bootstrap/useAppBootstrap';
import { AppProviders } from '@core/providers/AppProviders';

import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_300Light,
  Roboto_600SemiBold,
  useFonts,
} from '@expo-google-fonts/roboto';

/**
 * App entry point.
 * All application initialization is handled by the Bootstrap layer.
 */

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { isAppReady } = useAppBootstrap();

  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_600SemiBold,
  });

  if (!fontsLoaded || !isAppReady) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <AppProviders>
      <StatusBar style="dark" />
      <RootNavigator />
    </AppProviders>
  );
}
