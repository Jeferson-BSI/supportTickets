import Container from '@core/components/base/Container/view';
import useTicketsViewModel from './view.model';
import HeaderTicket from '../components/Header';
import TicketList from '../components/TicketList';

const TicketsScreen = () => {
  const { tickets, loading, refreshing, handleRefresh, handleTicketPress } = useTicketsViewModel();

  return (
    <Container flex={1} bg="background">
      <HeaderTicket />
      <TicketList
        tickets={tickets}
        loading={loading}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onTicketPress={handleTicketPress}
      />
    </Container>
  );
};

export default TicketsScreen;
