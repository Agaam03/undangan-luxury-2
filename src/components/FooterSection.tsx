"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingData } from "../wedding-data";
import { useMediaQuery } from "react-responsive";

export const FooterSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.from(".footer-content", {
        scrollTrigger: { trigger: containerRef.current, start: "top 95%" },
        opacity: 0,
        y: 30,
        duration: 1.5,
        ease: "power2.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <footer
      ref={containerRef}
      className="bg-gradient-to-b from-black to-stone-950 text-stone-400 py-24 md:py-32 px-6 text-center w-full relative overflow-hidden"
    >


      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full flex justify-center">
        <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-romantic-500/30 to-transparent" />
      </div>

      <div className="footer-content relative max-w-4xl mx-auto flex flex-col items-center space-y-12">
        {/* Top Decorative Element */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-stone-700" />
          <span className="text-romantic-400 text-lg">❧</span>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-stone-700" />
        </div>

        {/* Thank You Section */}
        <div className="space-y-6 max-w-lg mx-auto">
          <span className="text-[10px] tracking-[0.5em] uppercase text-romantic-400/60 font-medium">
            With Love
          </span>
          <h2 className="font-script text-4xl md:text-6xl text-pink-400">
            Thank You
          </h2>
          <p className="font-elegant text-stone-500 text-base md:text-lg leading-relaxed italic">
            "{weddingData.footer.thankYouMessage}"
          </p>
        </div>

        {/* Divider */}
        <div className="w-full flex items-center gap-4 opacity-30">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-stone-600 to-transparent" />
          <span className="font-script text-2xl text-stone-500">&</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-stone-600 to-transparent" />
        </div>

        {/* Couple Names */}
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <p className="text-[10px] tracking-[0.5em] uppercase text-stone-600 font-medium">
              Celebrating the Union of
            </p>
            <div className="flex items-center gap-4 md:gap-6">
              <span className="font-script text-3xl md:text-5xl text-stone-200">
                {weddingData.groom.nickname}
              </span>
              <span className="font-script text-3xl md:text-4xl text-pink-400">&</span>
              <span className="font-script text-3xl md:text-5xl text-stone-200">
                {weddingData.bride.nickname}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <svg className="w-4 h-4 text-romantic-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="font-elegant italic text-stone-500 text-sm">
                {weddingData.event.location}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="flex items-center gap-4 pt-8">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-stone-700" />
          <div className="w-2 h-2 rounded-full bg-romantic-500/30" />
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-stone-700" />
        </div>

        {/* Copyright */}
        <div className="pt-4">
          <p className="text-[10px] uppercase tracking-[0.4em] text-stone-700 hover:text-stone-500 transition-colors cursor-default">
            © 2026 The Wedding of {weddingData.groom.nickname} & {weddingData.bride.nickname}
          </p>
        </div>
      </div>
    </footer>
  );
};
