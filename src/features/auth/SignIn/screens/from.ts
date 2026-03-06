import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const useFormLogin = () => {
  const [securityTextInput, setSecurityTextInput] = useState(true);

  const formSchema = yup.object({
    email: yup
      .string()
      .required('E-mail é um campo obrigatório.')
      .email('Preencha um e-mail válido.'),
    pwd: yup
      .string()
      .required('Senha é um campo obrigatório.')
      .min(6, 'Senha deve conter no mínimo 6 caracteres.'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<{ email: string; pwd: string }>({
    defaultValues: { email: 'admin@admin.com', pwd: '123456' },
    resolver: yupResolver(formSchema),
  });

  return {
    errors,
    control,
    securityTextInput,
    handleSubmit,
    setSecurityTextInput,
    setError,
    clearErrors,
  };
};

export default useFormLogin;
