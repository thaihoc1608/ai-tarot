import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { DrawnCard } from './types';
import { drawThreeCards } from './services/tarotService';
import TarotCard from './components/TarotCard';

// Fix: Per guidelines, the API key must be obtained from process.env.API_KEY.
// Khởi tạo Gemini AI. API Key được giả định đã có trong môi trường.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const App: React.FC = () => {
  const [drawnCards, setDrawnCards] = useState<DrawnCard[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInterpreting, setIsInterpreting] = useState<boolean>(false);
  const [interpretation, setInterpretation] = useState<string>('');
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false]);

  const getInterpretation = async (cards: DrawnCard[]) => {
    setIsInterpreting(true);
    setInterpretation('');

    const cardLabels = ["Quá Khứ", "Hiện Tại", "Tương Lai"];
    const prompt = `Bạn là một chuyên gia giải bài Tarot. Dựa vào ba lá bài được rút cho quá khứ, hiện tại và tương lai, hãy đưa ra một lời luận giải sâu sắc, mạch lạc và mang tính xây dựng cho người hỏi. Hãy kết nối ý nghĩa của các lá bài với nhau để tạo thành một câu chuyện có ý nghĩa.

Đây là trải bài:
- ${cardLabels[0]}: ${cards[0].name} (${cards[0].reversed ? 'Ngược' : 'Xuôi'})
- ${cardLabels[1]}: ${cards[1].name} (${cards[1].reversed ? 'Ngược' : 'Xuôi'})
- ${cardLabels[2]}: ${cards[2].name} (${cards[2].reversed ? 'Ngược' : 'Xuôi'})

Hãy bắt đầu luận giải.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      setInterpretation(response.text);
    } catch (error) {
      console.error("Error getting interpretation:", error);
      setInterpretation("Đã xảy ra lỗi trong quá trình luận giải. Vui lòng thử lại sau.");
    } finally {
      setIsInterpreting(false);
    }
  };

  const handleDrawCards = useCallback(async () => {
    setIsLoading(true);
    setDrawnCards(null);
    setInterpretation('');
    setFlippedCards([false, false, false]);

    // Giả lập độ trễ mạng và quá trình xáo bài
    setTimeout(async () => {
      const cards = await drawThreeCards();
      setDrawnCards(cards);
      setIsLoading(false);

      // Bắt đầu quá trình luận giải bằng AI
      getInterpretation(cards);

      // Hiệu ứng lật bài lần lượt
      setTimeout(() => setFlippedCards(prev => [true, prev[1], prev[2]]), 500);
      setTimeout(() => setFlippedCards(prev => [prev[0], true, prev[2]]), 1000);
      setTimeout(() => setFlippedCards(prev => [prev[0], prev[1], true]), 1500);
    }, 1500);
  }, []);

  const cardLabels = ["Quá Khứ", "Hiện Tại", "Tương Lai"];

  const getButtonText = () => {
    if (isLoading) return 'Đang Rút Bài...';
    if (isInterpreting) return 'Đang Luận Giải...';
    if (drawnCards) return 'Rút Bài Mới';
    return 'Rút Bài';
  };

  return (
    <div className="min-h-screen text-white font-serif p-4 sm:p-6 md:p-8 flex flex-col items-center justify-start overflow-y-auto">
      <div className="text-center my-8 w-full max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider text-amber-300" style={{ textShadow: '0 0 10px #f59e0b, 0 0 20px #f59e0b' }}>
          Trải Bài Tarot 3 Lá
        </h1>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          Khám phá những thông điệp từ vũ trụ. Hãy tập trung vào câu hỏi của bạn và rút 3 lá bài để nhận được sự dẫn lối về Quá Khứ, Hiện Tại và Tương Lai.
        </p>
      </div>

      <div className="w-full max-w-4xl h-72 sm:h-80 md:h-96 flex items-center justify-center mb-8">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-amber-400 border-gray-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-amber-300 text-lg tracking-widest">Đang xáo bài...</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full h-full px-4">
            {drawnCards ? (
              drawnCards.map((card, index) => (
                <div key={card.name} className="flex flex-col items-center justify-start h-full">
                  <div className="w-full h-5/6">
                    <TarotCard
                      card={card}
                      isFlipped={flippedCards[index]}
                    />
                  </div>
                  <h3 className="mt-2 text-center font-bold text-amber-300 text-sm sm:text-base md:text-lg">{cardLabels[index]}</h3>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 text-xl flex items-center justify-center">
                Sẵn sàng khám phá vận mệnh của bạn?
              </div>
            )}
          </div>
        )}
      </div>

      {/* Khu vực luận giải */}
      <div className="w-full max-w-4xl mb-32 px-4">
        {isInterpreting && (
          <div className="flex flex-col items-center text-center p-8 bg-gray-800/50 rounded-lg">
            <div className="w-12 h-12 border-4 border-t-amber-400 border-gray-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-amber-300 text-lg tracking-widest">Đang luận giải...</p>
          </div>
        )}
        {interpretation && (
          <div className="bg-gray-800/50 rounded-lg p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-amber-300 mb-4 border-b-2 border-amber-500/50 pb-2">Luận Giải Trải Bài</h2>
            <div className="text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-wrap prose prose-invert max-w-none prose-p:my-2">
              {interpretation}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/50 backdrop-blur-sm flex justify-center z-10">
        <button
          onClick={handleDrawCards}
          disabled={isLoading || isInterpreting}
          className="px-8 py-4 bg-amber-500 text-gray-900 font-bold text-xl rounded-full shadow-lg shadow-amber-500/30 hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};

export default App;