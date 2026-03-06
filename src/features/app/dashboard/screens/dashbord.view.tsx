import { View, ScrollView, StyleSheet } from 'react-native';
import StatusPieChart from '../components/StatusPieChart';
import MetricsSection from '../components/MetricsSection';
import FastestTicketsCarousel from '../components/FastestTicketsCarousel';
import Header from '@core/components/layout/Header';
import Container from '@core/components/base/Container/view';

export default function DashboardScreen() {
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
        <StatusPieChart open={10} closed={25} canceled={4} improcedente={3} />

        <MetricsSection />

        <FastestTicketsCarousel />
      </ScrollView>
    </Container>
  );
}
