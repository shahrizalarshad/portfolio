import Link from "next/link";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Footer from "@/components/Footer";
import Wordmark from "@/components/Wordmark";
import { about, projects, services, site } from "@/lib/content";

export default function Home() {
  return (
    <>
      <header className="nav wrap">
        <a className="nav-name" href="#top" aria-label={`${site.name}, back to top`}>
          <Wordmark />
        </a>
        <nav aria-label="Main">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <Hero />

        <Clients />

        <section className="section wrap" id="work">
          <h2>Selected work</h2>
          <ul className="work">
            {projects.map((p, i) => (
              <li key={i}>
                {p.slug ? (
                  <Link className="work-row" href={`/work/${p.slug}`}>
                    <span className="work-title">{p.title}</span>
                    <span className="work-what">{p.what}</span>
                    <span className="work-kind">{p.kind}</span>
                  </Link>
                ) : (
                  <div className="work-row">
                    <span className="work-title">{p.title}</span>
                    <span className="work-what">{p.what}</span>
                    <span className="work-kind">{p.kind}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="section wrap" id="services">
          <h2>What I build</h2>
          <div className="services">
            {services.map((s) => (
              <div key={s.title}>
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
