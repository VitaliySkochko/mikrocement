import React, { useRef } from "react";
import "./ContactSection.css";
import { trackEvent } from "../../firebase/analytics";

import { CallbackForm } from "./CallbackForm";
import firLeft from "../assets/contact/fir-left.webp";
import firRight from "../assets/contact/fir-right.webp";
import firBow from "../assets/contact/fir-bow.webp";
import champagneGifts from "../assets/contact/champagne-gifts.webp";

export function ContactSection({ contact, lang }) {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} id="contact" className="section section-highlight microcement-surface">
      <div className="contact-holiday-corners reveal" data-reveal="holiday" aria-hidden="true">
        <img src={firLeft} alt="" width="440" height="406" loading="lazy" decoding="async" />
        <img src={firRight} alt="" width="440" height="391" loading="lazy" decoding="async" />
        <span className="contact-holiday-light" />
      </div>
      <div className="container contact-wrap">
        <div className="contact-copy">
          <div className="contact-holiday-heading reveal" data-reveal="holiday" aria-hidden="true">
            <img src={firBow} alt="" width="280" height="110" loading="lazy" decoding="async" />
          </div>
          <p className="hero-label reveal" data-reveal="text">
            {contact.label}
          </p>

          <h2 className="reveal" data-reveal="heading" style={{ "--reveal-order": 1 }}>
            {contact?.title || ""}
          </h2>

          <p className="reveal" data-reveal="text" style={{ "--reveal-order": 2 }}>
            {contact?.text || ""}
          </p>

          <p className="contact-note reveal" data-reveal="text" style={{ "--reveal-order": 3 }}>
            {contact.email}:{" "}
            <a onClick={() => trackEvent("email_clicked")} href="mailto:luxmikrocement@gmail.com" className="contact-link">
              luxmikrocement@gmail.com
            </a>
            <br />
            Facebook:{" "}
            <a
              onClick={() => trackEvent("facebook_clicked")}
              href="https://www.facebook.com/profile.php?id=61590254800791&locale=ru_RU"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link contact-facebook-link"
            >
              Lux Mikrocement
            </a>
            <span className="contact-company">
              <span className="contact-company-name">MICROLUX Roman Chyliński</span>
              <span className="contact-company-nip">NIP: 7391212476</span>
            </span>

          </p>
        </div>

        <div className="contact-form-area">
          <div className="contact-holiday-form reveal" data-reveal="holiday" aria-hidden="true">
            <img src={firBow} alt="" width="280" height="110" loading="lazy" decoding="async" />
            <span className="contact-holiday-star" />
            <span className="contact-holiday-star" />
          </div>
          <CallbackForm labels={contact.callback} lang={lang} sectionRef={sectionRef} />
          <div className="contact-holiday-gifts reveal" data-reveal="holiday" aria-hidden="true">
            <img src={champagneGifts} alt="" width="320" height="171" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
}
