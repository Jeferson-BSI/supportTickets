import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import Text from '@core/components/base/Text/view';
import Container from '@core/components/base/Container/view';

type Props = {
  open: number;
  closed: number;
  canceled: number;
  improcedente: number;
};

type PieItem = {
  label: string;
  value: number;
  color: string;
};

const renderDot = (color: string) => <View style={[styles.dot, { backgroundColor: color }]} />;

export default function StatusPieChart({ open, closed, canceled, improcedente }: Props) {
  const pieData: PieItem[] = [
    { label: 'Abertos', value: open, color: '#3b82f6' },
    { label: 'Encerrados', value: closed, color: '#10b981' },
    { label: 'Improcedentes', value: improcedente, color: '#f59e0b' },
    { label: 'Cancelados', value: canceled, color: '#ef4444' },
  ];

  const total = pieData.reduce((acc, item) => acc + item.value, 0);

  const chartData = pieData.map((item) => ({
    value: item.value,
    color: item.color,
    text: total ? `${Math.round((item.value / total) * 100)}%` : '0%',
  }));

  const renderLegend = () => (
    <View style={styles.legendContainer}>
      {pieData.map((item) => {
        const percent = total ? Math.round((item.value / total) * 100) : 0;

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
  );

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

      {renderLegend()}
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
