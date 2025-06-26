import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Zap } from "lucide-react"; // Example icons
import { useTranslation } from 'react-i18next';

export default function ActivityCard({
  id,
  title,
  description,
  type = "phonics", // 'phonics', 'phonemic', 'writing'
  difficulty = "beginner", // 'beginner', 'intermediate', 'advanced'
  estimatedTimeMinutes,
  imageUrl, // Optional image for the card
  completionStatus = "not_started", // 'not_started', 'in_progress', 'completed'
  score, // if completed
  progressValue, // for 'in_progress'
  activityPath, // e.g., /phonics/letter-sounds/1
}) {
  const { t } = useTranslation();

  const getIcon = () => {
    switch (type) {
      case 'phonemic':
        return <Zap className="w-5 h-5 mr-2" />;
      case 'writing':
        return <PenTool className="w-5 h-5 mr-2" />;
      case 'phonics':
      default:
        return <BookOpen className="w-5 h-5 mr-2" />;
    }
  };

  return (
    <Card className="flex flex-col h-full">
      {imageUrl && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex items-center">
          {getIcon()}
          {title}
        </CardTitle>
        <CardDescription className="h-10 overflow-hidden text-ellipsis">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-muted-foreground mb-2">
          <span>{t(`difficulty_${difficulty}`)}</span>
          {estimatedTimeMinutes && <span> &middot; {t('estimated_time', {count: estimatedTimeMinutes})}</span>}
        </div>
        {completionStatus === 'in_progress' && progressValue !== undefined && (
          <div>
            <Progress value={progressValue} className="w-full h-2 mb-1" />
            <p className="text-xs text-muted-foreground">{t('in_progress')} ({progressValue}%)</p>
          </div>
        )}
        {completionStatus === 'completed' && score !== undefined && (
          <p className="text-sm font-semibold text-green-600">{t('completed_score', {score})}</p>
        )}
         {completionStatus === 'not_started' && (
          <p className="text-sm text-blue-600">{t('not_started')}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={activityPath || `/activity/${id}`}>
            {completionStatus === 'completed' ? t('review_activity') :
             completionStatus === 'in_progress' ? t('continue_activity') :
             t('start_activity')}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
