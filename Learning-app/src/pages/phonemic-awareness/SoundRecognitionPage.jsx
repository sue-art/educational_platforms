import React from 'react';
import LessonDisplay from '@/components/ui/LessonDisplay';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ActivityCard from '@/components/ui/ActivityCard'; // Example usage

export default function SoundRecognitionPage() {
  const { t } = useTranslation();

  // Mock data for demonstration
  const mockActivities = [
    {
      id: 'sr1',
      title: t('sound_recognition_activity_1_title'),
      description: t('sound_recognition_activity_1_desc'),
      type: 'phonemic',
      difficulty: 'beginner',
      estimatedTimeMinutes: 5,
      activityPath: '/phonemic-awareness/sound-recognition/1',
    },
    {
      id: 'sr2',
      title: t('sound_recognition_activity_2_title'),
      description: t('sound_recognition_activity_2_desc'),
      type: 'phonemic',
      difficulty: 'intermediate',
      estimatedTimeMinutes: 7,
      activityPath: '/phonemic-awareness/sound-recognition/2',
      completionStatus: 'in_progress',
      progressValue: 60,
    },
  ];

  return (
    <LessonDisplay
      title={t('sound_recognition')}
      description={t('sound_recognition_page_description')}
    >
      <div className="space-y-6">
        <p>{t('sound_recognition_intro')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockActivities.map(activity => (
            <ActivityCard key={activity.id} {...activity} />
          ))}
        </div>

        {/* Example of a simple interactive element placeholder */}
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">{t('interactive_example_listen')}</h3>
          <p className="mb-4">{t('interactive_example_instruction_sr')}</p>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={() => alert(t('playing_sound_placeholder', {sound: '/a/'}))}>
              <Volume2 className="h-6 w-6" />
            </Button>
            <Button onClick={() => alert(t('selected_sound_placeholder', {sound: 'A'}))}>{t('option_a')}</Button>
            <Button onClick={() => alert(t('selected_sound_placeholder', {sound: 'B'}))}>{t('option_b')}</Button>
            <Button onClick={() => alert(t('selected_sound_placeholder', {sound: 'C'}))}>{t('option_c')}</Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{t('more_activities_coming_soon')}</p>
      </div>
    </LessonDisplay>
  );
}
