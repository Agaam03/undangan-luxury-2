"use client";

import React, { useState, useRef } from "react";
import { SplashScreen } from "../components/SplashScreen";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { QuoteSection } from "../components/QuoteSection";
import { CoupleSection } from "../components/CoupleSection";
import { ScheduleSection } from "../components/ScheduleSection";
import { LoveStorySection } from "../components/LoveStorySection";
import { GiftSection } from "../components/GiftSection";
import { RsvpSection } from "../components/RsvpSection";
import { FooterSection } from "../components/FooterSection";
import { GallerySection } from "@/components/GallerySection";
import { MusicPlayer } from "@/components/MusicPlayer";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register di luar komponen (Safe practice di Next.js App Router)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Ref container untuk scope animasi
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ScrollTrigger animations
    },
    { scope: container }
  );

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setTimeout(() => {
      setShowSplash(false);
    }, 1200);
  };

  return (
    <main ref={container} className="relative min-h-screen">
      {showSplash && <SplashScreen onOpen={handleOpenInvitation} />}

      <div
        className={`transition-all duration-1000 ${isOpen
          ? "opacity-100"
          : "opacity-0 h-screen overflow-hidden pointer-events-none"
          }`}
      >
        <Navbar />
        <HeroSection />
        <QuoteSection />
        <CoupleSection />
        <ScheduleSection />
        <LoveStorySection />
        <GallerySection />
        <GiftSection />
        <RsvpSection />
        <FooterSection />

        {/* Music Player - appears when invitation is opened */}
        <MusicPlayer />
      </div>
    </main>
  );
}
