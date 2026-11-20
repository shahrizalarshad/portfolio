import Hero from "@/components/Hero";
import { about, clients, contactHref, projects, services, site } from "@/lib/content";

export default function Home() {
  return (
    <>
      <header className="nav wrap">
        <a className="nav-name" href="#top">
          {site.name}
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

        <section className="clients wrap" aria-labelledby="clients-title">
          <h2 id="clients-title">Businesses I have built for</h2>
          <ul>
            {clients.map((c) => (
              <li key={c.name}>
                <div className="client">
                  {c.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.logo} alt={c.name} />
                  ) : (
                    <span className="client-name">{c.name}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="section wrap" id="work">
          <h2>Selected work</h2>
          <ul className="work">
            {projects.map((p, i) => (
              <li key={i}>
                <a href={p.href}>
                  <span className="work-title">{p.title}</span>
                  <span className="work-what">{p.what}</span>
                  <span className="work-kind">{p.kind}</span>
                </a>
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
    </>
  );
}
