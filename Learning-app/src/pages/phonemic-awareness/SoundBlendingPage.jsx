import React from 'react';
import LessonDisplay from '@/components/ui/LessonDisplay';
import { Button } from '@/components/ui/button';
import { Ear, Mic } from 'lucide-react'; // Example icons
import { useTranslation } from 'react-i18next';
import ActivityCard from '@/components/ui/ActivityCard';

export default function SoundBlendingPage() {
  const { t } = useTranslation();
    // Mock data for demonstration
  const mockActivities = [
    {
      id: 'sb1',
      title: t('sound_blending_activity_1_title'),
      description: t('sound_blending_activity_1_desc'),
      type: 'phonemic',
      difficulty: 'beginner',
      estimatedTimeMinutes: 6,
      activityPath: '/phonemic-awareness/sound-blending/1',
      completionStatus: 'completed',
      score: 90,
    },
  ];

  return (
    <LessonDisplay
      title={t('sound_blending')}
      description={t('sound_blending_page_description')}
    >
      <div className="space-y-6">
        <p>{t('sound_blending_intro')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockActivities.map(activity => (
            <ActivityCard key={activity.id} {...activity} />
          ))}
        </div>

        {/* Example of a simple interactive element placeholder */}
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">{t('interactive_example_blend')}</h3>
          <p className="mb-4">{t('interactive_example_instruction_sb')}</p>
          <div className="flex items-center space-x-2 mb-2">
            <Button variant="outline" onClick={() => alert(t('playing_sound_placeholder', {sound: '/c/'}))}>/c/</Button>
            <Button variant="outline" onClick={() => alert(t('playing_sound_placeholder', {sound: '/a/'}))}>/a/</Button>
            <Button variant="outline" onClick={() => alert(t('playing_sound_placeholder', {sound: '/t/'}))}>/t/</Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => alert(t('selected_word_placeholder', {word: 'cat'}))}>{t('word_cat')}</Button>
            <Button onClick={() => alert(t('selected_word_placeholder', {word: 'cap'}))}>{t('word_cap')}</Button>
            <Button onClick={() => alert(t('selected_word_placeholder', {word: 'can'}))}>{t('word_can')}</Button>
          </div>
          <div className="mt-4">
            <Button variant="secondary" onClick={() => alert(t('record_attempt_placeholder'))}>
              <Mic className="mr-2 h-4 w-4" /> {t('try_blending_aloud')}
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{t('more_activities_coming_soon')}</p>
      </div>
    </LessonDisplay>
  );
}
