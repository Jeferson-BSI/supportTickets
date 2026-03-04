import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
// import { useAuthStore } from '@stores/authStore/auth_store';

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
  } = useForm<{ email: string; pwd: string }>({
    defaultValues: {},
    resolver: yupResolver(formSchema),
  });

  return {
    errors,
    control,
    securityTextInput,
    handleSubmit,
    setSecurityTextInput,
    setError,
  };
};

export default useFormLogin;
