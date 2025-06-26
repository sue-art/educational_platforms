import React from 'react';
import LessonDisplay from '@/components/ui/LessonDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume2, Eye } from 'lucide-react'; // Eye for visual cue
import { useTranslation } from 'react-i18next';
import ActivityCard from '@/components/ui/ActivityCard';

export default function LetterSoundPage() {
  const { t } = useTranslation();

  // Mock data for demonstration
  const mockLetters = [
    { id: 'a', character: 'A a', sound: '/a/', exampleWord: t('word_apple'), mouthImageUrl: '/placeholders/mouth-a.png' },
    { id: 'b', character: 'B b', sound: '/b/', exampleWord: t('word_ball'), mouthImageUrl: '/placeholders/mouth-b.png' },
    { id: 'c', character: 'C c', sound: '/k/', exampleWord: t('word_cat'), mouthImageUrl: '/placeholders/mouth-c.png' },
  ];

  const mockActivities = [
    {
      id: 'ls1',
      title: t('letter_sound_activity_1_title'),
      description: t('letter_sound_activity_1_desc'),
      type: 'phonics',
      difficulty: 'beginner',
      estimatedTimeMinutes: 5,
      activityPath: '/phonics/letter-sounds/activity/1',
    },
  ];


  return (
    <LessonDisplay
      title={t('letter_sound_correspondence')}
      description={t('letter_sound_page_description')}
    >
      <div className="space-y-6">
        <p>{t('letter_sound_intro')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockLetters.map(letter => (
            <Card key={letter.id} className="text-center">
              <CardHeader>
                <CardTitle className="text-6xl font-bold">{letter.character}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-2xl">{t('sound_is', { sound: letter.sound })}</p>
                <p>{t('example_word_is', { word: letter.exampleWord })}</p>
                <div className="flex justify-center space-x-2 mt-2">
                  <Button variant="outline" size="icon" onClick={() => alert(t('playing_sound_placeholder', { sound: letter.sound }))}>
                    <Volume2 className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => alert(t('showing_mouth_placeholder', { image: letter.mouthImageUrl }))}>
                    <Eye className="h-5 w-5" />
                  </Button>
                </div>
                {/* Placeholder for mouth position image */}
                {/* <img src={letter.mouthImageUrl} alt={`Mouth position for ${letter.sound}`} className="w-20 h-20 mx-auto mt-2 border rounded" /> */}
              </CardContent>
            </Card>
          ))}
        </div>

        <h3 className="text-xl font-semibold mt-8">{t('related_activities')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockActivities.map(activity => (
            <ActivityCard key={activity.id} {...activity} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{t('more_letters_and_activities_coming_soon')}</p>
      </div>
    </LessonDisplay>
  );
}
