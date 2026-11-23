import Link from "next/link";
import { contactHref, headline, intro, projects } from "@/lib/content";
import HeroSystem from "./HeroSystem";

export default function Hero() {
  const featured = projects.find((p) => p.slug);

  return (
    <section className="hero wrap" aria-labelledby="hero-heading">
      <div className="hero-grid">
        <div className="hero-left">
          <h1 className="hero-title" id="hero-heading">
            {headline.map((line, i) => (
              <span className="line" key={line}>
                <span className="line-inner" style={{ animationDelay: `${0.06 + i * 0.08}s` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div className="hero-aside">
            <p>{intro}</p>
            <div className="hero-actions">
              <a className="button" href={contactHref}>
                Start a project
              </a>
              {featured?.slug && (
                <Link className="hero-link" href={`/work/${featured.slug}`}>
                  <span>See {featured.title}</span>
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="hero-right">
          <HeroSystem />
        </div>
      </div>
    </section>
  );
}
