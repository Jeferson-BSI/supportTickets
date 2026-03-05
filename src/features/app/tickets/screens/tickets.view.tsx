import Container from '@core/components/base/Container/view';
import useTicketsViewModel from './view.model';
import HeaderTicket from '../components/Header';
import TicketList from '../components/TicketList';

const TicketsScreen = () => {
  const {
    tickets,
    loading,
    refreshing,
    activeFilter,
    filterCounts,
    handleRefresh,
    handleTicketPress,
    handleFilterChange,
  } = useTicketsViewModel();

  return (
    <Container flex={1} bg="background">
      <HeaderTicket />
      <TicketList
        tickets={tickets}
        loading={loading}
        refreshing={refreshing}
        activeFilter={activeFilter}
        filterCounts={filterCounts}
        onRefresh={handleRefresh}
        onTicketPress={handleTicketPress}
        onFilterChange={handleFilterChange}
      />
    </Container>
  );
};

export default TicketsScreen;
