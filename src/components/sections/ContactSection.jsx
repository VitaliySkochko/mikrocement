import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactSection.css";

export function ContactSection({ contact, lang = "pl" }) {
  const [status, setStatus] = useState(null);

  const messages = {
    success: {
      pl: "Dziękujemy! Skontaktujemy się z Tobą w ciągu 24 godzin.",
      en: "Thank you! We will contact you within 24 hours.",
    },
    error: {
      pl: "Wystąpił błąd. Spróbuj ponownie.",
      en: "Something went wrong. Please try again.",
    },
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus(null);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("success");
        e.target.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        setStatus("error");
      });
  };

  return (
    <section id="contact" className="section section-highlight">
      <div className="container contact-wrap">
        <div className="contact-copy reveal" data-reveal="text">
          <p className="hero-label">Private Design Consultation</p>
          <h2>{contact.title}</h2>
          <p>{contact.text}</p>

          <p className="contact-note">
            E-mail:{" "}
            <a href="mailto:luxmikrocement@gmail.com" className="contact-link">
              luxmikrocement@gmail.com
            </a>
            <br />
            Tel:{" "}
            <a href="tel:+48573271700" className="contact-link">
              +48 573 271 700
            </a>
          </p>
        </div>

        <form
          className="contact-form reveal"
          onSubmit={sendEmail}
          data-reveal="cta"
          style={{ "--reveal-delay": "160ms" }}
        >
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            required
          />

          <label htmlFor="contact-phone">Phone</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="+48 000 000 000"
            autoComplete="tel"
            required
          />

          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            rows="5"
            placeholder="Tell us about your project..."
            autoComplete="off"
            required
          />

          <button type="submit" className="btn btn-primary">
            Request a Quote
          </button>

          {status === "success" && (
            <div className="form-message success">{messages.success[lang]}</div>
          )}

          {status === "error" && (
            <div className="form-message error">{messages.error[lang]}</div>
          )}
        </form>
      </div>
    </section>
  );
}