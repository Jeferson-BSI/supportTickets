import { StyleSheet } from 'react-native';
import { Ticket, Timer } from 'lucide-react-native';
import Container from '@core/components/base/Container/view';
import Text from '@core/components/base/Text/view';
import { theme } from '@core/theme/theme';

type MetricCardProps = {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  unit?: string;
};

function MetricCard({ icon, iconBg, label, value, unit }: MetricCardProps) {
  return (
    <Container flex={1} bg="white" borderRadius={20} elevation={3} style={styles.card}>
      <Container
        width={48}
        height={48}
        borderRadius={14}
        center
        style={[styles.iconContainer, { backgroundColor: iconBg }]}
      >
        {icon}
      </Container>

      <Text size={13} color="textSecondary" font="medium" style={styles.label}>
        {label}
      </Text>

      <Container flexDirection="row" align="flex-end" gap={4}>
        <Text size={32} font="bold" color="textPrimary">
          {value}
        </Text>
        {unit && (
          <Text size={14} color="textSecondary" font="medium" style={styles.unit}>
            {unit}
          </Text>
        )}
      </Container>
    </Container>
  );
}

const MetricsSection = () => {
  return (
    <Container flexDirection="row" width="100%" gap={14}>
      <MetricCard
        icon={<Ticket size={24} color={theme.colors.primary700} />}
        iconBg={theme.colors.primary100}
        label="Total Tickets"
        value="120"
      />
      <MetricCard
        icon={<Timer size={24} color={theme.colors.success700} />}
        iconBg={theme.colors.success100}
        label="Média de tempo de encerramento"
        value="45"
        unit="min"
      />
    </Container>
  );
};

export default MetricsSection;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  iconContainer: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 4,
  },
  unit: {
    paddingBottom: 5,
  },
});
