"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingData } from "../wedding-data";
import { useMediaQuery } from "react-responsive";

export const CoupleSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.from(".couple-header", {
        scrollTrigger: { trigger: ".couple-header", start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 1,
      });
      gsap.from(".groom-card", {
        scrollTrigger: { trigger: ".groom-card", start: "top 80%" },
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(".bride-card", {
        scrollTrigger: { trigger: ".bride-card", start: "top 80%" },
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section
      ref={containerRef}
      id="couple"
      className="w-full py-20 md:py-52 px-6 md:px-12 bg-romantic-100 border-y border-romantic-200/50 scroll-mt-20"
    >
      <div className="max-w-[100rem] mx-auto">
        <div className="couple-header text-center mb-8">
          <span className="text-sm font-sans tracking-[0.4em] uppercase text-stone-500 font-bold">
            The Couple
          </span>
          <h2 className="text-[34px] md:text-6xl font-serif mt-6 text-pink-500 italic">
            Mempelai Pria & Wanita
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center">
          <div className="groom-card flex flex-col items-center text-center group">
            <div className="w-full max-w-lg aspect-[3/4] relative overflow-hidden mb-10 shadow-xl rotate-1 group-hover:rotate-0 transition-transform duration-500 bg-stone-200">
              <img
                src={weddingData.groom.image}
                alt={weddingData.groom.fullName}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <h3 className="font-serif text-4xl text-pink-500 mb-3">
              {weddingData.groom.fullName}
            </h3>
            <p className="text-sm font-sans tracking-widest uppercase text-stone-400 mb-2">
              {weddingData.groom.parents}
            </p>
            <p className="text-stone-600 max-w-md  leading-relaxed italic">
              "{weddingData.groom.bio}"
            </p>
          </div>
          <div className="bride-card flex flex-col items-center text-center group">
            <div className="w-full max-w-lg aspect-[3/4] relative overflow-hidden mb-10 shadow-xl -rotate-1 group-hover:rotate-0 transition-transform duration-500 bg-stone-200">
              <img
                src={weddingData.bride.image}
                alt={weddingData.bride.fullName}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <h3 className="font-serif text-4xl text-pink-500 mb-3">
              {weddingData.bride.fullName}
            </h3>
            <p className="text-sm font-sans tracking-widest uppercase text-stone-400 mb-2">
              {weddingData.bride.parents}
            </p>
            <p className="text-stone-600 max-w-md leading-relaxed italic">
              "{weddingData.bride.bio}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
