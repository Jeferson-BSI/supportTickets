import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AppTabParamList = {
  Dashboard: undefined;
  Tickets: undefined;
  NewTickets: undefined;
};

export type AppStackParamList = {
  Tabs: undefined;
  TicketDetail: { ticketId: string };
};

export type AppStackNavigationProp = NativeStackNavigationProp<AppStackParamList>;
export type TabScreenNavigationProp = NativeStackNavigationProp<AppTabParamList>;
