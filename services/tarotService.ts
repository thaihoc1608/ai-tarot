
import { TAROT_DECK } from '../data/tarot-deck';
import { DrawnCard, TarotCardData } from '../types';

// Fisher-Yates shuffle algorithm
const shuffleDeck = (deck: TarotCardData[]): TarotCardData[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const drawThreeCards = async (): Promise<DrawnCard[]> => {
  return new Promise((resolve) => {
    const shuffledDeck = shuffleDeck(TAROT_DECK);
    const drawnCardsRaw = shuffledDeck.slice(0, 3);
    
    const finalDrawnCards = drawnCardsRaw.map((card) => ({
      ...card,
      reversed: Math.random() < 0.5, // 50% chance of being reversed
    }));

    resolve(finalDrawnCards);
  });
};
