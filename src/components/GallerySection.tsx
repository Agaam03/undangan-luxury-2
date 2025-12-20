"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingData } from "../wedding-data";
import { useMediaQuery } from "react-responsive";

export const GallerySection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.from(".gallery-header", {
        scrollTrigger: { trigger: ".gallery-header", start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      ScrollTrigger.batch(".gallery-item", {
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0,
            y: 50,
            scale: 0.95,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
          }),
        start: "top 85%",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="py-12 md:py-40 bg-romantic-50 w-full scroll-mt-20"
    >
      <div className="max-w-[110rem] mx-auto px-6 md:px-12">
        <div className="gallery-header text-center mb-12">
          <h2 className="font-serif text-4xl md:text-6xl italic text-pink-500 font-medium">
            Captured Moments
          </h2>
        </div>

        <div className="gallery-grid grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 auto-rows-[145px] md:auto-rows-[300px] grid-flow-dense pb-10">
          {weddingData.gallery.map((photo, i) => (
            <div
              key={i}
              className={`gallery-item ${photo.spanClass} overflow-hidden relative shadow-sm group`}
            >
              <img
                src={photo.src}
                alt={`Gallery photo ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
