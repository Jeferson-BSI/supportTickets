import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const closureFormSchema = z.object({
  closureDescription: z.string().trim().min(1, 'Preencha a descrição de encerramento.'),
  closureStatus: z.enum(['closed', 'improcedente', 'canceled'] as const, {
    message: 'Selecione o status de encerramento.',
  }),
});

export type ClosureFormData = z.infer<typeof closureFormSchema>;

const useClosureForm = () => {
  return useForm<ClosureFormData>({
    defaultValues: {
      closureDescription: '',
      closureStatus: undefined,
    } as Partial<ClosureFormData>,
    resolver: zodResolver(closureFormSchema),
  });
};

export default useClosureForm;
