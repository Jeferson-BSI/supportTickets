import { ScrollView } from 'react-native';
import StatusPieChart from '../components/StatusPieChart';
import MetricsSection from '../components/MetricsSection';
import TicketPerformanceCarousel from '../components/TicketPerformanceCarousel/view';
import Header from '@core/components/layout/Header';
import Container from '@core/components/base/Container/view';
import Spacer from '@core/components/base/Spacer/view';
import { useDashboardViewModel } from '../viewModels/useDashboardViewModel';

export default function DashboardScreen() {
  const { counts, averageMinutes, fastestTickets } = useDashboardViewModel();

  return (
    <Container>
      <Header.Root>
        <Header.Title title="Dashboard" />
      </Header.Root>

      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 24,
        }}
      >
        <StatusPieChart counts={counts} />

        <MetricsSection
          totalTickets={counts.all}
          averageMinutes={averageMinutes}
        />

        <TicketPerformanceCarousel tickets={fastestTickets} />

        <Spacer height={24} />
      </ScrollView>
    </Container>
  );
}
