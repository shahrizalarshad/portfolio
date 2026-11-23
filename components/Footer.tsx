import { contactHref, site } from "@/lib/content";
import CopyEmailButton from "./CopyEmailButton";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="contact" id="contact">
      <div className="wrap">
        <h2>Tell me what you need built.</h2>
        <div className="contact-actions">
          <a className="contact-mail" href={contactHref}>
            {site.email}
          </a>
          <CopyEmailButton email={site.email} />
        </div>
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
