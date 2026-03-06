import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const HORIZONTAL_PADDING = 32;
const CARDS_VISIBLE = 2;
const CARD_GAP = 12;

export const CAROUSEL_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING;
export const ITEM_WIDTH = CAROUSEL_WIDTH / CARDS_VISIBLE;
export const CARD_WIDTH = ITEM_WIDTH - CARD_GAP;
export const CARD_HEIGHT = 240;
export const CARD_GAP_SIZE = CARD_GAP;
export const AUTOPLAY_INTERVAL_MS = 3000;

export const CAROUSEL_TITLE = 'Top 5 Tickets Mais Rápidos';
