import React from "react";
import PhonemeCardWithDrawer from "../presentational/PhonemeCardWithDrawer";

export const PhonemeGrid = ({ 
  phonemeCards, 
  activeSlides, 
  onUnitTestStart 
}) => {
  const colors = [
    "bg-amber-200",
    "bg-emerald-200",
    "bg-amber-300",
    "bg-emerald-500",
    "bg-amber-300",
    "bg-emerald-500",
    "bg-amber-200",
    "bg-emerald-200",
  ];

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {phonemeCards.map((card, index) => {
        const randomColor = colors[index % colors.length];
        const randomColSpan = Math.random() > 0.5 ? 2 : 1;
        
        return (
          <PhonemeCardWithDrawer
            key={card.id || `${card.phoneme}`}
            card={card}
            randomColor={randomColor}
            randomColSpan={randomColSpan}
            activeSlides={activeSlides}
            onUnitTestStart={() => onUnitTestStart(card)}
          />
        );
      })}
    </div>
  );
};
