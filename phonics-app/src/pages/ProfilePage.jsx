import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { Award, BookOpen, Star, Activity, Edit } from 'lucide-react'; // Icons

// Mock data - replace with actual data from API later
const mockUser = {
  displayName: "Alex Doe",
  email: "alex.doe@example.com",
  avatarUrl: "https://github.com/shadcn.png", // Placeholder avatar
  joinDate: "2023-10-15",
  age: 7,
  preferredLanguage: "en",
};

const mockProgress = {
  overallCompletion: 65, // Percentage
  phonemicAwareness: {
    completedActivities: 5,
    totalActivities: 10,
    averageScore: 85,
    progress: 50, // Percentage
  },
  phonics: {
    completedActivities: 8,
    totalActivities: 15,
    averageScore: 90,
    progress: 53, // Percentage
  },
  writingPractice: {
    completedActivities: 2,
    totalActivities: 5,
    averageScore: 75,
    progress: 40, // Percentage
  },
};

const mockAchievements = [
  { id: 'ach1', title: "Sound Starter", description: "Completed 5 sound recognition activities", icon: <Star className="w-5 h-5 text-yellow-500" />, unlocked: true, date: "2023-11-01" },
  { id: 'ach2', title: "Blending Pro", description: "Mastered sound blending basics", icon: <Award className="w-5 h-5 text-blue-500" />, unlocked: true, date: "2023-11-15" },
  { id: 'ach3', title: "Phonics Explorer", description: "Explored all letter sounds", icon: <BookOpen className="w-5 h-5 text-green-500" />, unlocked: false },
  { id: 'ach4', title: "Word Builder I", description: "Built 20 words correctly", icon: <Activity className="w-5 h-5 text-red-500" />, unlocked: true, date: "2023-12-01" },
];

export default function ProfilePage() {
  const { t, i18n } = useTranslation();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={mockUser.avatarUrl} alt={mockUser.displayName} />
            <AvatarFallback>{mockUser.displayName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-3xl">{mockUser.displayName}</CardTitle>
            <CardDescription>{mockUser.email}</CardDescription>
            <CardDescription>{t('joined_on', { date: formatDate(mockUser.joinDate) })} | {t('age_years', { count: mockUser.age })}</CardDescription>
          </div>
          <Button variant="outline" size="icon" className="ml-auto">
            <Edit className="w-4 h-4" />
            <span className="sr-only">{t('edit_profile')}</span>
          </Button>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('overall_progress')}</CardTitle>
          <CardDescription>{t('overall_progress_desc', { progress: mockProgress.overallCompletion })}</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={mockProgress.overallCompletion} className="w-full h-3 mb-2" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <h4 className="font-semibold">{t('phonemic_awareness')}</h4>
              <Progress value={mockProgress.phonemicAwareness.progress} className="h-2 my-1" />
              <p className="text-xs text-muted-foreground">
                {t('completed_activities_count', { count: mockProgress.phonemicAwareness.completedActivities, total: mockProgress.phonemicAwareness.totalActivities })}
              </p>
            </div>
            <div>
              <h4 className="font-semibold">{t('phonics')}</h4>
              <Progress value={mockProgress.phonics.progress} className="h-2 my-1" />
              <p className="text-xs text-muted-foreground">
                 {t('completed_activities_count', { count: mockProgress.phonics.completedActivities, total: mockProgress.phonics.totalActivities })}
              </p>
            </div>
            <div>
              <h4 className="font-semibold">{t('writing_practice')}</h4>
              <Progress value={mockProgress.writingPractice.progress} className="h-2 my-1" />
              <p className="text-xs text-muted-foreground">
                {t('completed_activities_count', { count: mockProgress.writingPractice.completedActivities, total: mockProgress.writingPractice.totalActivities })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('achievements')}</CardTitle>
          <CardDescription>{t('achievements_desc')}</CardDescription>
        </CardHeader>
        <CardContent>
          {mockAchievements.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockAchievements.map(ach => (
                <Card key={ach.id} className={`p-4 ${ach.unlocked ? 'bg-green-50' : 'bg-muted/50 opacity-70'}`}>
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${ach.unlocked ? 'bg-green-100' : 'bg-gray-200'}`}>
                      {ach.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{t(ach.title)}</h4>
                      <p className="text-xs text-muted-foreground">{t(ach.description)}</p>
                      {ach.unlocked && ach.date && (
                        <p className="text-xs text-green-600 mt-1">{t('unlocked_on', { date: formatDate(ach.date) })}</p>
                      )}
                       {!ach.unlocked && (
                        <p className="text-xs text-amber-600 mt-1">{t('locked_achievement')}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p>{t('no_achievements_yet')}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
