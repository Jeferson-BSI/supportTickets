import { useRef, useCallback } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Carousel, { type ICarouselInstance } from 'react-native-reanimated-carousel';
import Container from '@core/components/base/Container/view';
import Text from '@core/components/base/Text/view';
import type { Ticket } from '@features/app/tickets/models';
import TicketPerformanceCard from './TicketPerformanceCard';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH;
const CARD_HEIGHT = 140;
const AUTOPLAY_INTERVAL = 3000;

type Props = {
  tickets: Ticket[];
};

export default function TicketPerformanceCarousel({ tickets }: Props) {
  const carouselRef = useRef<ICarouselInstance>(null);

  const renderItem = useCallback(
    ({ item }: { item: Ticket }) => <TicketPerformanceCard ticket={item} />,
    [],
  );

  if (tickets.length === 0) return null;

  return (
    <Container width="100%" gap={12}>
      <Text size={18} font="bold" color="textPrimary">
        Top 5 Tickets Mais Rápidos
      </Text>

      <Container flex={1} width="100%" style={styles.carouselWrapper}>
        <Carousel
        
          ref={carouselRef}
          data={[...tickets, ...tickets]} // Duplicar os tickets para criar um loop infinito
          renderItem={renderItem}
          width={CARD_WIDTH}
          // width={}
          // height={CARD_HEIGHT}
          loop
          autoPlay
          autoPlayInterval={AUTOPLAY_INTERVAL}
          scrollAnimationDuration={600}
          // pagingEnabled
        />
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  carouselWrapper: {
    height: CARD_HEIGHT,
  },
});
