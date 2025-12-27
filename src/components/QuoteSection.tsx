"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingData } from "../wedding-data";
import { useMediaQuery } from "react-responsive";

export const QuoteSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.from(".quote-container", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(".quote-decoration-left", {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        x: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(".quote-decoration-right", {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        x: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section
      ref={containerRef}
      className="w-full py-32 md:py-48 bg-gradient-to-b from-romantic-50/50 via-white to-romantic-50/50 flex flex-col items-center justify-center px-6 min-h-[60vh] relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-romantic-100/20 rounded-full blur-3xl" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Decorative side elements */}
      <div className="quote-decoration-left absolute left-8 md:left-16 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-romantic-300 to-transparent" />
      </div>
      <div className="quote-decoration-right absolute right-8 md:right-16 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-romantic-300 to-transparent" />
      </div>

      <div className="quote-container max-w-4xl text-center relative z-10">
        {/* Top ornament */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-romantic-300" />
            <span className="font-script text-4xl text-romantic-300">❝</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-romantic-300" />
          </div>
        </div>

        {/* Quote text */}
        <p className="font-elegant text-xl md:text-3xl text-stone-700 italic leading-relaxed mb-8">
          "{weddingData.event.quote.text}"
        </p>

        {/* Bottom ornament */}
        <div className="flex justify-center mb-6">
          <span className="font-script text-3xl text-romantic-300">❞</span>
        </div>

        {/* Source */}
        <div className="flex items-center justify-center gap-4">
          <div className="w-8 h-[1px] bg-romantic-200" />
          <span className="text-xs font-medium tracking-[0.3em] text-pink-500 uppercase">
            {weddingData.event.quote.source}
          </span>
          <div className="w-8 h-[1px] bg-romantic-200" />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-12 left-12 w-20 h-20 border-l border-t border-romantic-200/50 hidden md:block" />
      <div className="absolute top-12 right-12 w-20 h-20 border-r border-t border-romantic-200/50 hidden md:block" />
      <div className="absolute bottom-12 left-12 w-20 h-20 border-l border-b border-romantic-200/50 hidden md:block" />
      <div className="absolute bottom-12 right-12 w-20 h-20 border-r border-b border-romantic-200/50 hidden md:block" />
    </section>
  );
};
