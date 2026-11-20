"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { clients } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Clients() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Sekali je: logo muncul satu-satu bila bahagian ni masuk skrin, lepas tu diam.
        gsap.from(".client > *", {
          opacity: 0,
          y: 18,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section className="clients wrap" aria-labelledby="clients-title" ref={root}>
      <h2 id="clients-title">Clients and systems</h2>
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
  );
}
