"use client";

import React, { useState, useRef } from "react"; // Tambah useRef
import { SplashScreen } from "../components/SplashScreen";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { QuoteSection } from "../components/QuoteSection";
import { CoupleSection } from "../components/CoupleSection";
import { ScheduleSection } from "../components/ScheduleSection";
import { LoveStorySection } from "../components/LoveStorySection";
import { GallerySection } from "../components/GallerySection";
import { GiftSection } from "../components/GiftSection";
import { RsvpSection } from "../components/RsvpSection";
import { FooterSection } from "../components/FooterSection";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react"; // Import hook resmi GSAP

// Register di luar komponen (Safe practice di Next.js App Router)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Ref container untuk scope animasi (agar tidak bocor ke page lain)
  const container = useRef<HTMLDivElement>(null);

  // Ganti useEffect manual dengan useGSAP
  useGSAP(
    () => {
      // Kodingan animasi ScrollTrigger kamu nanti ditaruh di sini
      // Contoh dummy agar scroll trigger aktif:
      // ScrollTrigger.refresh();
    },
    { scope: container }
  );

  const handleOpenInvitation = () => {
    setIsOpen(true);
    // Menggunakan setTimeout biasa (lebih aman dari gsap.delayedCall untuk logic React state)
    setTimeout(() => {
      setShowSplash(false);
    }, 1200);
  };

  return (
    <main ref={container} className="relative bg-romantic-50 min-h-screen">
      {showSplash && <SplashScreen onOpen={handleOpenInvitation} />}

      <div
        className={`transition-all duration-1000 ${
          isOpen
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
      </div>
    </main>
  );
}
