"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, MessageSquare, User, CheckCircle, ChevronDown } from "lucide-react";
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

interface Option {
  value: string | number;
  label: string;
}

const CustomSelect = ({
  value,
  onChange,
  options,
  disabled = false
}: {
  value: string | number;
  onChange: (val: any) => void;
  options: Option[];
  disabled?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find(opt => opt.value === value)?.label;

  return (
    <div className={`relative ${disabled ? "opacity-50 pointer-events-none" : ""}`} ref={selectRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className="w-full border border-romantic-200 bg-white/50 rounded-sm py-3 px-4 text-stone-900 cursor-pointer flex justify-between items-center group hover:border-romantic-400 transition-colors"
      >
        <span className="font-elegant text-base">{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-white shadow-xl border border-romantic-100 rounded-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`px-5 py-3 cursor-pointer font-elegant text-sm transition-colors border-b border-romantic-50 last:border-0 ${value === opt.value
                ? "bg-romantic-50 text-pink-600"
                : "text-stone-600 hover:bg-romantic-50/50 hover:text-stone-900"
                }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const RsvpSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

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
      gsap.from(".rsvp-header", {
        scrollTrigger: { trigger: ".rsvp-header", start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(".rsvp-left", {
        scrollTrigger: { trigger: ".rsvp-left", start: "top 80%" },
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(".rsvp-right", {
        scrollTrigger: { trigger: ".rsvp-right", start: "top 80%" },
        x: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
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

    setTimeout(() => {
      setMessages([newWish, ...messages]);
      setSubmitted(true);
      setFormData({
        name: "",
        attendance: "attending",
        guests: 1,
        message: "",
      });
    }, 800);
  };

  const resetForm = () => setSubmitted(false);

  return (
    <section
      ref={containerRef}
      id="rsvp"
      className="py-24 md:py-40 px-6 md:px-12 bg-gradient-to-b from-white via-romantic-50/30 to-white w-full scroll-mt-20 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-romantic-200/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-romantic-200/10 rounded-full blur-3xl" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="rsvp-header text-center mb-16 md:mb-20">
          <span className="inline-block text-[10px] md:text-xs tracking-[0.5em] uppercase text-romantic-400 font-medium mb-4">
            ✦ Celebration ✦
          </span>
          <h2 className="font-script text-5xl md:text-7xl text-pink-500 mb-4">
            RSVP
          </h2>
          <p className="font-elegant text-lg text-stone-500 max-w-md mx-auto">
            We would be honored by your presence. Please confirm your attendance.
          </p>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-romantic-300 to-transparent mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column: RSVP Form */}
          <div className="rsvp-left order-2 lg:order-1">
            <div className="bg-white border border-romantic-100 p-8 md:p-12 shadow-sm relative">
              {/* Decorative corners */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-l-2 border-t-2 border-romantic-300/50" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-r-2 border-b-2 border-romantic-300/50" />

              {submitted ? (
                <div className="text-center py-8 animate-in zoom-in duration-500">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-romantic-50 text-pink-500 mb-6 border border-romantic-200">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-script text-4xl text-pink-500 mb-3">
                    Thank You!
                  </h3>
                  <p className="font-elegant text-stone-500 mb-8">
                    Your message and confirmation has been received.
                  </p>
                  <button
                    onClick={resetForm}
                    className="text-xs font-medium uppercase tracking-widest text-romantic-400 hover:text-pink-500 underline transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name Input */}
                  <div className="relative">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium block mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="block w-full border border-romantic-200 bg-white/50 rounded-sm py-3 px-4 text-stone-900 focus:border-pink-400 focus:ring-1 focus:ring-pink-200 font-elegant text-base placeholder:text-stone-400 transition-all outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Attendance & Guests Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium block mb-2">
                        Attendance
                      </label>
                      <CustomSelect
                        value={formData.attendance}
                        onChange={(val) =>
                          setFormData({ ...formData, attendance: val })
                        }
                        options={[
                          { value: "attending", label: "Will Attend" },
                          { value: "not_attending", label: "Cannot Attend" },
                        ]}
                      />
                    </div>

                    <div className="relative">
                      <label className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium block mb-2">
                        Number of Guests
                      </label>
                      <CustomSelect
                        value={formData.guests}
                        disabled={formData.attendance === "not_attending"}
                        onChange={(val) =>
                          setFormData({ ...formData, guests: Number(val) })
                        }
                        options={[1, 2, 3, 4].map((num) => ({
                          value: num,
                          label: `${num} Person(s)`
                        }))}
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="relative">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium block mb-2">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="block w-full border border-romantic-200 bg-white/50 rounded-sm py-3 px-4 text-stone-900 focus:border-pink-400 focus:ring-1 focus:ring-pink-200 font-elegant text-base placeholder:text-stone-400 resize-none outline-none transition-all"
                      placeholder="Write your warm wishes for the couple..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 px-8 rounded-sm flex items-center justify-center gap-3 hover:from-pink-600 hover:to-rose-600 transition-all duration-300 group shadow-lg shadow-pink-500/20"
                  >
                    <span className="font-medium text-sm uppercase tracking-[0.2em]">
                      Confirm & Send
                    </span>
                    <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Message Wall */}
          <div className="rsvp-right order-1 lg:order-2">
            <div className="bg-romantic-50/50 border border-romantic-100 p-6 md:p-10 h-[600px] md:h-[700px] flex flex-col relative">
              {/* Header */}
              <div className="mb-6 flex items-end justify-between border-b border-romantic-200/50 pb-6">
                <div>
                  <h3 className="font-script text-3xl md:text-4xl text-pink-500 mb-1">
                    Wedding Wishes
                  </h3>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium">
                    {messages.length} Messages
                  </p>
                </div>
                <MessageSquare className="w-6 h-6 text-romantic-300" />
              </div>

              {/* Scrollable Messages */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-hide">
                {messages.map((msg, idx) => (
                  <div
                    key={msg.id}
                    className="bg-white p-5 rounded-sm shadow-sm border border-romantic-100 hover:border-romantic-300 hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 fill-mode-backwards"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-romantic-100 to-romantic-200 flex items-center justify-center text-romantic-500">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-script text-lg text-pink-500 leading-none mb-1">
                            {msg.name}
                          </h4>
                          <span
                            className={`inline-block px-2 py-0.5 text-[9px] uppercase tracking-wider font-medium rounded-sm ${msg.attendance === "attending"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                              : "bg-stone-100 text-stone-400 border border-stone-200"
                              }`}
                          >
                            {msg.attendance === "attending"
                              ? "✓ Will Attend"
                              : "Cannot Attend"}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-stone-400 font-medium">
                        {msg.date}
                      </span>
                    </div>
                    <p className="font-elegant text-stone-700 text-sm leading-relaxed border-l-2 border-romantic-200 pl-4 italic">
                      "{msg.message}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Gradient Fade */}
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-romantic-50/80 to-transparent pointer-events-none rounded-b-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RsvpSection;
