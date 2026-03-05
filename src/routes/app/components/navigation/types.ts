import type { LucideIcon } from 'lucide-react-native';
import type { SharedValue } from 'react-native-reanimated';

export type TabIconMap = Record<string, LucideIcon>;

export interface TabItemProps {
  label: string;
  routeName: string;
  isFocused: boolean;
  activeColor: string;
  inactiveColor: string;
  onPress: () => void;
  onLongPress: () => void;
  accessibilityLabel: string | undefined;
  testID: string | undefined;
}

export interface SlidingIndicatorProps {
  tabCount: number;
  activeIndex: SharedValue<number>;
  color: string;
  containerWidth: SharedValue<number>;
  containerLeft: SharedValue<number>;
}
