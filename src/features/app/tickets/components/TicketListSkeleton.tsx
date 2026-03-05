import React, { useEffect } from 'react';
import * as Native from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { theme } from '@theme/theme';

const SKELETON_COUNT = 4;

const SkeletonCard = React.memo(({ index }: { index: number }) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(opacity.value, [0, 1], [0.4, 1]),
  }));

  return (
    <Animated.View
      style={[styles.card, animatedStyle, { marginTop: index === 0 ? 0 : theme.spacing.md }]}
    >
      <Native.View style={styles.header}>
        <Native.View style={styles.titlePlaceholder} />
        <Native.View style={styles.badgePlaceholder} />
      </Native.View>
      <Native.View style={styles.bodyPlaceholder} />
      <Native.View style={styles.bodyPlaceholderShort} />
      <Native.View style={styles.footer}>
        <Native.View style={styles.footerItem} />
        <Native.View style={styles.footerItem} />
      </Native.View>
    </Animated.View>
  );
});

SkeletonCard.displayName = 'SkeletonCard';

const TicketListSkeleton = React.memo(() => (
  <Native.View style={styles.container}>
    {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
      <SkeletonCard key={i} index={i} />
    ))}
  </Native.View>
));

TicketListSkeleton.displayName = 'TicketListSkeleton';

const PLACEHOLDER_COLOR = theme.colors.background300;

const styles = Native.StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titlePlaceholder: {
    width: '55%',
    height: 18,
    borderRadius: theme.radius.sm,
    backgroundColor: PLACEHOLDER_COLOR,
  },
  badgePlaceholder: {
    width: 80,
    height: 24,
    borderRadius: theme.radius.full,
    backgroundColor: PLACEHOLDER_COLOR,
  },
  bodyPlaceholder: {
    width: '100%',
    height: 14,
    borderRadius: theme.radius.xs,
    backgroundColor: PLACEHOLDER_COLOR,
  },
  bodyPlaceholderShort: {
    width: '70%',
    height: 14,
    borderRadius: theme.radius.xs,
    backgroundColor: PLACEHOLDER_COLOR,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.md,
  },
  footerItem: {
    width: 90,
    height: 12,
    borderRadius: theme.radius.xs,
    backgroundColor: PLACEHOLDER_COLOR,
  },
});

export default TicketListSkeleton;
