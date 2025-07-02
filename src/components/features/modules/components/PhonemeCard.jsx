import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

function PhonemeCard({ card, colors, registerCarousel }) {
  const cardId = card.id || `${card.phoneme}`;
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Effect for carousel registration
  useEffect(() => {
    if (emblaApi) {
      registerCarousel(cardId, emblaApi);

      // Set up listener
      emblaApi.on("select", () => {
        setCurrentSlideIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi, cardId, registerCarousel]);

  // Words processing
  const words = card.examples
    ? Object.entries(card.examples).map(([word, phonemes]) => ({
        word,
        phonemes,
      }))
    : [];

  // Skip rendering if no examples
  if (words.length === 0) {
    return null;
  }

  // Rest of card rendering
  return (
    <div
      className="phoneme-card"
      ref={emblaRef}
      style={{ border: `2px solid ${colors?.border || "#000"}` }}
    >
      <h3>{card.phoneme}</h3>
      <div className="phoneme-card-carousel">
        {words.map(({ word, phonemes }, idx) => (
          <div
            key={word}
            className={`phoneme-card-slide${
              idx === currentSlideIndex ? " active" : ""
            }`}
            style={{ background: colors?.background || "#fff" }}
          >
            <div className="phoneme-card-word">{word}</div>
            <div className="phoneme-card-phonemes">{phonemes.join(" ")}</div>
          </div>
        ))}
      </div>
      <div className="phoneme-card-pagination">
        {words.map((_, idx) => (
          <button
            key={idx}
            className={idx === currentSlideIndex ? "active" : ""}
            onClick={() => emblaApi && emblaApi.scrollTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          >
            ●
          </button>
        ))}
      </div>
    </div>
  );
}

export default PhonemeCard;
