import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { RootNavigator } from 'src/routes';


import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_300Light,
  Roboto_600SemiBold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { useAppBootstrap } from '@core/bootstrap/useAppBootstrap';
import { AppProviders } from '@core/providers/AppProviders';

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
