import React from 'react';
import { usePhonics } from '../../context/PhonicsContext';
import { Button } from '@/components/ui/button'; // Using shadcn Button
import { cn } from '@/lib/utils';

// Basic Card component to represent a lesson group
const LessonGroupCard = ({ group, onSelectGroup, className }) => (
  <div
    className={cn(
      "group-card p-4 border rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer",
      "bg-card text-card-foreground",
      className
    )}
    onClick={() => onSelectGroup(group)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectGroup(group)}
  >
    <h3 className="text-lg font-semibold mb-2">{group.name}</h3>
    <p className="text-sm text-muted-foreground">
      {group.lessons ? `${group.lessons.length} lessons` : 'No lessons'}
    </p>
    <Button variant="link" className="mt-2 p-0 h-auto">View Lessons</Button>
  </div>
);


const LessonGroupsContainer = () => {
  const { lessonGroups, selectLessonGroup, loading, error } = usePhonics();

  if (loading) {
    return <div className="text-center p-10">Loading lesson groups...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-destructive">Error loading lesson groups: {error}</div>;
  }

  if (!lessonGroups || lessonGroups.length === 0) {
    return <div className="text-center p-10 text-muted-foreground">No lesson groups available.</div>;
  }

  return (
    <div className="lesson-groups-container space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">Lesson Groups</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessonGroups.map(group => (
          <LessonGroupCard
            key={group.id}
            group={group}
            onSelectGroup={selectLessonGroup}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonGroupsContainer;
