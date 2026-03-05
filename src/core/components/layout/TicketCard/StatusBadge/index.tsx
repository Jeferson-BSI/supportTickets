import React from 'react';
import * as Native from 'react-native';
import Text from '@core/components/base/Text/view';
import { theme } from '@theme/theme';
import type { IColor } from '@theme/theme';
import type { TicketStatus } from '@features/app/tickets/models';
import { STATUS_MAP } from '../constants';

interface StatusBadgeProps {
  status: TicketStatus;
}

const StatusBadge = React.memo(({ status }: StatusBadgeProps) => {
  const config = STATUS_MAP[status];
  const colorKey = config.themeKey;

  const backgroundKey = `${colorKey}50` as keyof typeof theme.colors;
  const textColorKey = `${colorKey}700` as IColor;
  const borderColorKey = `${colorKey}200` as keyof typeof theme.colors;

  return (
    <Native.View
      style={[
        styles.badge,
        {
          backgroundColor: theme.colors[backgroundKey] as string,
          borderColor: theme.colors[borderColorKey] as string,
        },
      ]}
    >
      <Native.View
        style={[
          styles.dot,
          { backgroundColor: theme.colors[textColorKey] as string },
        ]}
      />
      <Text font="semibold" size={12} color={textColorKey}>
        {config.label}
      </Text>
    </Native.View>
  );
});

StatusBadge.displayName = 'StatusBadge';

const styles = Native.StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    gap: theme.spacing.xs,
  },
  dot: {
    width: theme.spacing.sm,
    height: theme.spacing.sm,
    borderRadius: theme.radius.full,
  },
});

export default StatusBadge;
