import React from "react";
import PropTypes from "prop-types";

const TestLayout = ({ title, progress, children }) => {
  return (
    <div className="test-layout">
      <header className="test-header">
        <h1>{title}</h1>
        {progress}
      </header>

      <main className="test-content">{children}</main>

      <footer className="test-footer">
        <p>Phonemic Awareness Assessment</p>
      </footer>
    </div>
  );
};

TestLayout.propTypes = {
  title: PropTypes.string.isRequired,
  progress: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default TestLayout;
