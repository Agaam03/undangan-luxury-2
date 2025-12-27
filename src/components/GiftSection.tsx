"use client";

import React, { useState, useEffect, useRef } from "react";
import { Gift, CreditCard, MapPin, Check, Copy, Heart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingData } from "../wedding-data";
import { useMediaQuery } from "react-responsive";

export const GiftSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"bank" | "address" | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.from(".gift-header", {
        scrollTrigger: { trigger: ".gift-header", start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(".gift-card", {
        scrollTrigger: { trigger: ".gift-card", start: "top 80%" },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isDesktop]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section
      ref={containerRef}
      id="gift"
      className="py-24 md:py-40 px-6 md:px-12 bg-gradient-to-b from-romantic-50 via-white to-romantic-50 w-full scroll-mt-20 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-romantic-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-romantic-200/15 rounded-full blur-3xl" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Decorative corners */}
      <div className="absolute top-12 left-12 w-20 h-20 border-l border-t border-romantic-200/50 hidden md:block" />
      <div className="absolute top-12 right-12 w-20 h-20 border-r border-t border-romantic-200/50 hidden md:block" />
      <div className="absolute bottom-12 left-12 w-20 h-20 border-l border-b border-romantic-200/50 hidden md:block" />
      <div className="absolute bottom-12 right-12 w-20 h-20 border-r border-b border-romantic-200/50 hidden md:block" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="gift-header text-center mb-16 md:mb-20">
          {/* Decorative icon and label in one row */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Gift className="w-5 h-5 text-romantic-400" />
            <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-romantic-400 font-medium">
              Wedding Gift
            </span>
            <Gift className="w-5 h-5 text-romantic-400" />
          </div>
          <h2 className="font-script text-5xl md:text-7xl text-pink-500 mb-4">
            Blessing & Gifts
          </h2>
          <p className="font-elegant text-lg text-stone-500 max-w-xl mx-auto leading-relaxed">
            Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we have provided the following options.
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-romantic-300 to-transparent mx-auto mt-8" />
        </div>

        {/* Gift Options Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab(activeTab === "bank" ? null : "bank")}
            className={`group px-8 py-3 flex items-center justify-center gap-3 text-sm font-medium uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === "bank"
              ? "bg-romantic-400 text-white"
              : "bg-transparent text-romantic-400 border border-stone-300 hover:border-stone-400 hover:text-stone-800"
              }`}
          >
            <CreditCard className="w-4 h-4" />
            Digital Transfer
          </button>
          <button
            onClick={() => setActiveTab(activeTab === "address" ? null : "address")}
            className={`group px-8 py-3 flex items-center justify-center gap-3 text-sm font-medium uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === "address"
              ? "bg-romantic-400 text-white"
              : "bg-transparent text-romantic-400 border border-stone-300 hover:border-stone-400 hover:text-stone-800"
              }`}
          >
            <MapPin className="w-4 h-4" />
            Send Gift
          </button>
        </div>

        {/* Bank Transfer Cards */}
        {activeTab === "bank" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {weddingData.gifts.accounts.map((acc, i) => (
              <div
                key={i}
                className="gift-card bg-white p-6 md:p-8 border border-stone-200 hover:border-stone-300 transition-all duration-300"
              >
                {/* Bank Name */}
                <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium mb-3">
                  {acc.bank}
                </p>

                {/* Account Number */}
                <div className="flex justify-between items-center mb-4">
                  <p className="font-mono text-xl md:text-2xl text-stone-800 font-medium tracking-wide">
                    {acc.number}
                  </p>
                  <button
                    onClick={() => handleCopy(acc.number, `acc${i}`)}
                    className={`p-2 transition-all duration-300 ${copiedIndex === `acc${i}`
                      ? "text-emerald-600"
                      : "text-stone-400 hover:text-stone-600"
                      }`}
                  >
                    {copiedIndex === `acc${i}` ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Account Owner */}
                <p className="font-elegant text-base text-stone-500">
                  a/n {acc.owner}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Address Card */}
        {activeTab === "address" && (
          <div className="gift-card bg-white p-8 md:p-10 border border-stone-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium mb-3">
                  Delivery Address
                </p>
                <p className="font-elegant text-lg md:text-xl text-stone-700 leading-relaxed">
                  {weddingData.gifts.address}
                </p>
              </div>

              <button
                onClick={() => handleCopy(weddingData.gifts.address, "addr")}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 ${copiedIndex === "addr"
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  : "bg-stone-900 text-white hover:bg-stone-800"
                  }`}
              >
                {copiedIndex === "addr" ? (
                  <>
                    <Check size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Bottom Note */}
        <div className="text-center mt-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-romantic-300" />
            <Heart className="w-5 h-5 text-romantic-300" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-romantic-300" />
          </div>
          <p className="font-elegant text-stone-400 text-sm italic">
            Thank you for your love and generosity
          </p>
        </div>
      </div>
    </section>
  );
};
