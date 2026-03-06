import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import Text from '@core/components/base/Text/view';
import Container from '@core/components/base/Container/view';
import type { TicketCountsByStatus } from '@features/app/tickets/models';

type Props = {
  counts: TicketCountsByStatus;
};

type PieItem = {
  label: string;
  value: number;
  color: string;
};

const STATUS_COLORS: Record<string, string> = {
  open: '#3b82f6',
  improcedente: '#f59e0b',
  closed: '#10b981',
  canceled: '#ef4444',
};

const STATUS_LABELS: Record<string, string> = {
  open: 'Abertos',
  improcedente: 'Improcedentes',
  closed: 'Encerrados',
  canceled: 'Cancelados',
};

const STATUS_KEYS = ['open', 'improcedente', 'closed', 'canceled'] as const;

function buildPieData(counts: TicketCountsByStatus): PieItem[] {
  return STATUS_KEYS.map((key) => ({
    label: STATUS_LABELS[key],
    value: counts[key] ?? 0,
    color: STATUS_COLORS[key],
  }));
}

const renderDot = (color: string) => <View style={[styles.dot, { backgroundColor: color }]} />;

const EMPTY_CHART_COLOR = '#E5E7EB';

export default function StatusPieChart({ counts }: Props) {
  const pieData = buildPieData(counts);
  const total = pieData.reduce((acc, item) => acc + item.value, 0);

  const chartData =
    total === 0
      ? [{ value: 1, color: EMPTY_CHART_COLOR, text: '0%' }]
      : pieData.map((item) => ({
          value: item.value,
          color: item.color,
          text: `${Math.round((item.value / total) * 100)}%`,
        }));

  return (
    <Container
      width="100%"
      center
      gap={16}
      elevation={5}
      bg="white"
      borderRadius={32}
      style={styles.container}
    >
      <Text size={18} font="bold" color="textPrimary">
        Status dos Tickets
      </Text>

      <PieChart
        data={chartData}
        radius={110}
        innerRadius={60}
        showText
        textColor="white"
        textSize={12}
        focusOnPress
      />

      <View style={styles.legendContainer}>
        {pieData.map((item) => {
          const percent = total === 0 ? 0 : Math.round((item.value / total) * 100);
          return (
            <View key={item.label} style={styles.legendItem}>
              {renderDot(item.color)}
              <Text size={14} color="textPrimary">
                {item.label}: {percent}%
              </Text>
            </View>
          );
        })}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
