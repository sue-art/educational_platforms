import React from 'react';
import PageLayout from '../components/common/layout/PageLayout';
// import { useStudent } from '../contexts/StudentContext'; // Example

const WritingPage = () => {
  // const { student } = useStudent(); // Example

  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <div className="mb-6 pb-4 border-b border-border">
          <h1 className="text-3xl font-bold text-foreground">Writing Skills</h1>
          {/* {student && <p className="text-lg text-muted-foreground">Let's get writing, {student.name}!</p>} */}
          <p className="text-lg text-muted-foreground">Practice and improve your writing with guided exercises.</p>
        </div>

        {/* Placeholder Content */}
        <div className="text-center py-10 bg-card rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-primary mb-4">Coming Soon!</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Our writing module, featuring sentence construction, grammar practice, and creative writing prompts, is currently being developed.
          </p>
          {/* <ul className="mt-6 text-left max-w-sm mx-auto space-y-2">
            <li>- Sentence structuring</li>
            <li>- Grammar correction exercises</li>
            <li>- Creative story prompts</li>
            <li>- Essay writing guides</li>
          </ul> */}
        </div>
      </div>
    </PageLayout>
  );
};

export default WritingPage;
