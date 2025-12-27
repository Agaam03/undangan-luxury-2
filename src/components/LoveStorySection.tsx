"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingData } from "../wedding-data";
import { useMediaQuery } from "react-responsive";

export const LoveStorySection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.from(".story-header", {
        scrollTrigger: { trigger: ".story-header", start: "top 85%" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(".story-video", {
        scrollTrigger: { trigger: ".story-video", start: "top 80%" },
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(".story-item", {
        scrollTrigger: { trigger: ".story-footer", start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section
      ref={containerRef}
      id="love-story"
      className="py-24 md:py-40 px-6 md:px-12 bg-gradient-to-b from-white via-romantic-50/30 to-white w-full scroll-mt-20 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 -left-32 w-64 h-64 bg-romantic-200/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-32 w-64 h-64 bg-romantic-200/10 rounded-full blur-3xl" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="story-header text-center mb-16 md:mb-20">
          <span className="inline-block text-[10px] md:text-xs tracking-[0.5em] uppercase text-romantic-400 font-medium mb-4">
            ✦ The Journey ✦
          </span>
          <h2 className="font-script text-5xl md:text-7xl text-pink-500 mb-6">
            Our Love Story
          </h2>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-romantic-300 to-transparent mx-auto mb-8" />

          {/* Quote */}
          <div className="max-w-2xl mx-auto">
            <p className="font-elegant text-xl md:text-2xl text-stone-600 italic leading-relaxed">
              "{weddingData.story.quote}"
            </p>
            <p className="text-sm tracking-[0.3em] uppercase text-romantic-400 mt-4 font-medium">
              — {weddingData.story.quoteAuthor}
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="story-video relative mb-20 md:mb-28">
          {/* Decorative frame */}
          <div className="absolute -inset-3 border border-romantic-200/40 rounded-sm hidden md:block" />
          <div className="absolute -inset-6 border border-romantic-100/30 rounded-sm hidden md:block" />

          {/* Corner decorations */}
          <div className="absolute -top-8 -left-8 hidden md:block">
            <svg width="50" height="50" viewBox="0 0 50 50" className="text-romantic-300/50">
              <path d="M0 50 L0 0 L50 0" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
          <div className="absolute -bottom-8 -right-8 hidden md:block">
            <svg width="50" height="50" viewBox="0 0 50 50" className="text-romantic-300/50">
              <path d="M50 0 L50 50 L0 50" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative w-full aspect-video bg-stone-900  overflow-hidden group">
            <video
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
              src={weddingData.story.videoUrl}
              title="Prewedding Trailer"
              loop
              autoPlay
              muted
              playsInline
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
          </div>
        </div>

        {/* Story Timeline */}
        <div className="story-footer">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {weddingData.story.items.map((item, i) => (
              <div key={i} className="story-item text-center md:text-left">
                {/* Number badge */}
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-romantic-300/50 flex items-center justify-center">
                    <span className="font-elegant text-lg text-romantic-400 font-medium">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="w-12 h-[1px] bg-romantic-200 hidden md:block" />
                </div>

                <h3 className="font-script text-3xl md:text-4xl text-pink-500 mb-4">
                  {item.title}
                </h3>
                <p className="font-elegant text-stone-600 text-base md:text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}

            {/* Established Year */}
            <div className="story-item flex flex-col items-center md:items-end justify-center">
              <span className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-2">Together Since</span>
              <p className="font-script text-5xl md:text-6xl text-romantic-300">
                {weddingData.story.established}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center mt-20">
          <div className="flex items-center gap-4">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-romantic-300" />
            <span className="text-romantic-400 text-lg">❧</span>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-romantic-300" />
          </div>
        </div>
      </div>
    </section>
  );
};
