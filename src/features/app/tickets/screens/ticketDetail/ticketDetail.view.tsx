import React from 'react';
import * as Native from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { theme } from '@core/theme/theme';
import Container from '@core/components/base/Container/view';
import Text from '@core/components/base/Text/view';
import Spacer from '@core/components/base/Spacer/view';
import Header from '@core/components/layout/Header';
import useTicketDetailViewModel, { CLOSURE_STATUS_OPTIONS } from './ticketDetail.viewModel';
import {
  TicketInfoCard,
  TicketClosureSection,
  TicketClosedBanner,
} from './components';

const TicketDetailScreen = () => {
  const vm = useTicketDetailViewModel();

  if (vm.loading) {
    return (
      <Container flex={1} bg="background" center>
        <Native.ActivityIndicator size="large" color={theme.colors.primary} />
      </Container>
    );
  }

  if (!vm.ticket) {
    return (
      <Container flex={1} bg="background" center>
        <Text color="textSecondary" size={16}>
          Ticket não encontrado.
        </Text>
      </Container>
    );
  }

  return (
    <Container flex={1} bg="background">
      <Header.Root>
        <Header.Left>
          <Header.Action
            icon={<ArrowLeft size={22} color={theme.colors.textPrimary} />}
            onPress={vm.handleGoBack}
          />
        </Header.Left>
        <Header.Title title="Detalhes do Ticket" />
      </Header.Root>

      <Native.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TicketInfoCard ticket={vm.ticket} />

        {vm.isOpen ? (
          <TicketClosureSection
            closureDescription={vm.closureDescription}
            onClosureDescriptionChange={vm.setClosureDescription}
            selectedStatus={vm.selectedStatus}
            dropdownOpen={vm.dropdownOpen}
            closing={vm.closing}
            options={CLOSURE_STATUS_OPTIONS}
            onToggleDropdown={vm.toggleDropdown}
            onSelectStatus={vm.handleSelectStatus}
            onCloseTicket={vm.closeTicket}
          />
        ) : (
          <TicketClosedBanner />
        )}

        <Spacer height={40} />
      </Native.ScrollView>
    </Container>
  );
};

const styles = Native.StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
});

export default TicketDetailScreen;
