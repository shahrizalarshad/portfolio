import { contactHref, site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="contact" id="contact">
      <div className="wrap">
        <h2>Tell me what you need built.</h2>
        <a className="contact-mail" href={contactHref}>
          {site.email}
        </a>
        <p className="contact-meta">
          {site.name}, {site.location}
        </p>
      </div>
    </footer>
  );
}
