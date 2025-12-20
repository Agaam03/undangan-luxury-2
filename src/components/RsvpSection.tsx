"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, MessageSquare, User, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

// Interface untuk data pesan
interface Wish {
  id: string | number;
  name: string;
  message: string;
  date: string;
  attendance: "attending" | "not_attending";
}

export const RsvpSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  // State digabungkan: Struktur data lengkap dari kode 1, tapi default value disesuaikan
  const [formData, setFormData] = useState({
    name: "",
    attendance: "attending",
    guests: 1,
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const [messages, setMessages] = useState<Wish[]>([
    {
      id: 1,
      name: "Sarah Jenkins",
      attendance: "attending",
      date: "2 hours ago",
      message: "Congratulations! See you in Kyoto! It's going to be magical.",
    },
    {
      id: 2,
      name: "Uncle Bob",
      attendance: "not_attending",
      date: "5 hours ago",
      message: "Wishing you a lifetime of love. Sorry I can't make the trip.",
    },
  ]);

  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (!isDesktop) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Animasi Form (Kiri)
      gsap.from(".rsvp-left", {
        scrollTrigger: { trigger: ".rsvp-left", start: "top 80%" },
        x: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animasi Message Wall (Kanan)
      gsap.from(".rsvp-right", {
        scrollTrigger: { trigger: ".rsvp-right", start: "top 80%" },
        x: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isDesktop]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newWish: Wish = {
      id: Date.now(),
      name: formData.name,
      message: formData.message,
      date: "Just now",
      attendance: formData.attendance as "attending" | "not_attending",
    };

    // Simulasi loading sebentar
    setTimeout(() => {
      setMessages([newWish, ...messages]);
      setSubmitted(true);
      setFormData({
        name: "",
        attendance: "attending",
        guests: 1,
        message: "",
      }); // Reset form
    }, 800);
  };

  const resetForm = () => setSubmitted(false);

  return (
    // Style Container: Menggunakan style kode ke-2 (py-40, bg-white, border-romantic)
    <section
      ref={containerRef}
      id="ucapan-rsvp"
      className="py-22 md:py-48 px-6 md:px-12 bg-white border-t border-romantic-200/50 w-full scroll-mt-20"
    >
      <div className="max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
          {/* Left Column: RSVP Form (Layout Code 1, Style Code 2) */}
          <div className="rsvp-left flex flex-col justify-center order-2 lg:order-1">
            <div className="mb-10 text-left">
              <span className="text-xs font-sans tracking-[0.4em] uppercase text-stone-500 font-bold block mb-4">
                Celebration
              </span>
              {/* Menggunakan font italic dari kode 2 */}
              <h2 className="text-5xl md:text-6xl font-serif mb-6 text-pink-500 leading-none  ">
                RSVP
              </h2>
              <p className="text-stone-600 font-serif text-lg leading-relaxed max-w-md">
                We would be honored by your presence. Please confirm your
                attendance before the big day.
              </p>
            </div>

            {submitted ? (
              <div className="p-12 bg-romantic-50 text-center animate-in zoom-in duration-500 border border-romantic-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-stone-900 mb-6 shadow-sm border border-romantic-100">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-stone-900 mb-2 italic">
                  Thank You!
                </h3>
                <p className="text-stone-500 font-serif mb-8">
                  Pesan dan konfirmasi Anda telah kami terima.
                </p>
                <button
                  onClick={resetForm}
                  className="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 underline transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Name Input */}
                <div className="relative group">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="block w-full border-0 border-b border-stone-300 bg-transparent py-3 text-stone-900 focus:border-stone-900 focus:ring-0 text-xl font-serif placeholder:text-stone-400 transition-all outline-none"
                    placeholder="Your Name"
                  />
                </div>

                {/* Attendance & Guests Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <label className="text-xs font-sans text-stone-500 uppercase tracking-widest font-bold block mb-2">
                      Attendance
                    </label>
                    <select
                      value={formData.attendance}
                      onChange={(e) =>
                        setFormData({ ...formData, attendance: e.target.value })
                      }
                      className="w-full border-0 border-b border-stone-300 bg-transparent py-2 pr-8 text-stone-900 focus:border-stone-900 focus:ring-0 font-serif text-lg cursor-pointer outline-none"
                    >
                      <option value="attending">Will Attend</option>
                      <option value="not_attending">Cannot Attend</option>
                    </select>
                  </div>

                  <div
                    className={`relative transition-opacity duration-300 ${
                      formData.attendance === "not_attending"
                        ? "opacity-30 pointer-events-none"
                        : "opacity-100"
                    }`}
                  >
                    <label className="text-xs font-sans text-stone-500 uppercase tracking-widest font-bold block mb-2">
                      Guests
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guests: Number(e.target.value),
                        })
                      }
                      disabled={formData.attendance === "not_attending"}
                      className="w-full border-0 border-b border-stone-300 bg-transparent py-2 pr-8 text-stone-900 focus:border-stone-900 focus:ring-0 font-serif text-lg cursor-pointer outline-none"
                    >
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num} Person(s)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message Input */}
                <div className="relative">
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="block w-full border-0 border-b border-stone-300 bg-transparent py-3 text-stone-900 focus:border-stone-900 focus:ring-0 text-xl font-serif placeholder:text-stone-400 resize-none outline-none"
                    placeholder="Write a warm wish..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-stone-900 text-white py-4 px-8 flex items-center justify-center gap-3 hover:bg-stone-800 transition-all duration-300 group shadow-sm"
                >
                  <span className="font-sans text-xs font-bold uppercase tracking-[0.2em]">
                    Confirm & Send
                  </span>
                  <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Message Wall (Layout Code 1, Style Code 2: bg-romantic-50) */}
          <div className="rsvp-right order-1 lg:order-2 bg-romantic-50 p-6 md:p-12 border border-romantic-200 h-[700px] flex flex-col relative shadow-sm">
            <div className="mb-8 flex items-end justify-between border-b border-romantic-200 pb-6">
              <div>
                <h3 className="font-serif text-3xl md:text-4xl text-pink-500">
                  Wedding Wishes
                </h3>
                <p className="text-xs font-sans tracking-widest uppercase text-stone-500 mt-2 font-bold">
                  {messages.length} Messages
                </p>
              </div>
              <MessageSquare className="w-6 h-6 text-stone-400" />
            </div>

            {/* Scrollable Area */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-hide">
              {messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  // Card Style: bg-white (Code 2 style) inside the romantic container
                  className="bg-white p-4 shadow-sm border border-romantic-100 hover:border-romantic-300 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 fill-mode-backwards"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 border border-stone-100">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-md   text-pink-500 leading-none mb-1">
                          {msg.name}
                        </h4>
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-sm ${
                            msg.attendance === "attending"
                              ? "bg-stone-100 text-stone-800"
                              : "bg-stone-100 text-stone-400"
                          }`}
                        >
                          {msg.attendance === "attending"
                            ? "Will Attend"
                            : "Cannot Attend"}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-stone-400 font-sans font-bold">
                      {msg.date}
                    </span>
                  </div>
                  <p className="font-serif text-stone-800 text-sm leading-relaxed border-l-2 border-romantic-200 pl-4  ">
                    "{msg.message}"
                  </p>
                </div>
              ))}
            </div>

            {/* Gradient Fade Style Code 2 (romantic) */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-romantic-50 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RsvpSection;
