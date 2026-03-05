import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@theme/theme';
import { AppTabParamList } from './app.routes.model';
import { BottomTabBar } from './components/navigation/BottomTabBar';
import TicketsScreen from '@features/app/tickets/screens/tickets.view';
import NewTickets from '@features/app/newTicket/screens/newTicket.view';

export type TabParamList = {
  Dashboard: undefined;
  Tickets: undefined;
  NewTickets: undefined;
};

const PlaceholderScreen = () => <View style={{ flex: 1 }} />;

const Tab = createBottomTabNavigator<AppTabParamList>();

export function TabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background.primary },
      }}
    >
      <Tab.Screen name="Tickets" component={TicketsScreen} options={{ title: 'Tickets' }} />
      <Tab.Screen name="NewTickets" component={NewTickets} options={{ title: 'Novo Ticket' }} />
      <Tab.Screen name="Dashboard" component={PlaceholderScreen} options={{ title: 'Dashboard' }} />
    </Tab.Navigator>
  );
}
