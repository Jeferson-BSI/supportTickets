import React, { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated';
import { Home } from 'lucide-react-native';
import { useTheme } from '@theme/theme';
import type { TabItemProps } from './types';
import {
  ANIMATION_DURATION,
  ICON_SIZE,
  ACTIVE_SCALE,
  INACTIVE_SCALE,
  ACTIVE_STROKE_WIDTH,
  INACTIVE_STROKE_WIDTH,
  TAB_ICONS,
} from './constants';

export const TabItem = memo(function TabItem({
  label,
  routeName,
  isFocused,
  activeColor,
  inactiveColor,
  onPress,
  onLongPress,
  accessibilityLabel,
  testID,
}: TabItemProps) {
  const { spacing } = useTheme();

  const progress = useSharedValue(isFocused ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(isFocused ? 1 : 0, {
      duration: ANIMATION_DURATION,
    });
  }, [isFocused, progress]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scale =
      INACTIVE_SCALE + progress.value * (ACTIVE_SCALE - INACTIVE_SCALE);
    return { transform: [{ scale }] };
  });

  const animatedColor = useDerivedValue(() =>
    interpolateColor(progress.value, [0, 1], [inactiveColor, activeColor]),
  );

  const animatedLabelStyle = useAnimatedStyle(() => ({
    color: animatedColor.value,
  }));

  const Icon = TAB_ICONS[routeName] ?? Home;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}
    >
      <Animated.View style={animatedIconStyle}>
        <Icon
          size={ICON_SIZE}
          color={isFocused ? activeColor : inactiveColor}
          strokeWidth={isFocused ? ACTIVE_STROKE_WIDTH : INACTIVE_STROKE_WIDTH}
        />
      </Animated.View>
      <Animated.Text
        style={[styles.label, { marginTop: spacing.xxs }, animatedLabelStyle]}
        numberOfLines={1}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  label: {
    fontSize: 11,
    fontFamily: 'Roboto_500Medium',
    textAlign: 'center',
  },
});
