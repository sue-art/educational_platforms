import React from "react";

import {
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";

import { BookOpen } from "lucide-react";
import Carousel from "./Carousel";

const DrawerContentComponent = ({
  card,
  handleStartUnitTest,
  activeSlide,
  registerCarousel,
}) => {
  const words = Object.entries(card.examples || {}).map(([word, phonemes]) => ({
    word,
    phonemes,
  }));

  return (
    <div>
      <DrawerHeader>
        <DrawerClose asChild>
          <Button>Close</Button>
        </DrawerClose>
      </DrawerHeader>
      <Carousel
        cardId={card.id || card.phoneme}
        words={words}
        registerCarousel={registerCarousel}
        activeSlide={activeSlide}
      />
      <DrawerFooter>
        <Button onClick={() => handleStartUnitTest(card)}>
          <BookOpen /> Close Start Unit Test
        </Button>
      </DrawerFooter>
    </div>
  );
};

export default DrawerContentComponent;
