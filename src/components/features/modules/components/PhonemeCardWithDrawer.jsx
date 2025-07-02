import React, { useState, useEffect, useCallback } from "react";
import ConsonantUnitTest from "../container/ConsonantUnitTest";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import { BookOpen } from "lucide-react";

import WordCard from "./WordCard";

const PhonemeCardWithDrawer = ({
  card,
  randomColor,
  randomColSpan,
  activeSlides,
  onUnitTestStart,
}) => {
  const cardId = card.id || `${card.phoneme}`;
  const words = card.examples
    ? Object.entries(card.examples).map(([word, phonemes]) => ({
        word,
        phonemes,
      }))
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);

  const handleSelect = useCallback(() => {
    if (emblaApi) {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // Attach event listeners
    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);

    console.log("Embla API initialized:", emblaApi);

    return () => {
      // Cleanup event listeners
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi, handleSelect]);

  //function for next button click
  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    console.log("onNextButtonClick called");
    emblaApi.scrollNext();
  }, [emblaApi]);

  //function for previous button click
  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) {
      console.warn("Embla API is not initialized yet.");
      return;
    }
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleUnitTestStart = () => {
    setDrawerOpen(false);
    onUnitTestStart(card);
  };

  // Skip rendering this card if no examples
  if (words.length === 0) {
    return null;
  }

  return (
    <div
      className={`sound-card-grid col-span-${randomColSpan} ${randomColor} rounded-lg p-4 text-center text-white`}
    >
      <div className="sound-card">
        <div className="pt-10 text-4xl font-bold">{card.phoneme}</div>
        <div className="sound-example">{card.example}</div>

        <img
          src={`/images/letter-${card.likelyToSeeWrite}.png`}
          alt={`Letter ${card.likelyToSeeWrite}`}
          className="w-48 mx-auto"
        />

        <p>{card.mightAlsoSeeWrite.join(", ")}</p>

        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <div className="relative mt-12 flex justify-center items-center">
              <Button
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-500 bg-white text-gray-500 hover:bg-gray-100"
                onClick={() => setDrawerOpen(true)}
              >
                <span className="material-icons">{">"}</span>
              </Button>
            </div>
          </DrawerTrigger>
          <DrawerContent className="mx-auto w-full bg-amber-300 text-white mt-0 pt-0">
            <div className="mx-auto w-full max-w-lg">
              <DrawerHeader>
                <div className="flex justify-end mb-2">
                  <DrawerClose asChild>
                    <Button
                      variant="outline"
                      className="bg-amber-300 text-white"
                      onClick={() => setDrawerOpen(false)}
                    >
                      Close
                    </Button>
                  </DrawerClose>
                </div>
                <div className="w-full mx-auto">
                  <div className="mx-auto w-full max-w-lg relative">
                    <div className="overflow-hidden h-50" ref={emblaRef}>
                      <div className="flex">
                        {words.map((wordObj, cardIndex) => (
                          <div
                            key={cardIndex}
                            className="flex-[0_0_100%] min-w-0"
                          >
                            <div className="p-1">
                              <div className="py-5 text-xl text-center font-bold">
                                {card.phoneme}
                              </div>
                              <WordCard
                                letters={wordObj.phonemes}
                                isVisible={true}
                                key={`word-${cardIndex}-${
                                  currentIndex === cardIndex
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-500 hover:bg-gray-100 w-10 h-10 rounded-full"
                      onClick={onPrevButtonClick}
                    >
                      <span className="material-icons">{"<"}</span>
                    </Button>
                    <Button
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-500 hover:bg-gray-100 w-10 h-10 rounded-full"
                      onClick={onNextButtonClick}
                    >
                      <span className="material-icons">{">"}</span>
                    </Button>
                  </div>
                </div>
                <DrawerDescription>
                  <div className="text-white font-semibold mt-4">
                    sound: {card.phoneme} - Variations:{" "}
                    {card.mightAlsoSeeWrite.join(", ")}
                  </div>
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <div className="flex justify-end mb-2">
                  <Button
                    variant="outline"
                    className="flex bg-amber-300 text-white items-center gap-2 w-full justify-center"
                    onClick={handleUnitTestStart}
                  >
                    <BookOpen className="h-4 w-4" />
                    Unit Test
                  </Button>
                </div>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default PhonemeCardWithDrawer;
