
export interface TarotCardData {
  name: string;
  img: string;
  meaning_up: string;
  meaning_rev: string;
}

export interface DrawnCard extends TarotCardData {
  reversed: boolean;
}
