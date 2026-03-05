import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useTheme } from '@theme/theme';
import type { SlidingIndicatorProps } from './types';
import { INDICATOR_HEIGHT } from './constants';

export const SlidingIndicator = memo(function SlidingIndicator({
  tabCount,
  activeIndex,
  color,
  containerWidth,
  containerLeft,
}: SlidingIndicatorProps) {
  const { radius } = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    const width = containerWidth.value;
    if (width === 0) return { opacity: 0 };

    const tabWidth = width / tabCount;
    const indicatorWidth = tabWidth * 0.5;
    const left =
      containerLeft.value +
      activeIndex.value * tabWidth +
      (tabWidth - indicatorWidth) / 2;

    return {
      width: indicatorWidth,
      left,
      opacity: 1,
    };
  });

  return (
    <Animated.View
      style={[
        styles.indicator,
        {
          backgroundColor: color,
          borderRadius: radius.full,
          height: INDICATOR_HEIGHT,
        },
        animatedStyle,
      ]}
    />
  );
});

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    top: 0,
  },
});
