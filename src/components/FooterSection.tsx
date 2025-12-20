"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingData } from "../wedding-data";
// Fix: Import useMediaQuery from react-responsive to handle mobile checks properly
import { useMediaQuery } from "react-responsive";

export const FooterSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  // Fix: Use react-responsive hook to detect desktop view
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    // Fix: Disable animations on mobile using react-responsive
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: "top 95%" },
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: "power2.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isDesktop]); // Fix: Re-run effect when screen size changes

  return (
    <footer
      ref={containerRef}
      className="bg-[#1c1917] text-stone-400 py-32 md:py-40 px-6 text-center w-full"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <h2 className="font-serif text-4xl md:text-5xl italic text-pink-500">
          Thank You
        </h2>
        <p className="font-sans text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          {weddingData.footer.thankYouMessage}
        </p>
        <div className="space-y-2">
          <p className="font-serif italic text-stone-500 text-xl">
            {weddingData.footer.closingGreeting}
          </p>
          <div className="h-px w-24 bg-stone-800 mx-auto my-8"></div>
          <p className="font-serif text-2xl text-pink-500  ">
            {weddingData.groom.fullName} & {weddingData.bride.fullName}
          </p>
        </div>
      </div>
    </footer>
  );
};
