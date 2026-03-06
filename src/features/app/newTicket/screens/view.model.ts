import { useCallback, useMemo } from 'react';
import { Alert, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatFullDateTime } from '@core/utils/formatDate';
import { useCreateTicket } from '../hooks/useCreateTicket';
import type { TabScreenNavigationProp } from '../../../../routes/app/app.routes.model';
import type useFormNewTicket from './form';
import type { NewTicketFormData } from './form';
import type { CreateTicketInput } from '@features/app/tickets/models';

type FormType = ReturnType<typeof useFormNewTicket>;

function mapFormToInput(data: NewTicketFormData): CreateTicketInput {
  return {
    title: data.title.trim(),
    description: data.description.trim(),
    deadline: data.deadline,
    priority: data.priority,
  };
}

const useNewTicketViewModel = (form: FormType) => {
  const navigation = useNavigation<TabScreenNavigationProp>();
  const { createTicket, isLoading, isError, error } = useCreateTicket();

  const openingDate = useMemo(() => formatFullDateTime(new Date()), []);

  const onSubmit = useCallback(
    async (data: NewTicketFormData) => {
      Keyboard.dismiss();

      try {
        const input = mapFormToInput(data);
        await createTicket(input);

        form.reset();
        navigation.navigate('Tickets');
      } catch {
        Alert.alert(
          'Erro ao criar ticket',
          'Não foi possível criar o ticket. Tente novamente.',
        );
      }
    },
    [createTicket, form, navigation],
  );

  return {
    openingDate,
    onSubmit,
    loading: isLoading,
    isError,
    error,
  };
};

export default useNewTicketViewModel;
