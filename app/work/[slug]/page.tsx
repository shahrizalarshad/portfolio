import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseShowcase from "@/components/CaseShowcase";
import Footer from "@/components/Footer";
import Wordmark from "@/components/Wordmark";
import { cases } from "@/lib/cases";
import { site } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.lead,
    alternates: {
      canonical: `/work/${c.slug}`,
    },
    openGraph: {
      type: "article",
      url: `/work/${c.slug}`,
      title: `${c.title} | ${site.name}`,
      description: c.lead,
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.title} | ${site.name}`,
      description: c.lead,
    },
  };
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c) notFound();

  return (
    <>
      <a className="skip-link" href="#case-main">
        Skip to content
      </a>

      <header className="case-nav wrap">
        <Link href="/" aria-label={`${site.name}, home`}>
          <Wordmark />
        </Link>
        <Link className="case-back" href="/#work">
          <span aria-hidden="true">←</span> All work
        </Link>
      </header>

      <main id="case-main">
        <section className="case-head wrap">
          <p className="case-kind">{c.kind}</p>
          <h1 className="case-title">{c.title}</h1>
          <p className="case-lead">{c.lead}</p>
          <dl className="case-facts">
            {c.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <CaseShowcase slug={c.slug} image={c.image} />

        {c.flow && c.flow.length > 0 && (
          <section className="case-block wrap" aria-labelledby="case-flow-heading">
            <h2 id="case-flow-heading">How it connects</h2>
            <ol className="case-flow">
              {c.flow.map((stage) => (
                <li className="case-flow-step" key={stage.step}>
                  <span className="case-flow-no">{stage.step}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.detail}</p>
                  <ul className="case-flow-tags">
                    {stage.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="case-block wrap">
          <h2>What it does</h2>
          <div className="case-areas">
            {c.does.map((d) => (
              <div key={d.area}>
                <h3>{d.area}</h3>
                <ul className="case-list">
                  {d.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="case-block wrap">
          <h2>What the system now does by itself</h2>
          <ul className="case-list">
            {c.automates.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>

        <section className="case-block wrap">
          <h2>The hard parts</h2>
          <div className="case-hard">
            {c.hard.map((h) => (
              <div key={h.title}>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="case-block wrap">
          <h2>Built with</h2>
          <p className="case-stack">
            {c.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
