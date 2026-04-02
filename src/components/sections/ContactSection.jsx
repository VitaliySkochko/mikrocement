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
        <div className="contact-copy">
          <p className="hero-label reveal" data-reveal="text">
            Private Design Consultation
          </p>

          <h2 className="reveal" data-reveal="heading" style={{ "--reveal-order": 1 }}>
            {contact?.title || ""}
          </h2>

          <p className="reveal" data-reveal="text" style={{ "--reveal-order": 2 }}>
            {contact?.text || ""}
          </p>

          <p className="contact-note reveal" data-reveal="text" style={{ "--reveal-order": 3 }}>
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

        <form className="contact-form" onSubmit={sendEmail}>
          <label
            htmlFor="contact-name"
            className="reveal"
            data-reveal="text"
            style={{ "--reveal-order": 0 }}
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            required
            className="reveal"
            data-reveal="cta"
            style={{ "--reveal-order": 1 }}
          />

          <label
            htmlFor="contact-phone"
            className="reveal"
            data-reveal="text"
            style={{ "--reveal-order": 2 }}
          >
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="+48 000 000 000"
            autoComplete="tel"
            required
            className="reveal"
            data-reveal="cta"
            style={{ "--reveal-order": 3 }}
          />

          <label
            htmlFor="contact-email"
            className="reveal"
            data-reveal="text"
            style={{ "--reveal-order": 4 }}
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="reveal"
            data-reveal="cta"
            style={{ "--reveal-order": 5 }}
          />

          <label
            htmlFor="contact-message"
            className="reveal"
            data-reveal="text"
            style={{ "--reveal-order": 6 }}
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows="5"
            placeholder="Tell us about your project..."
            autoComplete="off"
            required
            className="reveal"
            data-reveal="cta"
            style={{ "--reveal-order": 7 }}
          />

          <button
            type="submit"
            className="btn btn-primary reveal"
            data-reveal="cta"
            style={{ "--reveal-order": 8 }}
          >
            Request a Quote
          </button>

          {status === "success" && (
            <div className="form-message success">
              {messages.success[lang] || messages.success.pl}
            </div>
          )}

          {status === "error" && (
            <div className="form-message error">
              {messages.error[lang] || messages.error.pl}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}