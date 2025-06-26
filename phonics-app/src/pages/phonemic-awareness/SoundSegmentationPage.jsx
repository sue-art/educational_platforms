import React from 'react';
import LessonDisplay from '@/components/ui/LessonDisplay';
import { Button } from '@/components/ui/button';
import { Scissors, VolumeUp } from 'lucide-react'; // Example icons
import { useTranslation } from 'react-i18next';
import ActivityCard from '@/components/ui/ActivityCard';

export default function SoundSegmentationPage() {
  const { t } = useTranslation();
  const mockActivities = [
    {
      id: 'ss1',
      title: t('sound_segmentation_activity_1_title'),
      description: t('sound_segmentation_activity_1_desc'),
      type: 'phonemic',
      difficulty: 'intermediate',
      estimatedTimeMinutes: 8,
      activityPath: '/phonemic-awareness/sound-segmentation/1',
    },
  ];

  return (
    <LessonDisplay
      title={t('sound_segmentation')}
      description={t('sound_segmentation_page_description')}
    >
      <div className="space-y-6">
        <p>{t('sound_segmentation_intro')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockActivities.map(activity => (
            <ActivityCard key={activity.id} {...activity} />
          ))}
        </div>

        {/* Example of a simple interactive element placeholder */}
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">{t('interactive_example_segment')}</h3>
          <p className="mb-4">{t('interactive_example_instruction_ss')}</p>
          <div className="flex items-center space-x-4 mb-2">
            <span className="font-semibold text-xl">{t('word_dog')}</span>
            <Button variant="outline" size="icon" onClick={() => alert(t('playing_word_placeholder', {word: 'dog'}))}>
              <VolumeUp className="h-6 w-6" />
            </Button>
          </div>
          <p className="mb-2">{t('how_many_sounds_prompt')}</p>
          <div className="flex items-center space-x-4">
            <Button onClick={() => alert(t('selected_number_placeholder', {number: 1}))}>1</Button>
            <Button onClick={() => alert(t('selected_number_placeholder', {number: 2}))}>2</Button>
            <Button onClick={() => alert(t('selected_number_placeholder', {number: 3}))}>3</Button>
            <Button onClick={() => alert(t('selected_number_placeholder', {number: 4}))}>4</Button>
          </div>
           <div className="mt-4">
            <Button variant="secondary" onClick={() => alert(t('show_answer_placeholder_ss'))}>
               {t('show_answer')} (/d/, /o/, /g/)
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{t('more_activities_coming_soon')}</p>
      </div>
    </LessonDisplay>
  );
}
