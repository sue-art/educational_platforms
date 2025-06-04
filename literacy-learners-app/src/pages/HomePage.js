// literacy-learners-app/src/pages/HomePage.js
import React from 'react';
import { Typography, Button } from "@material-tailwind/react";

const HomePage = () => {
  return (
    <div className="text-center p-8">
      <Typography variant="h2" color="blue-gray" className="mb-4">
        Welcome to Literacy Learners!
      </Typography>
      <Typography variant="paragraph" color="gray" className="mb-8">
        Let's start learning and have some fun!
      </Typography>
      <Button color="light-blue">Get Started</Button>
      {/* We can add more engaging content here later */}
    </div>
  );
};

export default HomePage;
