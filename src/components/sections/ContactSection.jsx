import React from "react";
import emailjs from "@emailjs/browser";
import "./ContactSection.css";

export function ContactSection({ contact }) {

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      e.target,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(
      () => {
        alert("Message sent successfully!");
        e.target.reset();
      },
      (error) => {
        console.log(error);
        alert("Failed to send message");
      }
    );
  };

  return (
    <section id="contact" className="section section-highlight">
      <div className="container contact-wrap">
        <div className="contact-copy reveal" data-reveal="text">
          <p className="hero-label">Private Design Consultation</p>
          <h2>{contact.title}</h2>
          <p>{contact.text}</p>
          <p className="contact-note">{contact.note}</p>
        </div>

        <form className="contact-form reveal" onSubmit={sendEmail} data-reveal="cta" style={{ '--reveal-delay': '160ms' }}>
          
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" placeholder="Your full name" required />

          <label htmlFor="contact-phone">Phone</label>
          <input id="contact-phone" name="phone" type="tel" placeholder="+48 000 000 000" required />

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