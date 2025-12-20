"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingData } from "../wedding-data";
// Fix: Import useMediaQuery from react-responsive to handle mobile checks properly
import { useMediaQuery } from "react-responsive";

export const QuoteSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  // Fix: Use react-responsive hook to detect desktop view
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    // Fix: Disable animations on mobile using react-responsive
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.from(".quote-icon", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        scale: 0,
        opacity: 0,
        rotation: 45,
        duration: 1,
        ease: "back.out(1.7)",
      });
      gsap.from(".quote-text", {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(".quote-ref", {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.4,
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isDesktop]); // Fix: Re-run effect when screen size changes

  return (
    <section
      ref={containerRef}
      className="w-full py-40 md:py-48 bg-white flex flex-col items-center justify-center px-6 min-h-[60vh]"
    >
      <div className="max-w-4xl text-center">
        <span className="quote-icon text-5xl text-romantic-300 font-serif mb-8 block">
          ❝
        </span>
        <p className="quote-text font-serif text-2xl md:text-3xl text-stone-600 italic leading-relaxed">
          "{weddingData.event.quote.text}"
        </p>
        <span className="quote-ref block mt-10 text-sm font-bold tracking-[0.25em] text-romantic-300 uppercase">
          {weddingData.event.quote.source}
        </span>
      </div>
    </section>
  );
};
