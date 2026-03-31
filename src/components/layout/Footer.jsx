import React from 'react';
import './Footer.css';

export function Footer({ text }) {
  return (
    <footer className="footer">
      <div className="container">
        <p>{text}</p>
      </div>
    </footer>
  );
}
