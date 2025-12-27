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
      // Header animation
      gsap.from(".schedule-header", {
        scrollTrigger: { trigger: ".schedule-header", start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Event cards stagger animation
      weddingData.schedule.forEach((_, i) => {
        gsap.from(`.event-card-${i}`, {
          scrollTrigger: { trigger: `.event-card-${i}`, start: "top 80%" },
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.2,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section
      ref={containerRef}
      id="schedule"
      className="relative w-full py-24 md:py-40 bg-gradient-to-b from-white via-romantic-50/50 to-white overflow-hidden scroll-mt-20"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-romantic-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-romantic-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="schedule-header text-center mb-20 md:mb-28">
          <span className="inline-block text-[10px] md:text-xs tracking-[0.5em] uppercase text-romantic-400 font-medium mb-4">
            ✦ Save The Date ✦
          </span>
          <h2 className="font-script text-5xl md:text-7xl text-pink-500 mb-4">
            Wedding Schedule
          </h2>
          <p className="font-elegant text-lg text-stone-500 max-w-md mx-auto">
            We cordially invite you to celebrate with us on our special day
          </p>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-romantic-300 to-transparent mx-auto mt-8" />
        </div>

        {/* Event Cards */}
        <div className="space-y-12 md:space-y-16">
          {weddingData.schedule.map((event, i) => (
            <div
              key={i}
              className={`event-card-${i} group`}
            >
              <div className="flex flex-col items-center gap-8 md:gap-12">
                {/* Image */}
                <div className="relative">
                  {/* Decorative frame */}
                  <div className="absolute -inset-3 border border-romantic-200/60 rounded-sm" />
                  <div className="absolute -inset-6 border border-romantic-100/40 rounded-sm hidden md:block" />

                  {/* Corner decorations */}
                  <div className="absolute -top-8 -left-8 hidden md:block">
                    <svg width="40" height="40" viewBox="0 0 40 40" className="text-romantic-300/60">
                      <path d="M0 40 L0 0 L40 0" fill="none" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-8 -right-8 hidden md:block">
                    <svg width="40" height="40" viewBox="0 0 40 40" className="text-romantic-300/60">
                      <path d="M40 0 L40 40 L0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>

                  {/* Image container */}
                  <div className="w-72 md:w-80 aspect-[4/5] overflow-hidden bg-stone-100 relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Content - Centered */}
                <div className="text-center max-w-md">
                  {/* Date pill */}
                  <div className="inline-block bg-romantic-100/60 border border-romantic-200/50 px-5 py-2 mb-4 rounded-full">
                    <span className="text-xs tracking-[0.3em] uppercase text-romantic-600 font-medium">
                      {event.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-script text-4xl md:text-5xl text-pink-500 mb-4">
                    {event.title}
                  </h3>

                  {/* Divider */}
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-romantic-300 to-transparent mx-auto mb-6" />

                  {/* Details */}
                  <div className="space-y-2">
                    <p className="font-elegant text-xl text-stone-700">
                      {event.time}
                    </p>
                    <p className="font-elegant text-lg text-stone-600">
                      {event.venue}
                    </p>
                    <p className="text-sm text-stone-400 pt-2">
                      <span className="tracking-wider uppercase">Dress Code:</span>{" "}
                      <span className="font-elegant italic">{event.dressCode}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Separator between events */}
              {i < weddingData.schedule.length - 1 && (
                <div className="flex justify-center mt-16 md:mt-20">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-romantic-200" />
                    <span className="text-romantic-300 text-2xl">❦</span>
                    <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-romantic-200" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center mt-20 md:mt-28">
          <div className="text-center">
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-romantic-300 to-transparent mx-auto mb-4" />
            <span className="font-elegant text-stone-400 text-sm tracking-wider">We look forward to seeing you</span>
          </div>
        </div>
      </div>
    </section>
  );
};
