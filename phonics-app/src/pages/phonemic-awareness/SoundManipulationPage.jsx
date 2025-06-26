import React from 'react';
import LessonDisplay from '@/components/ui/LessonDisplay';
import { Button } from '@/components/ui/button';
import { Shuffle, Trash2, PlusCircle } from 'lucide-react'; // Example icons
import { useTranslation } from 'react-i18next';
import ActivityCard from '@/components/ui/ActivityCard';

export default function SoundManipulationPage() {
  const { t } = useTranslation();
   const mockActivities = [
    {
      id: 'sm1',
      title: t('sound_manipulation_activity_1_title'),
      description: t('sound_manipulation_activity_1_desc'),
      type: 'phonemic',
      difficulty: 'advanced',
      estimatedTimeMinutes: 10,
      activityPath: '/phonemic-awareness/sound-manipulation/1',
    },
  ];

  return (
    <LessonDisplay
      title={t('sound_manipulation')}
      description={t('sound_manipulation_page_description')}
    >
      <div className="space-y-6">
        <p>{t('sound_manipulation_intro')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockActivities.map(activity => (
            <ActivityCard key={activity.id} {...activity} />
          ))}
        </div>

        {/* Example of a simple interactive element placeholder */}
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">{t('interactive_example_manipulate')}</h3>
          <p className="mb-4">{t('interactive_example_instruction_sm', {word: 'cat', sound_to_change: '/c/', new_sound: '/b/'})}</p>
          <div className="flex items-center space-x-4 mb-2">
            <span className="font-semibold text-xl">{t('word_cat')}</span>
            <Button variant="outline" onClick={() => alert(t('playing_word_placeholder', {word: 'cat'}))}>
              {t('listen')}
            </Button>
          </div>
          <p className="mb-2">{t('what_is_new_word_prompt')}</p>
          <div className="flex items-center space-x-4">
            <Button onClick={() => alert(t('selected_word_placeholder', {word: 'bat'}))}>{t('word_bat')}</Button>
            <Button onClick={() => alert(t('selected_word_placeholder', {word: 'cap'}))}>{t('word_cap')}</Button>
            <Button onClick={() => alert(t('selected_word_placeholder', {word: 'cot'}))}>{t('word_cot')}</Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{t('more_activities_coming_soon')}</p>
      </div>
    </LessonDisplay>
  );
}
