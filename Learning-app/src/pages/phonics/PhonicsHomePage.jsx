import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight, SpellCheck, Edit3, BookOpenText } from 'lucide-react'; // Example icons
import { useTranslation } from 'react-i18next';

export default function PhonicsHomePage() {
  const { t } = useTranslation();

  const phonicsActivities = [
    {
      title: t('letter_sound_correspondence'),
      description: t('letter_sound_short_desc'),
      link: "/phonics/letter-sounds",
      icon: <SpellCheck className="w-6 h-6 mr-3 text-red-500" />
    },
    {
      title: t('word_building'),
      description: t('word_building_short_desc'),
      link: "/phonics/word-building",
      icon: <Edit3 className="w-6 h-6 mr-3 text-yellow-500" />
    },
    {
      title: t('decodable_texts'),
      description: t('decodable_texts_short_desc'),
      link: "/phonics/decodable-texts",
      icon: <BookOpenText className="w-6 h-6 mr-3 text-teal-500" />
    }
    // Add Visual Cues for mouth positions later if it becomes its own page/section
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg text-white shadow-lg">
        <h1 className="text-3xl font-bold">{t('phonics')}</h1>
        <p className="mt-2 text-lg opacity-90">{t('phonics_description_long')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {phonicsActivities.map((activity, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center mb-2">
                {activity.icon}
                <CardTitle>{activity.title}</CardTitle>
              </div>
              <CardDescription>{activity.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link to={activity.link} className="w-full justify-between">
                  {t('explore_activity')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-center text-muted-foreground mt-8">
        {t('phonics_importance_note')}
      </p>
    </div>
  );
}
