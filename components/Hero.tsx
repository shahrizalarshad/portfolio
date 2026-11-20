"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { headline, intro } from "@/lib/content";
import { motionState } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// WebGL tak boleh render kat server, jadi load kat browser je.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Satu sequence masa page load: blok bercantum, lepas tu teks naik.
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(motionState, { assemble: 1, duration: 2.6, ease: "none" }, 0.2)
          .from(".line-inner", { yPercent: 110, duration: 1.1, stagger: 0.09 }, 0.5)
          .from(".hero-aside", { opacity: 0, y: 16, duration: 0.8 }, 1.3);

        // Masa scroll: kiub terbuka dan berpusing.
        gsap.to(motionState, {
          explode: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        motionState.assemble = 1;
      });
    },
    { scope: root },
  );

  return (
    <section className="hero" ref={root}>
      <div className="hero-canvas" aria-hidden="true">
        <Scene />
      </div>
      <div className="hero-copy wrap">
        <h1 className="hero-title">
          {headline.map((line) => (
            <span className="line" key={line}>
              <span className="line-inner">{line}</span>
            </span>
          ))}
        </h1>
        <div className="hero-aside">
          <p>{intro}</p>
          <a className="button" href="#contact">
            Start a project
          </a>
        </div>
      </div>
    </section>
  );
}
