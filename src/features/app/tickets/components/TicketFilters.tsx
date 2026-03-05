import React from 'react';
import * as Native from 'react-native';
import { theme } from '@theme/theme';
import { STATUS_MAP } from '@core/components/layout/TicketCard/constants';
import type { TicketFilterOption, TicketStatus } from '../models';
import TicketFilterChip from './TicketFilterChip';

interface TicketFiltersProps {
  activeFilter: TicketFilterOption;
  counts: Record<TicketFilterOption, number>;
  onFilterChange: (filter: TicketFilterOption) => void;
}

interface FilterConfig {
  key: TicketFilterOption;
  label: string;
}

const FILTER_OPTIONS: FilterConfig[] = [
  { key: 'all', label: 'Todos' },
  ...Object.entries(STATUS_MAP).map(([key, config]) => ({
    key: key as TicketStatus,
    label: config.label,
  })),
];

const TicketFilters = React.memo(
  ({ activeFilter, counts, onFilterChange }: TicketFiltersProps) => (
    <Native.View style={styles.container}>
      <Native.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FILTER_OPTIONS.map((option) => (
          <TicketFilterChip
            key={option.key}
            filter={option.key}
            label={option.label}
            count={counts[option.key]}
            isActive={activeFilter === option.key}
            onPress={onFilterChange}
          />
        ))}
      </Native.ScrollView>
    </Native.View>
  ),
);

TicketFilters.displayName = 'TicketFilters';

const styles = Native.StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.md,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
});

export default TicketFilters;
