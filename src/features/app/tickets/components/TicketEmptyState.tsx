import React from 'react';
import * as Native from 'react-native';
import { Inbox } from 'lucide-react-native';
import Text from '@core/components/base/Text/view';
import { theme } from '@theme/theme';

const TicketEmptyState = React.memo(() => (
  <Native.View style={styles.container}>
    <Native.View style={styles.iconWrapper}>
      <Inbox size={48} color={theme.colors.text.muted} />
    </Native.View>
    <Text font="semibold" size={18} color="textPrimary" style={styles.title}>
      Nenhum ticket encontrado
    </Text>
    <Text font="regular" size={14} color="textMuted" align="center">
      Seus tickets de suporte aparecerão aqui
    </Text>
  </Native.View>
));

TicketEmptyState.displayName = 'TicketEmptyState';

const styles = Native.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing['3xl'],
    paddingVertical: theme.spacing['6xl'],
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.background200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    marginBottom: theme.spacing.sm,
  },
});

export default TicketEmptyState;
