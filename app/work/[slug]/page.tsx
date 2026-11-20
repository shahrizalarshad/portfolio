import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
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
  return { title: `${c.title} | ${site.name}`, description: c.lead };
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c) notFound();

  return (
    <>
      <header className="case-nav wrap">
        <Link href="/">{site.name}</Link>
        <Link href="/#work">All work</Link>
      </header>

      <main>
        <section className="case-head wrap">
          <p className="case-kind">{c.kind}</p>
          <h1 className="case-title">{c.title}</h1>
          <p className="case-lead">{c.lead}</p>
          <dl className="case-facts">
            {c.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
        </section>

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
