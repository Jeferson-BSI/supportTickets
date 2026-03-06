import React, { useCallback } from 'react';
import * as Native from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInDown,
} from 'react-native-reanimated';
import { theme } from '@theme/theme';
import { PRESS_SCALE, ANIMATION_DELAY_FACTOR } from '../constants';

interface TicketCardRootProps extends Native.ViewProps {
  children: React.ReactNode;
  index: number;
  onPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Native.Pressable);

const TicketCardRoot = ({ children, index, onPress, style, ...rest }: TicketCardRootProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(PRESS_SCALE, { damping: 15, stiffness: 150 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
  }, [scale]);

  return (
    <Animated.View
      entering={FadeInDown.delay(index * ANIMATION_DELAY_FACTOR)
        .duration(400)
        .springify()
        .damping(18)}
      style={styles.shadowWrapper}
    >
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.card, animatedStyle, style]}
        {...rest}
      >
        {children}
      </AnimatedPressable>
    </Animated.View>
  );
};

const styles = Native.StyleSheet.create({
  shadowWrapper: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.radius.lg,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    overflow: 'hidden' ,
  },
});

export default TicketCardRoot;
