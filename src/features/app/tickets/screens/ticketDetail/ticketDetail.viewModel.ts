import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { ticketService } from '../../services';
import { TICKETS_QUERY_KEY } from '../../hooks/useTickets';
import type { Ticket, TicketClosureStatus } from '../../models';
import type { AppStackParamList } from '../../../../../routes/app/app.routes.model';

type TicketDetailRoute = RouteProp<AppStackParamList, 'TicketDetail'>;

export interface ClosureStatusOption {
  label: string;
  value: TicketClosureStatus;
}

export const CLOSURE_STATUS_OPTIONS: ClosureStatusOption[] = [
  { label: 'Encerrado', value: 'closed' },
  { label: 'Improcedente', value: 'improcedente' },
  { label: 'Cancelado', value: 'canceled' },
];

const useTicketDetailViewModel = () => {
  const navigation = useNavigation();
  const route = useRoute<TicketDetailRoute>();
  const queryClient = useQueryClient();
  const { ticketId } = route.params;

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [closureDescription, setClosureDescription] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TicketClosureStatus | null>(null);
  const [closing, setClosing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isOpen = ticket?.status === 'open';

  const loadTicket = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ticketService.getTicketById(ticketId);
      setTicket(data);
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    loadTicket();
  }, [loadTicket]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const handleSelectStatus = useCallback((status: TicketClosureStatus) => {
    setSelectedStatus(status);
    setDropdownOpen(false);
  }, []);

  const closeTicket = useCallback(async () => {
    if (!closureDescription.trim()) {
      Alert.alert('Campo obrigatório', 'Preencha a descrição de encerramento.');
      return;
    }

    if (!selectedStatus) {
      Alert.alert('Campo obrigatório', 'Selecione o status de encerramento.');
      return;
    }

    try {
      setClosing(true);
      await ticketService.closeTicket(ticketId, selectedStatus, closureDescription.trim());
      await queryClient.invalidateQueries({ queryKey: TICKETS_QUERY_KEY });
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível encerrar o ticket. Tente novamente.');
    } finally {
      setClosing(false);
    }
  }, [ticketId, closureDescription, selectedStatus, queryClient, navigation]);

  return {
    ticket,
    loading,
    isOpen,
    closureDescription,
    setClosureDescription,
    selectedStatus,
    dropdownOpen,
    closing,
    handleGoBack,
    toggleDropdown,
    handleSelectStatus,
    closeTicket,
  };
};

export default useTicketDetailViewModel;
