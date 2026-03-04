import { useState } from 'react';
import { Keyboard } from 'react-native';

import useFormLogin from './from';

type FORMType = ReturnType<typeof useFormLogin>;

const useSignInViewModel = (FORM: FORMType) => {
  const [securityPassword, setSecurityPassword] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: any) {
    setLoading(true);
    console.log('oi');

    Keyboard.dismiss();

    try {
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return {
    onSubmit,

    setLoading,
    loading,
    securityPassword,
    setSecurityPassword,
    rememberMe,
    setRememberMe,
  };
};

export default useSignInViewModel;
