import React from 'react';
import { DrawnCard } from '../types';

interface TarotCardProps {
  card: DrawnCard;
  isFlipped: boolean;
}

const TarotCard: React.FC<TarotCardProps> = ({ card, isFlipped }) => {
  const cardBackImage = 'https://i.imgur.com/39wP0KB.jpeg';

  return (
    <div className="perspective-[1000px] w-full h-full cursor-default">
      <div className={`card w-full h-full relative ${isFlipped ? 'is-flipped' : ''}`}>
        {/* Card Front */}
        <div className="card-face absolute w-full h-full">
          <img
            src={card.img}
            alt={card.name}
            className={`w-full h-full object-cover rounded-lg md:rounded-xl shadow-lg shadow-black/50 transition-transform duration-500 ${card.reversed ? 'rotate-180' : ''}`}
          />
        </div>
        {/* Card Back */}
        <div className="card-face card-back absolute w-full h-full">
          <img
            src={cardBackImage}
            alt="Card Back"
            className="w-full h-full object-cover rounded-lg md:rounded-xl shadow-lg shadow-black/50"
          />
        </div>
      </div>
    </div>
  );
};

export default TarotCard;
