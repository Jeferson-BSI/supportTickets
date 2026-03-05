import { useCallback, useMemo, useState } from 'react';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatFullDateTime } from '@core/utils/formatDate';
import useFormNewTicket from './form';
import { NewTicketFormData } from './form';

type FormType = ReturnType<typeof useFormNewTicket>;

const useNewTicketViewModel = (form: FormType) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const openingDate = useMemo(() => formatFullDateTime(new Date()), []);

  const onSubmit = useCallback(async (data: NewTicketFormData) => {
    setLoading(true);
    Keyboard.dismiss();

    try {
      console.log('[NewTicket] Dados enviados:', JSON.stringify(data, null, 2));

      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('[NewTicket] Ticket criado com sucesso!');
      form.reset();
      navigation.goBack();
    } catch {
      console.log('[NewTicket] Erro ao criar ticket.');
    } finally {
      setLoading(false);
    }
  }, [form, navigation]);

  return { handleGoBack, openingDate, onSubmit, loading };
};

export default useNewTicketViewModel;
