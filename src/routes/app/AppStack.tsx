import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@theme/theme';
import { AppStackParamList } from './app.routes.model';
import { TabNavigator } from './TabNavigator';
import TicketDetailScreen from '@features/app/tickets/screens/ticketDetail/ticketDetail.view';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.primary },
      }}
    >
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
    </Stack.Navigator>
  );
}
