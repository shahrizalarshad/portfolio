import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Footer from "@/components/Footer";
import Wordmark from "@/components/Wordmark";
import { about, projects, services, site } from "@/lib/content";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#top">
        Skip to content
      </a>

      <header className="nav wrap">
        <a className="nav-name" href="#top" aria-label={`${site.name}, back to top`}>
          <Wordmark />
        </a>
        <nav aria-label="Main">
          <a href="#work" className="nav-keep">
            Work
          </a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact" className="nav-keep">
            Contact
          </a>
        </nav>
      </header>

      <main id="top">
        <Hero />

        <Clients />

        <section className="section wrap" id="work">
          <h2>Selected work</h2>
          <ul className="work">
            {projects.map((p, idx) => {
              const inner = (
                <>
                  <div className="work-copy">
                    <div className="work-eyebrow">
                      <span className="work-no" aria-hidden="true">
                        0{idx + 1}
                      </span>
                      <span className="work-kind-pill">{p.kind}</span>
                    </div>
                    <span className="work-title">{p.title}</span>
                    <span className="work-what">{p.what}</span>
                    <div className="work-foot">
                      {p.meta && p.meta.length > 0 && (
                        <span className="work-meta">{p.meta.join(" · ")}</span>
                      )}
                      {p.slug && (
                        <span className="work-cta">
                          Case study <span className="arrow" aria-hidden="true">↗</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {p.image && (
                    <div className="work-media">
                      <Image
                        src={p.image}
                        alt={p.imageAlt ?? p.title}
                        width={1200}
                        height={896}
                        sizes="(max-width: 760px) 100vw, (max-width: 1024px) 42vw, 34vw"
                      />
                    </div>
                  )}
                </>
              );

              return (
                <li key={p.title}>
                  {p.slug ? (
                    <Link
                      id={`work-card-${p.slug}`}
                      className="work-row"
                      href={`/work/${p.slug}`}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div className="work-row">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="section wrap" id="services">
          <h2>What I build</h2>
          <div className="services">
            {services.map((s, idx) => (
              <div key={s.title}>
                <span className="service-no" aria-hidden="true">
                  0{idx + 1}
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section wrap about" id="about">
          <h2>About</h2>
          <div className="about-body">
            {about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
