import React from 'react';
import './Button.css';

function Button({ onClick, children, buttonType = 'primary', htmlType = 'button', disabled = false }) {
  return (
    <button
      className={`custom-button ${buttonType}`}
      onClick={onClick}
      type={htmlType}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
