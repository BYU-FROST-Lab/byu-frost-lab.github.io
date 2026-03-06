export const CARD_IMAGE_SIZES = {
  rect: { width: 1024, height: 192 },
  square: { width: 480, height: 480 },
  round: { width: 192, height: 192 },
} as const;

export type CardImageStyle = keyof typeof CARD_IMAGE_SIZES;

export const DEFAULT_CARD_IMAGE_STYLE: CardImageStyle = 'square';

export const getCardImageDimensions = (style: CardImageStyle, sizes = CARD_IMAGE_SIZES) => sizes[style];
