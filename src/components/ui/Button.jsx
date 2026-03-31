import React from 'react';
import './Button.css';

export function Button({ variant = 'primary', children, className = '', ...props }) {
  return (
    <a className={`btn btn-${variant} ${className}`.trim()} {...props}>
      {children}
    </a>
  );
}
