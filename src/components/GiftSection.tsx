"use client";

import React, { useState, useEffect, useRef } from "react";
import { Gift, CreditCard, MapPin, Check, Copy } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingData } from "../wedding-data";
// Fix: Import useMediaQuery from react-responsive to handle mobile checks properly
import { useMediaQuery } from "react-responsive";

export const GiftSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"bank" | "address" | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  // Fix: Use react-responsive hook to detect desktop view
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    // Fix: Disable animations on mobile using react-responsive
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.from(".gift-card", {
        scrollTrigger: { trigger: ".gift-card", start: "top 80%" },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.to(".gift-icon", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isDesktop]); // Fix: Re-run effect when screen size changes

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section
      ref={containerRef}
      id="gift"
      className="py-20 md:py-48 px-6 md:px-12 bg-romantic-100 w-full scroll-mt-20"
    >
      <div className="max-w-[90rem] mx-auto">
        <div className="gift-card bg-romantic-50 border border-romantic-200 shadow-sm p-12 md:p-24 relative text-center">
          <div className="gift-icon absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-900 p-5 rounded-full shadow-lg">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-serif text-4xl md:text-6xl mb-8 text-pink-500 font-medium mt-8">
            Wedding Gift
          </h2>
          <p className="font-sans text-stone-600 text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-16">
            Your blessing is the greatest gift we could ask for. Namun, jika
            Anda ingin memberikan tanda kasih, kami menyediakan opsi berikut.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <button
              onClick={() => setActiveTab(activeTab === "bank" ? null : "bank")}
              className={`px-10 py-4 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest border transition-all duration-300 ${
                activeTab === "bank"
                  ? "bg-stone-800 text-white border-stone-800"
                  : "bg-transparent text-pink-500 border-stone-300 hover:border-stone-800 hover:text-stone-900"
              }`}
            >
              <CreditCard className="w-5 h-5" /> Digital Transfer
            </button>
            <button
              onClick={() =>
                setActiveTab(activeTab === "address" ? null : "address")
              }
              className={`px-10 py-4 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest border transition-all duration-300 ${
                activeTab === "address"
                  ? "bg-stone-800 text-white border-stone-800"
                  : "bg-transparent text-pink-500 border-stone-300 hover:border-stone-800 hover:text-stone-900"
              }`}
            >
              <MapPin className="w-5 h-5" /> Send Gift
            </button>
          </div>

          {activeTab === "bank" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
              {weddingData.gifts.accounts.map((acc, i) => (
                <div
                  key={i}
                  className="bg-white p-10 border border-romantic-200 shadow-sm text-left group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-mono text-2xl md:text-3xl text-stone-900 font-bold">
                      {acc.number}
                    </p>
                    <button
                      onClick={() => handleCopy(acc.number, `acc${i}`)}
                      className="text-stone-400 hover:text-stone-800"
                    >
                      {copiedIndex === `acc${i}` ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm uppercase tracking-widest text-stone-400 font-bold mb-1">
                    {acc.bank}
                  </p>
                  <p className="text-base font-serif italic text-stone-600">
                    a/n {acc.owner}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "address" && (
            <div className="bg-white p-12 border border-romantic-200 shadow-sm text-left animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
              <p className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">
                Delivery Address
              </p>
              <p className="font-serif text-2xl text-stone-900 mb-6">
                {weddingData.gifts.address}
              </p>
              <button
                onClick={() => handleCopy(weddingData.gifts.address, "addr")}
                className="flex items-center gap-2 px-6 py-3 bg-romantic-100 text-stone-600 font-bold uppercase text-xs tracking-widest"
              >
                {copiedIndex === "addr" ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}
                Copy Address
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
