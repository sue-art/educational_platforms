import React, { useState } from 'react';
import LessonDisplay from '@/components/ui/LessonDisplay';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // For typing the word
import { CheckCircle, XCircle, RefreshCw, Lightbulb } from 'lucide-react'; // Example icons
import { useTranslation } from 'react-i18next';
import ActivityCard from '@/components/ui/ActivityCard';

// Mock virtual letter tiles
const LetterTile = ({ letter, onClick }) => (
  <Button variant="outline" className="w-12 h-12 text-2xl font-bold" onClick={() => onClick(letter)}>
    {letter}
  </Button>
);

export default function WordBuildingPage() {
  const { t } = useTranslation();
  const [currentWord, setCurrentWord] = useState('');
  const [targetWord, setTargetWord] = useState('cat'); // Example target word
  const [feedback, setFeedback] = useState(''); // 'correct', 'incorrect', ''
  const [availableTiles, setAvailableTiles] = useState(['c', 'a', 't', 'b', 's', 'p']); // Example tiles

  const handleTileClick = (letter) => {
    setCurrentWord(prev => prev + letter);
    setFeedback('');
  };

  const checkWord = () => {
    if (currentWord.toLowerCase() === targetWord.toLowerCase()) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const clearWord = () => {
    setCurrentWord('');
    setFeedback('');
  };

  const nextChallenge = () => {
    // Placeholder for fetching next word/tiles
    alert(t('next_challenge_placeholder'));
    setCurrentWord('');
    setFeedback('');
    // Example: setTargetWord('dog'); setAvailableTiles(['d','o','g','f','l','m']);
  }

  const mockActivities = [
    {
      id: 'wb1',
      title: t('word_building_activity_1_title'),
      description: t('word_building_activity_1_desc'),
      type: 'phonics',
      difficulty: 'beginner',
      estimatedTimeMinutes: 7,
      activityPath: '/phonics/word-building/activity/1',
    },
  ];

  return (
    <LessonDisplay
      title={t('word_building')}
      description={t('word_building_page_description')}
    >
      <div className="space-y-6">
        <p>{t('word_building_intro')}</p>

        {/* Interactive Word Building Area */}
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">{t('build_the_word_prompt', { word: targetWord.toUpperCase() })}</h3>
          <p className="text-muted-foreground mb-4">{t('use_tiles_or_type')}</p>

          {/* Display current word being built */}
          <div className="flex items-center justify-center h-16 mb-4 text-3xl font-bold tracking-widest border rounded-md bg-muted">
            {currentWord || <span className="text-muted-foreground text-xl">{t('empty_word_placeholder')}</span>}
          </div>

          {/* Virtual Letter Tiles */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {availableTiles.map(tile => (
              <LetterTile key={tile} letter={tile} onClick={handleTileClick} />
            ))}
          </div>

          {/* Alternative: Input field for typing */}
          {/*
          <Input
            type="text"
            value={currentWord}
            onChange={(e) => setCurrentWord(e.target.value)}
            className="text-center text-2xl mb-4"
            placeholder={t('type_here_placeholder')}
          />
          */}

          <div className="flex justify-center space-x-2 mb-4">
            <Button onClick={checkWord} disabled={!currentWord}>
              <CheckCircle className="mr-2 h-4 w-4" /> {t('check_word')}
            </Button>
            <Button variant="outline" onClick={clearWord} disabled={!currentWord}>
              <RefreshCw className="mr-2 h-4 w-4" /> {t('clear')}
            </Button>
             <Button variant="ghost" size="icon" onClick={() => alert(t('hint_placeholder'))}>
              <Lightbulb className="h-5 w-5" />
              <span className="sr-only">{t('get_hint')}</span>
            </Button>
          </div>

          {feedback === 'correct' && (
            <div className="p-3 text-green-700 bg-green-100 border border-green-300 rounded-md flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" /> {t('correct_great_job')}
              <Button variant="link" onClick={nextChallenge} className="ml-auto">{t('next_word_prompt')}</Button>
            </div>
          )}
          {feedback === 'incorrect' && (
            <div className="p-3 text-red-700 bg-red-100 border border-red-300 rounded-md flex items-center">
              <XCircle className="mr-2 h-5 w-5" /> {t('incorrect_try_again')}
            </div>
          )}
        </div>

        <h3 className="text-xl font-semibold mt-8">{t('related_activities')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockActivities.map(activity => (
            <ActivityCard key={activity.id} {...activity} />
          ))}
        </div>

        <p className="text-sm text-muted-foreground">{t('more_word_building_challenges_soon')}</p>
      </div>
    </LessonDisplay>
  );
}
