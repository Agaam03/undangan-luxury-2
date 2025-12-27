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
        x: -80,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
      });
      gsap.from(".bride-card", {
        scrollTrigger: { trigger: ".bride-card", start: "top 80%" },
        x: 80,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(".ampersand", {
        scrollTrigger: { trigger: ".ampersand", start: "top 85%" },
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.5,
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section
      ref={containerRef}
      id="couple"
      className="w-full py-24 md:py-40 px-4 md:px-12 bg-gradient-to-b from-rose-50 via-white to-rose-50 relative overflow-hidden scroll-mt-20"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-romantic-100/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-romantic-100/30 to-transparent" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-romantic-300/30 hidden md:block" />
      <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-romantic-300/30 hidden md:block" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-romantic-300/30 hidden md:block" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-romantic-300/30 hidden md:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="couple-header text-center mb-16 md:mb-24">
          <span className="inline-block text-[10px] md:text-xs tracking-[0.5em] uppercase text-romantic-400 font-medium mb-4">
            ✦ The Wedding Of ✦
          </span>
          <h2 className="font-script text-5xl md:text-7xl text-romantic-600 mb-2">
            {weddingData.groom.nickname} & {weddingData.bride.nickname}
          </h2>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-romantic-300 to-transparent mx-auto mt-6" />
        </div>

        {/* Couple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-center relative">
          {/* Ampersand in center (desktop only) */}
          <div className="ampersand absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center border border-romantic-200">
              <span className="font-script text-5xl text-romantic-500">&</span>
            </div>
          </div>

          {/* Groom Card */}
          <div className="groom-card flex flex-col items-center group">
            {/* Photo Frame */}
            <div className="relative mb-8">
              {/* Outer decorative frame */}
              <div className="absolute -inset-4 border border-romantic-200/50 rounded-sm" />
              <div className="absolute -inset-2 border border-romantic-300/30 rounded-sm" />

              {/* Main photo container */}
              <div className="w-72 md:w-80 aspect-[3/4] relative overflow-hidden bg-stone-100">
                <img
                  src={weddingData.groom.image}
                  alt={weddingData.groom.fullName}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Decorative corner accents */}
              <div className="absolute -top-6 -left-6 w-12 h-12 border-l-2 border-t-2 border-romantic-400/50" />
              <div className="absolute -bottom-6 -right-6 w-12 h-12 border-r-2 border-b-2 border-romantic-400/50" />
            </div>

            {/* Info */}
            <div className="text-center px-4">
              <span className="text-[10px] tracking-[0.4em] uppercase text-stone-400 font-medium">The Groom</span>
              <h3 className="font-script text-4xl md:text-5xl text-pink-500 mt-2 mb-3">
                {weddingData.groom.fullName}
              </h3>
              <p className="font-elegant text-sm tracking-wide text-stone-500 mb-4">
                {weddingData.groom.parents}
              </p>
              <p className="font-elegant text-stone-600 max-w-sm leading-relaxed italic text-sm md:text-base">
                "{weddingData.groom.bio}"
              </p>
            </div>
          </div>

          {/* Mobile Ampersand */}
          <div className="flex justify-center md:hidden my-4">
            <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center border border-romantic-200">
              <span className="font-script text-3xl text-romantic-500">&</span>
            </div>
          </div>

          {/* Bride Card */}
          <div className="bride-card flex flex-col items-center group">
            {/* Photo Frame */}
            <div className="relative mb-8">
              {/* Outer decorative frame */}
              <div className="absolute -inset-4 border border-romantic-200/50 rounded-sm" />
              <div className="absolute -inset-2 border border-romantic-300/30 rounded-sm" />

              {/* Main photo container */}
              <div className="w-72 md:w-80 aspect-[3/4] relative overflow-hidden bg-stone-100">
                <img
                  src={weddingData.bride.image}
                  alt={weddingData.bride.fullName}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Decorative corner accents */}
              <div className="absolute -top-6 -right-6 w-12 h-12 border-r-2 border-t-2 border-romantic-400/50" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 border-l-2 border-b-2 border-romantic-400/50" />
            </div>

            {/* Info */}
            <div className="text-center px-4">
              <span className="text-[10px] tracking-[0.4em] uppercase text-stone-400 font-medium">The Bride</span>
              <h3 className="font-script text-4xl md:text-5xl text-pink-500 mt-2 mb-3">
                {weddingData.bride.fullName}
              </h3>
              <p className="font-elegant text-sm tracking-wide text-stone-500 mb-4">
                {weddingData.bride.parents}
              </p>
              <p className="font-elegant text-stone-600 max-w-sm leading-relaxed italic text-sm md:text-base">
                "{weddingData.bride.bio}"
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center mt-16 md:mt-24">
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
