import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AppTabParamList = {
  Dashboard: undefined;
  Tickets: undefined;
  NewTickets: undefined;
};

export type TabScreenNavigationProp = NativeStackNavigationProp<AppTabParamList>;
