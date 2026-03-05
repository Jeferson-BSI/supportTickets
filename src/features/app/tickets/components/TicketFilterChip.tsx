import React, { useCallback } from 'react';
import * as Native from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import Text from '@core/components/base/Text/view';
import { theme } from '@theme/theme';
import type { TicketFilterOption } from '../models';

interface TicketFilterChipProps {
  filter: TicketFilterOption;
  label: string;
  count: number;
  isActive: boolean;
  onPress: (filter: TicketFilterOption) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Native.Pressable);

const TIMING_CONFIG = { duration: 250 };

const TicketFilterChip = React.memo(
  ({ filter, label, count, isActive, onPress }: TicketFilterChipProps) => {
    const scale = useSharedValue(1);
    const progress = useSharedValue(isActive ? 1 : 0);

    React.useEffect(() => {
      progress.value = withTiming(isActive ? 1 : 0, TIMING_CONFIG);
    }, [isActive, progress]);

    const animatedContainerStyle = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [theme.colors.surface, theme.colors.primary],
      ),
      borderColor: interpolateColor(
        progress.value,
        [0, 1],
        [theme.colors.border, theme.colors.primary],
      ),
      transform: [{ scale: scale.value }],
    }));

    const handlePress = useCallback(() => {
      onPress(filter);
    }, [filter, onPress]);

    const handlePressIn = useCallback(() => {
      scale.value = withSpring(0.95, { damping: 15, stiffness: 150 });
    }, [scale]);

    const handlePressOut = useCallback(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    }, [scale]);

    return (
      <AnimatedPressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.chip, animatedContainerStyle]}
      >
        <Text
          font="medium"
          size={13}
          color={isActive ? 'white' : 'textSecondary'}
        >
          {label}
        </Text>
        <Native.View style={[styles.countBadge, isActive && styles.countBadgeActive]}>
          <Text
            font="semibold"
            size={11}
            color={isActive ? 'primary' : 'textMuted'}
          >
            {count}
          </Text>
        </Native.View>
      </AnimatedPressable>
    );
  },
);

TicketFilterChip.displayName = 'TicketFilterChip';

const styles = Native.StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    gap: theme.spacing.sm,
  },
  countBadge: {
    backgroundColor: theme.colors.background200,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xxs,
    borderRadius: theme.radius.full,
    minWidth: 24,
    alignItems: 'center',
  },
  countBadgeActive: {
    backgroundColor: theme.colors.white,
  },
});

export default TicketFilterChip;
