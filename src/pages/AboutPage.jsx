import React from "react";

const AboutPage = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Our Learning Platform</h1>

        <p className="mb-4">
          Our educational application is designed to help children develop
          strong reading skills through phonics-based learning and guided
          reading practice.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Approach</h2>
        <p className="mb-4">
          We believe that learning to read should be fun and engaging. Our
          approach combines:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Systematic phonics instruction</li>
          <li>Interactive learning activities</li>
          <li>Guided reading practice</li>
          <li>Progress tracking and rewards</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
        <p className="mb-4">
          Our team consists of educators, developers, and designers who are
          passionate about creating effective learning tools for children.
        </p>

        <div className="mt-12 bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <p>
            If you have any questions or feedback, please email us at{" "}
            <a
              href="mailto:info@example.com"
              className="text-blue-600 hover:underline"
            >
              info@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
