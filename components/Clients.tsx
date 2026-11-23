"use client";

import { useEffect, useRef, useState } from "react";
import { clients } from "@/lib/content";

export default function Clients() {
  const root = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`clients wrap${visible ? " is-visible" : ""}`}
      aria-labelledby="clients-title"
      ref={root}
    >
      <h2 id="clients-title">Clients and systems</h2>
      <ul>
        {clients.map((c, i) => (
          <li key={c.name} style={{ transitionDelay: `${i * 70}ms` }}>
            <div className="client" data-client={c.name.toLowerCase()}>
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
  );
}
