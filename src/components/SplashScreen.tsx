"use client";

import React, { useEffect, useState } from "react";
import { MailOpen } from "lucide-react";
import { weddingData } from "../wedding-data";

interface SplashScreenProps {
  onOpen: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onOpen }) => {
  const [guestName, setGuestName] = useState<string>("Bapak/Ibu/Saudara/i");
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Mengunci scroll saat splash screen aktif
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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between bg-pink-200/45 text-white transition-all duration-1000 ease-in-out px-6 py-10 md:py-12 h-[100dvh] ${
        isExiting
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      {/* --- BACKGROUND ACCENTS (Subtle) --- */}
      {/* Pattern noise/grain jika ada, atau gradient halus */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-300   opacity-60"></div>

      {/* --- TOP SECTION: Header --- */}
      <div className="relative z-10 flex flex-col items-center gap-2 animate-fade-in-down">
        <span className="text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] text-stone-400">
          The Wedding Of
        </span>
      </div>

      {/* --- MIDDLE SECTION: Center Image (Arch/Window Shape) --- */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full py-6">
        {/* Frame Border Effect */}
        <div className="relative p-1.5 border border-white/20  ">
          {/* Inner Image Container */}
          <div className="relative w-[240px] md:w-[280px] h-[320px] md:h-[380px] overflow-hidden shadow-2xl bg-pink-300">
            {/* Gambar Utama */}
            <img
              src={weddingData?.event?.splashImage || "/placeholder-image.jpg"}
              alt="Couple"
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Overlay Gradient pada gambar agar teks di bawahnya (jika ada) kontras, 
                    tapi di sini kita biarkan bersih */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Dekorasi Bunga/Garis (Opsional - Simple Lines) */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-white/30"></div>
        </div>
      </div>

      {/* --- BOTTOM SECTION: Info & Action --- */}
      <div className="relative z-10 flex flex-col items-center w-full space-y-6">
        {/* Nama Pasangan */}
        <div className="text-center space-y-1">
          <h1 className="font-serif text-4xl md:text-5xl text-white tracking-wide">
            {weddingData?.groom?.nickname || "Groom"}
            <span className="text-rose-300 mx-2 font-light">&</span>
            {weddingData?.bride?.nickname || "Bride"}
          </h1>
          <p className="text-xs md:text-sm text-stone-400 tracking-widest font-sans mt-2">
            {weddingData?.event?.date || "SAVE THE DATE"}
          </p>
        </div>

        {/* Kotak Tamu & Tombol */}
        <div className="flex flex-col items-center gap-5 w-full max-w-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 md:p-6 shadow-xl">
          <div className="text-center w-full">
            <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">
              Kepada Yth.
            </p>
            <div className="font-serif text-lg md:text-xl text-white/90 truncate px-2 pb-2 border-b border-white/10">
              {guestName}
            </div>
          </div>

          <button
            onClick={handleOpen}
            className="group relative w-full flex items-center justify-center gap-3 bg-white text-stone-900 py-3.5 px-6 rounded-xl overflow-hidden transition-all duration-300 hover:bg-rose-100 active:scale-95 shadow-lg shadow-white/5"
          >
            <MailOpen className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12 text-stone-800" />
            <span className="font-sans text-xs font-bold uppercase tracking-[0.2em]">
              Buka Undangan
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
