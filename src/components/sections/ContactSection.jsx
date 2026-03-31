import React from 'react';
import './ContactSection.css';

export function ContactSection({ contact }) {
  return (
    <section id="contact" className="section section-highlight">
      <div className="container contact-wrap">
        <div className="contact-copy reveal" data-reveal>
          <p className="hero-label">Private Design Consultation</p>
          <h2>{contact.title}</h2>
          <p>{contact.text}</p>
          <p className="contact-note">{contact.note}</p>
        </div>
        <form className="contact-form reveal" action="mailto:contact@luxmikrocement.pl" method="post" data-reveal>
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" placeholder="Your full name" required />

          <label htmlFor="contact-phone">Phone</label>
          <input id="contact-phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" required />

          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" placeholder="you@example.com" required />

          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows="5" placeholder="Tell us about your project..." required />

          <button type="submit" className="btn btn-primary">
            Request a Quote
          </button>
        </form>
      </div>
    </section>
  );
}
