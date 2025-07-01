import React from 'react';
import PageLayout from '../components/common/layout/PageLayout';
// import { useStudent } from '../contexts/StudentContext'; // Example if student data is needed

const ReadingPage = () => {
  // const { student } = useStudent(); // Example

  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <div className="mb-6 pb-4 border-b border-border">
          <h1 className="text-3xl font-bold text-foreground">Reading Comprehension</h1>
          {/* {student && <p className="text-lg text-muted-foreground">Ready to read, {student.name}?</p>} */}
           <p className="text-lg text-muted-foreground">Enhance your reading skills with engaging stories and exercises.</p>
        </div>

        {/* Placeholder Content */}
        <div className="text-center py-10 bg-card rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-primary mb-4">Coming Soon!</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Interactive reading exercises, stories, and comprehension quizzes are under development.
            Check back later for exciting new content!
          </p>
          {/* You can add more specific feature placeholders below */}
          {/* <ul className="mt-6 text-left max-w-sm mx-auto space-y-2">
            <li>- Age-appropriate stories</li>
            <li>- Vocabulary builders</li>
            <li>- Comprehension questions</li>
            <li>- Reading speed tests</li>
          </ul> */}
        </div>
      </div>
    </PageLayout>
  );
};

export default ReadingPage;
