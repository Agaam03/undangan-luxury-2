"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, Clock } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingData } from "@/wedding-data";

// Link Video High Res
const HERO_VIDEO_URL = weddingData.event.heroVideo;

// Trik Cloudinary: Ubah .mp4 jadi .jpg, hapus format video, paksa kualitas best
const HERO_POSTER_URL = HERO_VIDEO_URL.replace(".mp4", ".jpg")
  .replace("f_auto:video", "f_auto")
  .replace("q_auto:eco", "q_auto:best");

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // --- COUNTDOWN ---
  useEffect(() => {
    const targetDate = new Date(weddingData.event.countdownTarget);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- FORCE AUTOPLAY ---
  useEffect(() => {
    if (videoRef.current) {
      if (videoRef.current.readyState >= 3) {
        setIsVideoLoaded(true);
      }
      videoRef.current.play().catch((e) => console.log("Autoplay handled:", e));
    }
  }, []);

  // --- GSAP ANIMATION ---
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".hero-image-container", {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5,
      });

      gsap.to(".hero-image-wrapper", {
        scrollTrigger: {
          trigger: ".hero-image-container",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: 50,
        scale: 1.1,
        ease: "none",
      });

      gsap.from(".hero-info", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleVideoReady = () => setIsVideoLoaded(true);

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen flex flex-col pt-9 md:pt-12 pb-16 px-4 md:px-12 max-w-[1600px] mx-auto relative"
    >
      {/* Desktop Title */}
      <div className="hidden md:flex hero-title text-center mb-5 md:mb-12 mt-4 md:mt-0 items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="text-[10px] tracking-[0.5em] uppercase text-romantic-400 font-medium mb-2">
            The Wedding Of
          </span>
          <h1 className="font-script text-6xl md:text-7xl lg:text-8xl text-pink-500 leading-tight">
            {weddingData.groom.nickname}
            <span className="text-romantic-300 mx-3">&</span>
            {weddingData.bride.nickname}
          </h1>
        </div>
      </div>

      {/* Video/Image Container - Preserving aspect ratio */}
      <div className="hero-image-container w-full h-[67vh] md:h-auto md:aspect-[21/9] relative overflow-hidden shadow-sm mb-7 group">
        {/* Mobile Title - Inside container */}
        <div className="md:hidden bg-gradient-to-b from-romantic-50 to-white hero-title text-center py-4 flex flex-col items-center justify-center">
          <span className="text-[9px] tracking-[0.4em] uppercase text-romantic-400 font-medium mb-1">
            The Wedding Of
          </span>
          <h1 className="font-script text-4xl text-pink-500 leading-tight flex items-center gap-2">
            {weddingData.groom.nickname}
            <span className="text-romantic-300 text-3xl">&</span>
            {weddingData.bride.nickname}
          </h1>
        </div>

        <div className="hero-image-wrapper relative w-full h-full bg-stone-100">
          {/* Decorative frame overlay */}
          <div className="absolute inset-4 md:inset-6 border border-white/30 z-30 pointer-events-none hidden md:block" />

          {/* 1. LAYER GAMBAR (POSTER) */}
          <div
            className={`absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out ${isVideoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
          >
            <Image
              src={HERO_POSTER_URL}
              alt="Wedding Preview"
              fill
              unoptimized
              priority
              className="object-cover"
            />
          </div>

          {/* 2. LAYER VIDEO */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover absolute inset-0 z-0"
            autoPlay
            muted
            loop
            playsInline
            src={HERO_VIDEO_URL}
            onLoadedData={handleVideoReady}
            onCanPlay={handleVideoReady}
            onPlaying={handleVideoReady}
          >
            Your browser does not support the video tag.
          </video>

          {/* Overlay Cinematic */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none z-20" />
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="w-full">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Save The Date Label */}
          <div className="hero-info flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-romantic-300" />
            <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-romantic-400 font-medium">
              Save The Date
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-romantic-300" />
          </div>

          {/* Date Display */}
          <div className="hero-info flex items-center gap-4 md:gap-12 mb-6 w-full justify-center">
            <div className="h-px bg-gradient-to-l from-romantic-200 to-transparent w-12 md:w-24" />
            <div className="flex flex-col items-center">
              <h2 className="font-script text-4xl md:text-6xl text-pink-500 tracking-wide">
                {weddingData.event.displayDate}
              </h2>
              <div className="flex items-center gap-4 md:gap-6 mt-3 text-stone-500 text-xs font-elegant tracking-wider">
                <span className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-romantic-300" />
                  {weddingData.event.displayTime}
                </span>
                <span className="w-1 h-1 rounded-full bg-romantic-300" />
                <span className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-romantic-300" />
                  {weddingData.event.location}
                </span>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-romantic-200 to-transparent w-12 md:w-24" />
          </div>

          {/* Countdown */}
          <div className="hero-info grid grid-cols-4 gap-6 md:gap-16 text-center">
            {[
              { val: timeLeft.days, label: "Days" },
              { val: timeLeft.hours, label: "Hours" },
              { val: timeLeft.minutes, label: "Mins" },
              { val: timeLeft.seconds, label: "Secs" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center group cursor-default"
              >
                <div className="relative">
                  <span className="font-script text-3xl md:text-5xl text-pink-500 group-hover:text-romantic-400 transition-colors duration-300">
                    {String(item.val).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[9px] md:text-[10px] font-elegant uppercase tracking-[0.3em] text-stone-400 mt-2">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom decorative element */}
          <div className="flex items-center gap-3 mt-10">
            <div className="w-8 h-px bg-romantic-200" />
            <span className="text-romantic-300 text-sm">❧</span>
            <div className="w-8 h-px bg-romantic-200" />
          </div>
        </div>
      </div>
    </section>
  );
};
