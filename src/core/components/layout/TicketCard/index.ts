import StatusBadge from './StatusBadge';
import TicketCardRoot from './TicketCardRoot';
import TicketCardHeader from './TicketCardHeader';
import TicketCardBody from './TicketCardBody';
import TicketCardFooter from './TicketCardFooter';

const TicketCard = {
  Root: TicketCardRoot,
  Header: TicketCardHeader,
  Body: TicketCardBody,
  Footer: TicketCardFooter,
  StatusBadge: StatusBadge,
};

export default TicketCard;

export { STATUS_MAP, CARD_HEIGHT } from './constants';
export type { default as StatusBadgeType } from './StatusBadge';
