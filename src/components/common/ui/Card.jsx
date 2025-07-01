import React from 'react';
import PropTypes from 'prop-types';

/**
 * Basic Card component placeholder.
 * shadcn/ui also provides a Card component that can be added via `npx shadcn-ui@latest add card`
 * This is a simpler version for now.
 */
const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-card text-card-foreground border rounded-lg shadow-md p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
