import * as Native from 'react-native';
import Container from '@core/components/base/Container/view';
import Text from '@core/components/base/Text/view';
import Button from '@core/components/base/Button/view';
import Input from '@core/components/layout/Input';
import { theme } from '@core/theme/theme';
import { Priority } from '../screens/form';

interface PriorityOption {
  value: Priority;
  label: string;
  activeBackground: string;
  activeBorder: string;
  activeText: string;
}

const PRIORITY_OPTIONS: PriorityOption[] = [
  {
    value: 'low',
    label: 'Baixa',
    activeBackground: 'rgba(76, 217, 100, 0.08)',
    activeBorder: theme.colors.success200,
    activeText: theme.colors.success700,
  },
  {
    value: 'medium',
    label: 'Média',
    activeBackground: 'rgba(244, 183, 64, 0.08)',
    activeBorder: theme.colors.warning200,
    activeText: theme.colors.warning700,
  },
  {
    value: 'high',
    label: 'Alta',
    activeBackground: 'rgba(239, 68, 68, 0.08)',
    activeBorder: theme.colors.error200,
    activeText: theme.colors.error700,
  },
];

interface PrioritySelectorProps {
  selected: Priority;
  onChange: (value: Priority) => void;
}

const PrioritySelector = ({ selected, onChange }: PrioritySelectorProps) => (
  <Container gap={12}>
    <Input.Label label="Nível de Prioridade" />
    <Container flexDirection="row" gap={8}>
      {PRIORITY_OPTIONS.map((option) => {
        const isActive = selected === option.value;

        return (
          <Button
            key={option.value}
            bg="transparent"
            onPress={() => onChange(option.value)}
            style={[
              styles.button,
              isActive
                ? {
                    backgroundColor: option.activeBackground,
                    borderColor: option.activeBorder,
                    ...styles.activeShadow,
                  }
                : styles.inactive,
            ]}
          >
            <Text
              size={12}
              font={isActive ? 'medium' : 'light'}
              style={{ color: isActive ? option.activeText : theme.colors.textMuted }}
            >
              {option.label}
            </Text>
          </Button>
        );
      })}
    </Container>
  </Container>
);

const styles = Native.StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    alignItems: 'center',
  },
  inactive: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.surface300,
  },
  activeShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
});

export default PrioritySelector;
