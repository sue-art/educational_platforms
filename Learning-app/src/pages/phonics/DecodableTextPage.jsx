import React from 'react';
import LessonDisplay from '@/components/ui/LessonDisplay';
import { Button } from '@/components/ui/button';
import { Highlighter, BookMarked } from 'lucide-react'; // Example icons
import { useTranslation } from 'react-i18next';
import ActivityCard from '@/components/ui/ActivityCard';

// Mock decodable text
const mockText = {
  title: "A Cat on a Mat",
  paragraphs: [
    "A cat sat on a mat.",
    "The cat is fat.",
    "The fat cat sat and sat.",
    "A rat ran to the mat.",
    "The cat saw the rat."
  ],
  highlightPatterns: ["at", "an"], // Example patterns to highlight
};

export default function DecodableTextPage() {
  const { t } = useTranslation();

  const highlightText = (text, patterns) => {
    if (!patterns || patterns.length === 0) return text;
    // Simple highlighter, can be improved for overlapping patterns etc.
    let highlightedText = text;
    patterns.forEach(pattern => {
      const regex = new RegExp(`(${pattern})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 rounded">$1</mark>');
    });
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const mockActivities = [
    {
      id: 'dt1',
      title: t('decodable_text_activity_1_title'),
      description: t('decodable_text_activity_1_desc'),
      type: 'phonics',
      difficulty: 'intermediate',
      estimatedTimeMinutes: 10,
      activityPath: '/phonics/decodable-texts/activity/1',
    },
  ];

  return (
    <LessonDisplay
      title={t('decodable_texts')}
      description={t('decodable_texts_page_description')}
    >
      <div className="space-y-6">
        <p>{t('decodable_texts_intro')}</p>

        {/* Decodable Text Area */}
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <BookMarked className="mr-2 h-5 w-5 text-primary" />
            {t(mockText.title)}
          </h3>
          <div className="space-y-3 text-lg leading-relaxed">
            {mockText.paragraphs.map((paragraph, index) => (
              <p key={index}>
                {highlightText(paragraph, mockText.highlightPatterns)}
              </p>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" onClick={() => alert(t('toggle_highlight_placeholder'))}>
              <Highlighter className="mr-2 h-4 w-4" /> {t('toggle_highlights')}
            </Button>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8">{t('comprehension_questions_placeholder_title')}</h3>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>{t('comprehension_q1_placeholder')}</li>
            <li>{t('comprehension_q2_placeholder')}</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8">{t('related_stories_activities')}</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockActivities.map(activity => (
            <ActivityCard key={activity.id} {...activity} />
          ))}
        </div>

        <p className="text-sm text-muted-foreground">{t('more_stories_coming_soon')}</p>
      </div>
    </LessonDisplay>
  );
}
