import Header from '@core/components/layout/Header';
import { LogOut } from 'lucide-react-native';
import { theme } from '@core/theme/theme';
import { SupportIcon } from '@core/assets';
import { useAuthStore } from '@features/auth/store/authStore';

const HeaderTicket = () => {
  const clearSession = useAuthStore((state) => state.clearSession);

  return (
    <Header.Root>
      <Header.Title title="SuporTickets" icon={<SupportIcon width={50} height={50} />} />
      <Header.Right>
        <Header.Action
          icon={<LogOut size={30} color={theme.colors.primary} />}
          onPress={clearSession}
        />
      </Header.Right>
    </Header.Root>
  );
};

export default HeaderTicket;
