"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, Clock } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingData } from "@/wedding-data";
import FontQuintessential from "@/FontQuintessential";

// Link Video High Res
const HERO_VIDEO_URL = weddingData.event.heroVideo;

// Trik Cloudinary: Ubah .mp4 jadi .jpg, hapus format video, paksa kualitas best
const HERO_POSTER_URL = HERO_VIDEO_URL.replace(".mp4", ".jpg")
  .replace("f_auto:video", "f_auto")
  .replace("q_auto:eco", "q_auto:best");

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  // 1. TAMBAHAN LOGIC: Ref untuk akses langsung ke elemen video
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // --- LOGIC 1: COUNTDOWN (TETAP) ---
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

  // --- LOGIC 2: FORCE AUTOPLAY (PERBAIKAN UTAMA) ---
  useEffect(() => {
    if (videoRef.current) {
      // Jika video sudah ter-cache dan siap main
      if (videoRef.current.readyState >= 3) {
        setIsVideoLoaded(true);
      }
      // Paksa browser memutar video
      videoRef.current.play().catch((e) => console.log("Autoplay handled:", e));
    }
  }, []);

  // --- LOGIC 3: GSAP ANIMATION (TETAP) ---
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

  // Helper agar state berubah saat event apapun dari video terpanggil
  const handleVideoReady = () => setIsVideoLoaded(true);

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen flex flex-col pt-9 md:pt-12 pb-16 px-4 md:px-12 max-w-[1600px] mx-auto relative"
    >
      <div className="hidden md:flex hero-title text-center mb-5 md:mb-12 mt-4 md:mt-0   items-center justify-center">
        <h1 className="font-serif text-[40px] md:text-7xl lg:text-8xl   text-pink-500 leading-tight">
          {weddingData.groom.nickname}{" "}
          <span className="font-light text-romantic-300">&</span>{" "}
          {weddingData.bride.nickname}
        </h1>
      </div>
      <div className="hero-image-container w-full h-[60vh] md:h-auto md:aspect-[21/9] relative overflow-hidden shadow-sm mb-7 group bg-pink-300/40">
        <div className="md:hidden hero-title text-center mb-5 md:mb-12 mt-4 md:mt-0 flex items-center justify-center">
          <h1 className="font-serif text-[38px] md:text-7xl lg:text-8xl   text-pink-500 leading-tight text-center items-center flex justify-center gap-2  ">
            {weddingData.groom.nickname}
            <span className="font-light text-romantic-300">&</span>
            {"  "}
            {weddingData.bride.nickname}
          </h1>
        </div>

        <div className="hero-image-wrapper relative w-full h-full bg-stone-300">
          {/* 1. LAYER GAMBAR (POSTER) */}
          <div
            className={`absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out ${
              // Tambahkan pointer-events-none agar tidak menghalangi video saat hilang
              isVideoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
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
            ref={videoRef} // Hubungkan Ref
            className="w-full h-full object-cover absolute inset-0 z-0"
            autoPlay
            muted
            loop
            playsInline
            src={HERO_VIDEO_URL}
            // Pasang Listener yang lebih lengkap
            onLoadedData={handleVideoReady}
            onCanPlay={handleVideoReady}
            onPlaying={handleVideoReady}
          >
            Your browser does not support the video tag.
          </video>

          {/* Overlay Cinematic */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none z-20" />
        </div>
      </div>

      <div className="w-full">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="hero-info font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-stone-500 mb-2 font-bold">
            Save The Date
          </p>
          <div className="hero-info flex items-center gap-4 md:gap-12 mb-6 w-full justify-center">
            <div className="h-px bg-gradient-to-l from-stone-300 to-transparent w-16 md:w-32"></div>
            <div className="flex flex-col items-center">
              <h2 className="font-serif text-3xl md:text-5xl text-pink-500 italic tracking-wide">
                {weddingData.event.displayDate}
              </h2>
              <div className="flex items-center gap-6 mt-3 text-stone-500 text-sm font-sans tracking-widest uppercase">
                <span className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-romantic-300" />{" "}
                  {weddingData.event.displayTime}
                </span>
                <span className="w-1 h-1 rounded-full bg-romantic-300"></span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-romantic-300" />{" "}
                  {weddingData.event.location}
                </span>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-stone-300 to-transparent w-16 md:w-32"></div>
          </div>

          <div className="hero-info grid grid-cols-4 gap-4 md:gap-16 text-center">
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
                <span className="font-serif text-2xl md:text-5xl text-pink-500 group-hover:text-romantic-300 transition-colors duration-300">
                  {String(item.val).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-stone-400 mt-2">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
