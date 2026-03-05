import React, { memo, useCallback } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '@theme/theme';
import { TabItem } from './TabItem';
import { SlidingIndicator } from './SlidingIndicator';
import { ANIMATION_DURATION } from './constants';

export const BottomTabBar = memo(function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors, spacing, radius } = useTheme();
  const { bottom } = useSafeAreaInsets();

  const activeColor = colors.primary500;
  const inactiveColor = colors.background600;

  const bottomPadding = Math.max(bottom, spacing.sm);
  const activeIndex = useSharedValue(state.index);
  const rowWidth = useSharedValue(0);
  const rowLeft = useSharedValue(0);

  React.useEffect(() => {
    activeIndex.value = withTiming(state.index, {
      duration: ANIMATION_DURATION,
    });
  }, [state.index, activeIndex]);

  const handleRowLayout = useCallback(
    (event: LayoutChangeEvent) => {
      rowWidth.value = event.nativeEvent.layout.width;
      rowLeft.value = event.nativeEvent.layout.x;
    },
    [rowWidth, rowLeft],
  );

  const handleTabPress = useCallback(
    (routeKey: string, routeName: string, isFocused: boolean) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: routeKey,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(routeName, { merge: true });
      }
    },
    [navigation],
  );

  const handleTabLongPress = useCallback(
    (routeKey: string) => {
      navigation.emit({
        type: 'tabLongPress',
        target: routeKey,
      });
    },
    [navigation],
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background.elevated,
          borderTopColor: colors.border,
          paddingBottom: bottomPadding,
          paddingTop: spacing.sm,
          paddingHorizontal: spacing.lg,
          borderTopLeftRadius: radius.xl,
          borderTopRightRadius: radius.xl,
        },
      ]}
    >
      <SlidingIndicator
        tabCount={state.routes.length}
        activeIndex={activeIndex}
        color={activeColor}
        containerWidth={rowWidth}
        containerLeft={rowLeft}
      />

      <View style={styles.tabsRow} onLayout={handleRowLayout}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : options.title ?? route.name;

          const isFocused = state.index === index;

          return (
            <TabItem
              key={route.key}
              label={label}
              routeName={route.name}
              isFocused={isFocused}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              onPress={() =>
                handleTabPress(route.key, route.name, isFocused)
              }
              onLongPress={() => handleTabLongPress(route.key)}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
            />
          );
        })}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    position: 'relative',
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
