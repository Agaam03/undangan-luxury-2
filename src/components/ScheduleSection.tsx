"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingData } from "../wedding-data";
import { useMediaQuery } from "react-responsive";

export const ScheduleSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.to(".schedule-bg-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: 200,
      });

      weddingData.schedule.forEach((_, i) => {
        gsap.from(`.event-${i}-img`, {
          scrollTrigger: { trigger: `.event-${i}-container`, start: "top 80%" },
          opacity: 0,
          x: i % 2 === 0 ? -50 : 50,
          duration: 1,
          ease: "power3.out",
        });
        gsap.from(`.event-${i}-text`, {
          scrollTrigger: { trigger: `.event-${i}-container`, start: "top 80%" },
          opacity: 0,
          x: i % 2 === 0 ? 50 : -50,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section
      ref={containerRef}
      id="roundown-acara"
      className="relative w-full py-20 md:py-60 bg-romantic-50 text-stone-800 overflow-hidden scroll-mt-20"
    >
      <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block">
        <h1
          className="schedule-bg-text text-[14rem] font-serif leading-none text-romantic-300"
          style={{ writingMode: "vertical-rl" }}
        >
          Schedule
        </h1>
      </div>

      <div className="max-w-[110rem] mx-auto px-6 relative z-10">
        {weddingData.schedule.map((event, i) => (
          <div
            key={i}
            className={`event-${i}-container flex flex-col ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-16 md:gap-32 ${
              i < weddingData.schedule.length - 1 ? "mb-32 md:mb-40" : ""
            }`}
          >
            <div
              className={`w-full md:w-1/2 flex justify-center event-${i}-img`}
            >
              <div
                className={`w-full max-w-lg aspect-[3/4] overflow-hidden relative border-romantic-200 p-3 ${
                  i % 2 === 0
                    ? "border-r-4 border-b-4"
                    : "border-l-4 border-b-4"
                }`}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </div>
            <div
              className={`event-${i}-text w-full md:w-1/2 text-center ${
                i % 2 === 0
                  ? "md:text-left pl-0 md:pl-12"
                  : "md:text-right pr-0 md:pr-12"
              }`}
            >
              <div className="inline-block border border-romantic-300 px-6 py-2 mb-8 rounded-full text-sm tracking-widest uppercase text-stone-600">
                {event.date}
              </div>
              <h2 className="font-serif text-5xl md:text-7xl mb-6 italic text-pink-500">
                {event.title}
              </h2>
              <div
                className={`w-16 h-px bg-romantic-300 mb-8 mx-auto ${
                  i % 2 === 0 ? "md:mx-0" : "md:ml-auto md:mr-0"
                }`}
              ></div>
              <div className="space-y-4 text-stone-500 font-sans">
                <p className="text-2xl text-stone-800 font-serif italic">
                  {event.time}
                </p>
                <p className="text-lg">{event.venue}</p>
                <p className="text-base italic opacity-70">{event.dressCode}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
