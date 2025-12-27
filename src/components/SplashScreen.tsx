"use client";

import React, { useEffect, useState } from "react";
import { MailOpen, Heart } from "lucide-react";
import { weddingData } from "../wedding-data";

interface SplashScreenProps {
  onOpen: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onOpen }) => {
  const [guestName, setGuestName] = useState<string>("Bapak/Ibu/Saudara/i");
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const to = params.get("to");
      if (to) setGuestName(to);

      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, []);

  const handleOpen = () => {
    setIsExiting(true);
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-rose-50 via-white to-romantic-50 text-stone-800 transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] px-6 py-8 h-[100dvh] overflow-hidden ${isExiting
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
        }`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-200/30 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-200/20 blur-[100px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-romantic-100/20 blur-[120px] rounded-full" />
      </div>

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-romantic-300/40 hidden md:block" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-romantic-300/40 hidden md:block" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-romantic-300/40 hidden md:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-romantic-300/40 hidden md:block" />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-lg mx-auto">

        {/* Top decorative element */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in-down">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-romantic-300" />
          <Heart className="w-4 h-4 text-romantic-400" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-romantic-300" />
        </div>

        {/* Header text */}
        <div className="text-center mb-6 animate-fade-in-down">
          <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-romantic-400 font-medium">
            The Wedding Celebration Of
          </span>
        </div>

        {/* Image Frame */}
        <div className="relative mb-8 animate-fade-in">
          {/* Outer decorative frame */}
          <div className="absolute -inset-3 border border-romantic-200/50 rounded-sm" />
          <div className="absolute -inset-6 border border-romantic-100/30 rounded-sm hidden md:block" />

          {/* Corner accents */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-romantic-400/40" />
          <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-romantic-400/40" />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-romantic-400/40" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-romantic-400/40" />

          {/* Image container */}
          <div className="relative w-[220px] md:w-[260px] h-[300px] md:h-[380px] overflow-hidden bg-stone-100">
            <img
              src={weddingData?.event?.splashImage || "/placeholder-image.jpg"}
              alt="Couple"
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 animate-in zoom-in-105 duration-[2000ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>

        {/* Couple Names */}
        <div className="text-center mb-6 animate-fade-in-up">
          <h1 className="font-script text-5xl md:text-6xl text-pink-500 leading-tight">
            {weddingData?.groom?.nickname}
            <span className="text-romantic-300 mx-2 text-4xl md:text-5xl">&</span>
            {weddingData?.bride?.nickname}
          </h1>
        </div>

        {/* Date */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-romantic-300" />
          <p className="text-[10px] md:text-xs text-stone-500 tracking-[0.4em] uppercase font-medium">
            {weddingData?.event?.displayDate || "Save The Date"}
          </p>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-romantic-300" />
        </div>

        {/* Guest Name Card */}
        <div className="text-center mb-8 animate-fade-in-up">
          <p className="text-[9px] tracking-[0.3em] uppercase text-stone-400 mb-3">
            Dear Special Guest
          </p>
          <div className="relative inline-block">
            <div className="absolute -inset-x-4 -inset-y-2 border border-romantic-200/50 rounded-sm" />
            <p className="font-script text-2xl md:text-3xl text-pink-500 px-6 py-1">
              {guestName}
            </p>
          </div>
        </div>

        {/* Open Button */}
        <button
          onClick={handleOpen}
          className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 px-10 rounded-full overflow-hidden transition-all duration-300 shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/30 hover:-translate-y-0.5 active:scale-95 animate-fade-in-up"
        >
          <span className="relative z-10 flex items-center gap-3 font-medium text-sm uppercase tracking-[0.2em]">
            <MailOpen className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            Open Invitation
          </span>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>

        {/* Bottom decoration */}
        <div className="flex items-center gap-3 mt-8 animate-fade-in-up">
          <div className="w-8 h-px bg-romantic-200" />
          <span className="text-romantic-300 text-xs">❧</span>
          <div className="w-8 h-px bg-romantic-200" />
        </div>
      </div>
    </div>
  );
};
