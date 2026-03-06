import React, { useRef, useCallback } from 'react';
import * as Native from 'react-native';
import Text from '@core/components/base/Text/view';
import type { CarouselRootProps } from '../types';
import TicketPerformanceCard from '../TicketPerformanceCard';
import { useCarouselAutoplay } from '../hooks/useCarouselAutoplay';
import {
  CAROUSEL_WIDTH,
  ITEM_WIDTH,
  CARD_WIDTH,
  CARD_HEIGHT,
  CARD_GAP_SIZE,
  AUTOPLAY_INTERVAL_MS,
  CAROUSEL_TITLE,
} from '../constants';

const CarouselRoot = ({ tickets, title = CAROUSEL_TITLE }: CarouselRootProps) => {
  const scrollRef = useRef<Native.ScrollView>(null);

  const scrollToIndex = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, tickets.length - 1));
      scrollRef.current?.scrollTo({
        x: clampedIndex * ITEM_WIDTH,
        animated: true,
      });
    },
    [tickets.length],
  );

  const { onScrollBegin, onScrollEnd } = useCarouselAutoplay({
    itemCount: tickets.length,
    intervalMs: AUTOPLAY_INTERVAL_MS,
    onIndexChange: scrollToIndex,
  });

  const handleScrollEnd = useCallback(
    (event: Native.NativeSyntheticEvent<Native.NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      onScrollEnd(offsetX, ITEM_WIDTH);
    },
    [onScrollEnd],
  );

  if (tickets.length === 0) return null;

  return (
    <Native.View style={styles.container}>
      <Text size={18} font="bold" color="textPrimary" style={styles.title}>
        {title}
      </Text>

      <Native.View style={styles.scrollContainer}>
        <Native.ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={ITEM_WIDTH}
          snapToAlignment="start"
          contentContainerStyle={styles.scrollContent}
          style={styles.scrollView}
          nestedScrollEnabled={Native.Platform.OS === 'android'}
          onScrollBeginDrag={onScrollBegin}
          onMomentumScrollEnd={handleScrollEnd}
          onScrollEndDrag={handleScrollEnd}
        >
          {tickets.map((ticket) => (
            <Native.View
              key={ticket.id}
              style={[styles.cardWrapper, { width: CARD_WIDTH, marginHorizontal: CARD_GAP_SIZE / 2 }]}
            >
              <TicketPerformanceCard ticket={ticket} />
            </Native.View>
          ))}
        </Native.ScrollView>
      </Native.View>
    </Native.View>
  );
};

const styles = Native.StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    marginBottom: 12,
  },
  scrollContainer: {
    width: CAROUSEL_WIDTH,
    height: CARD_HEIGHT,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    flexDirection: 'row',
  },
  cardWrapper: {
    height: CARD_HEIGHT,
  },
});

export default CarouselRoot;
