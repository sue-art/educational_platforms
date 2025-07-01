import React from 'react';
import PageLayout from '../components/common/layout/PageLayout';
import { Button } from '@/components/ui/button'; // shadcn Button
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <PageLayout>
      <div className="text-center py-10 md:py-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
          Welcome to the Learning App!
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Your journey to mastering new skills starts here. Explore our interactive lessons and modules.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4">
          <Button asChild size="lg">
            <Link to="/phonics">Explore Phonics</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link to="/reading">Start Reading</Link>
          </Button>
          {/* Add more CTAs as needed */}
        </div>

        {/* Example of using a common UI Card component if available */}
        {/* <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="bg-card">
            <Card.Header>
              <Card.Title>Interactive Lessons</Card.Title>
            </Card.Header>
            <Card.Content>
              <p>Engage with fun and effective learning modules.</p>
            </Card.Content>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title>Track Your Progress</Card.Title>
            </Card.Header>
            <Card.Content>
              <p>See how you improve over time with detailed feedback.</p>
            </Card.Content>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title>For All Ages</Card.Title>
            </Card.Header>
            <Card.Content>
              <p>Content designed for learners at various stages.</p>
            </Card.Content>
          </Card>
        </div> */}
      </div>
    </PageLayout>
  );
};

export default HomePage;
