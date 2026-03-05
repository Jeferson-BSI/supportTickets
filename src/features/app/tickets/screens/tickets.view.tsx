import Container from '@core/components/base/Container/view';
import Text from '@core/components/base/Text/view';

import Spacer from '@core/components/base/Spacer/view';
import Button from '@core/components/base/Button/view';

import useTicketsViewModel from './view.model';
import Header from '@core/components/layout/Header';
import { Bell, ChevronLeft, Settings, LogOut } from 'lucide-react-native';
import { theme } from '@core/theme/theme';
import { SupportIcon } from '@core/assets';
import HeaderTicket from '../components/Header';

const TicketsScreen = () => {
  const VIEW_MODEL = useTicketsViewModel();

  return (
    <Container flex={1}>
      <HeaderTicket />
    </Container>
  );
};

export default TicketsScreen;
