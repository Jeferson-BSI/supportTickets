import { useState } from 'react';
import { Keyboard } from 'react-native';

import { signIn } from '@features/auth/services/authService';
import { useAuthStore } from '@features/auth/store/authStore';
import useFormLogin from './from';

type FormType = ReturnType<typeof useFormLogin>;

interface LoginFormData {
  email: string;
  pwd: string;
}

const useSignInViewModel = (form: FormType) => {
  const setSession = useAuthStore((state) => state.setSession);

  const [securityPassword, setSecurityPassword] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  async function onSubmit(data: LoginFormData) {
    setLoading(true);
    setAuthError(null);
    Keyboard.dismiss();

    try {
      const result = await signIn({
        email: data.email,
        password: data.pwd,
      });

      if (!result.success) {
        setAuthError(result.error.message);
        return;
      }

      setSession(result.data.token, result.data.user, rememberMe);
    } catch {
      console.log('Error');

      setAuthError('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  function clearAuthError() {
    setAuthError(null);
  }

  return {
    onSubmit,
    loading,
    authError,
    clearAuthError,
    securityPassword,
    setSecurityPassword,
    rememberMe,
    setRememberMe,
  };
};

export default useSignInViewModel;
