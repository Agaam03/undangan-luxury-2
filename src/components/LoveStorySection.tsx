"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingData } from "../wedding-data";
// Fix: Import useMediaQuery from react-responsive to handle mobile checks properly
import { useMediaQuery } from "react-responsive";

export const LoveStorySection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  // Fix: Use react-responsive hook to detect desktop view
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    // Fix: Disable animations on mobile using react-responsive
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
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(".story-item", {
        scrollTrigger: { trigger: ".story-footer", start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isDesktop]); // Fix: Re-run effect when screen size changes

  return (
    <section
      ref={containerRef}
      id="love-story"
      className="py-20 md:py-48 px-6 md:px-12 bg-white border-t border-romantic-200/30 w-full scroll-mt-20"
    >
      <div className="max-w-[100rem] mx-auto">
        <div className="story-header flex flex-col md:flex-row items-start justify-between mb-12 gap-5 border-b border-romantic-200 pb-12">
          <div className="max-w-3xl">
            <span className="text-sm font-sans tracking-[0.4em] uppercase text-stone-500 font-bold block mb-6">
              The Journey
            </span>
            <h2 className="text-5xl md:text-8xl font-serif text-pink-500 leading-none font-medium italic">
              Our Love Story
            </h2>
          </div>
          <div className="max-w-lg pb-4">
            <p className="font-serif italic text-2xl md:text-3xl text-stone-600 leading-relaxed font-medium">
              "{weddingData.story.quote}"
            </p>
            <p className="text-sm font-sans uppercase tracking-widest text-romantic-300 mt-4 font-bold">
              — {weddingData.story.quoteAuthor}
            </p>
          </div>
        </div>

        <div className="story-video relative w-full aspect-video bg-stone-900 shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 border-[1px] border-white/20 z-20 pointer-events-none m-6 md:m-12"></div>
          <iframe
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
            src={`${weddingData.story.videoUrl}?autoplay=0&controls=0&rel=0`}
            title="Prewedding Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <div className="story-footer mt-20 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
          {weddingData.story.items.map((item, i) => (
            <div key={i} className="story-item col-span-1">
              <h3 className="font-serif text-3xl text-stone-900 mb-4 font-medium">
                {item.title}
              </h3>
              <p className="font-sans text-stone-600 text-base md:text-lg leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
          <div className="story-item col-span-1 md:text-right flex flex-col justify-end">
            <p className="font-serif italic text-4xl md:text-5xl text-romantic-300 font-medium">
              Est. {weddingData.story.established}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
