import React from 'react';
import * as Native from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { theme } from '@core/theme/theme';
import Text from '@core/components/base/Text/view';
import Spacer from '@core/components/base/Spacer/view';
import type { TicketClosureStatus } from '@features/app/tickets/models';
import type { ClosureStatusOption } from '../ticketDetail.viewModel';

interface ClosureStatusDropdownProps {
  options: ClosureStatusOption[];
  selectedStatus: TicketClosureStatus | null;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (status: TicketClosureStatus) => void;
}

const ClosureStatusDropdown = ({
  options,
  selectedStatus,
  isOpen,
  onToggle,
  onSelect,
}: ClosureStatusDropdownProps) => {
  const selectedLabel = selectedStatus
    ? options.find((o) => o.value === selectedStatus)?.label
    : null;

  return (
    <>
      <Text size={13} font="medium" color="textMuted" style={styles.fieldLabel}>
        STATUS DE ENCERRAMENTO
      </Text>
      <Spacer height={6} />
      <Native.Pressable style={styles.dropdown} onPress={onToggle}>
        <Text size={15} font="regular" color={selectedStatus ? 'textPrimary' : 'textMuted'}>
          {selectedLabel ?? 'Selecione o status...'}
        </Text>
        <ChevronDown
          size={20}
          color={theme.colors.textMuted}
          style={isOpen ? styles.chevronUp : undefined}
        />
      </Native.Pressable>

      {isOpen && (
        <Native.View style={styles.dropdownList}>
          {options.map((option) => (
            <Native.Pressable
              key={option.value}
              style={[
                styles.dropdownItem,
                selectedStatus === option.value && styles.dropdownItemSelected,
              ]}
              onPress={() => onSelect(option.value)}
            >
              <Text
                size={14}
                font={selectedStatus === option.value ? 'semibold' : 'regular'}
                color={selectedStatus === option.value ? 'primary' : 'textPrimary'}
              >
                {option.label}
              </Text>
            </Native.Pressable>
          ))}
        </Native.View>
      )}
    </>
  );
};

const styles = Native.StyleSheet.create({
  fieldLabel: {
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface100,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    paddingHorizontal: theme.spacing.md,
    height: 48,
  },
  chevronUp: {
    transform: [{ rotate: '180deg' }],
  },
  dropdownList: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  dropdownItemSelected: {
    backgroundColor: theme.colors.primary50,
  },
});

export default ClosureStatusDropdown;
