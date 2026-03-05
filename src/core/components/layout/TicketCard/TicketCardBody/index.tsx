import React from 'react';
import Text from '@core/components/base/Text/view';

interface TicketCardBodyProps {
  description: string;
  maxLines?: number;
}

const TicketCardBody = React.memo(({ description, maxLines = 2 }: TicketCardBodyProps) => (
  <Text font="regular" size={14} color="textSecondary" numberOfLines={maxLines} style={{ lineHeight: 20 }}>
    {description}
  </Text>
));

TicketCardBody.displayName = 'TicketCardBody';

export default TicketCardBody;
