import { Home, Ticket, PlusCircle } from 'lucide-react-native';
import type { TabIconMap } from './types';

export const ANIMATION_DURATION = 250;
export const ICON_SIZE = 24;
export const ACTIVE_SCALE = 1.15;
export const INACTIVE_SCALE = 1;
export const INDICATOR_HEIGHT = 3;
export const ACTIVE_STROKE_WIDTH = 2.5;
export const INACTIVE_STROKE_WIDTH = 2;

export const TAB_ICONS: TabIconMap = {
  Dashboard: Home,
  Tickets: Ticket,
  NewTickets: PlusCircle,
};
