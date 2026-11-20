import { contactHref, site } from "@/lib/content";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="contact" id="contact">
      <div className="wrap">
        <h2>Tell me what you need built.</h2>
        <a className="contact-mail" href={contactHref}>
          {site.email}
        </a>
        <p className="contact-meta">
          <Wordmark />
          <span>
            {site.name}, {site.location}
          </span>
        </p>
      </div>
    </footer>
  );
}
