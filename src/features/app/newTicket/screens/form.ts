import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { isValidDate, isNotPastDate } from '@core/utils/formatDate';
import type { TicketPriority } from '@features/app/tickets/models';

export type Priority = TicketPriority;

export interface NewTicketFormData {
  title: string;
  description: string;
  deadline: string;
  priority: Priority;
}

const formSchema = yup.object({
  title: yup.string().required('Título é um campo obrigatório.'),
  description: yup.string().required('Descrição é um campo obrigatório.'),
  priority: yup.string<Priority>().required('Prioridade é um campo obrigatório.'),
  deadline: yup
    .string()
    .required('Prazo é um campo obrigatório.')
    .min(10, 'Preencha a data completa (dd/mm/aaaa).')
    .test('valid-date', 'Data inválida.', (value) => !!value && isValidDate(value))
    .test(
      'not-past',
      'A data não pode ser no passado.',
      (value) => !!value && isValidDate(value) && isNotPastDate(value),
    ),
});

const useFormNewTicket = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<NewTicketFormData>({
    defaultValues: { title: '', description: '', deadline: '', priority: 'medium' },
    resolver: yupResolver(formSchema),
  });

  return { control, handleSubmit, errors, reset, setValue, watch };
};

export default useFormNewTicket;
