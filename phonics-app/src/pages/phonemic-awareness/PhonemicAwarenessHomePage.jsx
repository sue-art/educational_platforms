import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Ear, Scissors, Shuffle } from 'lucide-react'; // Example icons
import { useTranslation } from 'react-i18next';

export default function PhonemicAwarenessHomePage() {
  const { t } = useTranslation();

  const awarenessActivities = [
    {
      title: t('sound_recognition'),
      description: t('sound_recognition_short_desc'),
      link: "/phonemic-awareness/sound-recognition",
      icon: <Zap className="w-6 h-6 mr-3 text-yellow-500" />
    },
    {
      title: t('sound_blending'),
      description: t('sound_blending_short_desc'),
      link: "/phonemic-awareness/sound-blending",
      icon: <Ear className="w-6 h-6 mr-3 text-blue-500" />
    },
    {
      title: t('sound_segmentation'),
      description: t('sound_segmentation_short_desc'),
      link: "/phonemic-awareness/sound-segmentation",
      icon: <Scissors className="w-6 h-6 mr-3 text-green-500" />
    },
    {
      title: t('sound_manipulation'),
      description: t('sound_manipulation_short_desc'),
      link: "/phonemic-awareness/sound-manipulation",
      icon: <Shuffle className="w-6 h-6 mr-3 text-purple-500" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white shadow-lg">
        <h1 className="text-3xl font-bold">{t('phonemic_awareness')}</h1>
        <p className="mt-2 text-lg opacity-90">{t('phonemic_awareness_description_long')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {awarenessActivities.map((activity, index) => (
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
        {t('phonemic_awareness_importance_note')}
      </p>
    </div>
  );
}
