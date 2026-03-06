import React, { useState } from 'react';
import * as Native from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import { Lock } from 'lucide-react-native';
import { theme } from '@core/theme/theme';
import Container from '@core/components/base/Container/view';
import Text from '@core/components/base/Text/view';
import Button from '@core/components/base/Button/view';
import Spacer from '@core/components/base/Spacer/view';
import ClosureStatusDropdown from './ClosureStatusDropdown';
import type { ClosureStatusOption } from '../ticketDetail.viewModel';
import type { ClosureFormData } from '../closureForm';

interface TicketClosureSectionProps {
  options: ClosureStatusOption[];
  onSubmit: (data: ClosureFormData) => void;
  closing: boolean;
}

const TicketClosureSection = ({
  options,
  onSubmit,
  closing,
}: TicketClosureSectionProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useFormContext<ClosureFormData>();

  return (
    <Native.View style={styles.card}>
      <Native.View style={styles.sectionTitleRow}>
        <Lock size={16} color={theme.colors.primary} />
        <Text size={16} font="bold" color="textPrimary">
          Encerrar Ticket
        </Text>
      </Native.View>

      <Spacer height={16} />

      <Text size={13} font="medium" color="textMuted" style={styles.fieldLabel}>
        DESCRIÇÃO DO ENCERRAMENTO
      </Text>
      <Spacer height={6} />
      <Controller
        control={control}
        name="closureDescription"
        render={({ field }) => (
          <>
            <Native.TextInput
              style={[styles.textArea, errors.closureDescription && styles.textAreaError]}
              placeholder="Descreva o motivo do encerramento..."
              placeholderTextColor={theme.colors.textMuted}
              value={field.value}
              onChangeText={field.onChange}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            {errors.closureDescription && (
              <Text size={12} color="error" font="medium" style={styles.errorText}>
                {errors.closureDescription.message}
              </Text>
            )}
          </>
        )}
      />

      <Spacer height={20} />

      <Controller
        control={control}
        name="closureStatus"
        render={({ field }) => (
          <ClosureStatusDropdown
            options={options}
            selectedStatus={field.value ?? null}
            isOpen={dropdownOpen}
            onToggle={() => setDropdownOpen((prev) => !prev)}
            onSelect={(status) => {
              field.onChange(status);
              setDropdownOpen(false);
            }}
          />
        )}
      />
      {errors.closureStatus && (
        <Text size={12} color="error" font="medium" style={styles.errorText}>
          {errors.closureStatus.message}
        </Text>
      )}

      <Spacer height={24} />

      <Button
        bg="primary"
        width="100%"
        height={52}
        loading={closing}
        disabled={closing}
        style={styles.closeButton}
        onPress={handleSubmit(onSubmit)}
        accessibilityRole="button"
        accessibilityLabel="Encerrar Ticket"
      >
        <Container flexDirection="row" align="center" justify="center" gap={8}>
          <Lock size={18} color={theme.colors.white} />
          <Text size={16} font="bold" color="white">
            Encerrar Ticket
          </Text>
        </Container>
      </Button>
    </Native.View>
  );
};

const styles = Native.StyleSheet.create({
  errorText: {
    marginTop: 4,
  },
  textAreaError: {
    borderColor: theme.colors.error,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fieldLabel: {
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  textArea: {
    backgroundColor: theme.colors.surface100,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.md,
    minHeight: 100,
    fontSize: 15,
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.textPrimary,
  },
  closeButton: {
    borderRadius: theme.radius['2xl'],
  },
});

export default TicketClosureSection;
