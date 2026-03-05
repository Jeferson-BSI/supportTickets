import { useAuthStore } from '@features/auth/store/authStore';
import { useState } from 'react';

const useTicketsViewModel = () => {
  const [loading, setLoading] = useState(false);

  return {
    loading,
  };
};

export default useTicketsViewModel;
