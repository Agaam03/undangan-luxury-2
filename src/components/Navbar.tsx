"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X, Calendar } from "lucide-react";
import gsap from "gsap";
import { weddingData } from "@/wedding-data";

export const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items mapping
  const navItems = [
    { name: "Couple", href: "#couple" },
    { name: "Schedule", href: "#roundown-acara" },
    { name: "Gallery", href: "#gallery" },
    { name: "Story", href: "#love-story" },
    { name: "RSVP", href: "#ucapan-rsvp" },
  ];

  const initials = `${weddingData.groom.nickname.charAt(
    0
  )} & ${weddingData.bride.nickname.charAt(0)}`;
  const fullNames = `${weddingData.groom.nickname} & ${weddingData.bride.nickname}`;

  // Handle Desktop Scroll Animation
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { yPercent: -100, autoAlpha: 0 });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 150) {
        gsap.to(nav, {
          yPercent: 0,
          autoAlpha: 1,
          width: "90%",
          maxWidth: "1000px",
          marginTop: "20px",
          borderRadius: "100px",
          backgroundColor: "rgba(255, 255, 255, 0.90)",
          backdropFilter: "blur(15px)",
          padding: "0.6rem 2rem",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.08)",
          duration: 0.6,
          ease: "power4.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(nav, {
          yPercent: -100,
          autoAlpha: 0,
          duration: 0.4,
          ease: "power3.in",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Mobile Menu Animations
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();

      gsap.set(mobileMenuRef.current, { yPercent: -100 });
      gsap.set(".mobile-link", { opacity: 0, y: 20 });

      tl.to(mobileMenuRef.current, {
        yPercent: 0,
        duration: 0.8,
        ease: "expo.out",
      }).to(
        ".mobile-link",
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  const closeMenu = () => {
    const tl = gsap.timeline({
      onComplete: () => setIsMobileMenuOpen(false),
    });

    tl.to(".mobile-link", {
      opacity: 0,
      y: -10,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.in",
    }).to(
      mobileMenuRef.current,
      {
        yPercent: -100,
        duration: 0.6,
        ease: "expo.inOut",
      },
      "-=0.1"
    );
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (isMobileMenuOpen) {
      closeMenu();
    }

    if (element) {
      setTimeout(
        () => {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: "smooth",
          });
        },
        isMobileMenuOpen ? 700 : 0
      );
    }
  };

  return (
    <>
      {/* Desktop/Sticky Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none px-4">
        <nav
          ref={navRef}
          className="pointer-events-auto text-stone-700 flex justify-between items-center w-full invisible"
        >
          {/* Logo - Script Font */}
          <div className="shrink-0">
            <a href="#" className="hover:opacity-60 transition-opacity">
              <span className="font-script text-2xl md:text-3xl text-pink-500">
                {initials}
              </span>
            </a>
          </div>

          {/* Desktop Links - Elegant Font */}
          <div className="hidden md:flex items-center gap-8 font-elegant text-[11px] tracking-[0.25em] uppercase">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-stone-600 hover:text-pink-500 transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-pink-400 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-pink-500"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={22} />
          </button>
        </nav>
      </div>

      {/* GSAP Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[100] bg-gradient-to-b from-white to-romantic-50 flex flex-col items-center justify-center md:hidden"
        >
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />

          {/* Close Button */}
          <button
            onClick={closeMenu}
            className="absolute top-8 right-8 p-3 bg-white rounded-full text-stone-600 border border-stone-100 shadow-sm hover:text-pink-500 transition-colors"
          >
            <X size={22} />
          </button>

          {/* Brand Header */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="text-[9px] uppercase tracking-[0.5em] text-romantic-400 font-medium mb-2">
              The Wedding of
            </span>
            <span className="font-script text-3xl text-pink-500">
              {fullNames}
            </span>
          </div>

          {/* Links Container */}
          <div className="flex flex-col gap-5 items-center text-center w-full px-12">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="mobile-link font-script text-4xl text-pink-500 hover:text-romantic-400 transition-colors py-1"
              >
                {item.name}
              </a>
            ))}

            <div className="mobile-link w-24 h-px bg-gradient-to-r from-transparent via-romantic-300 to-transparent my-4" />

            <a
              href="#ucapan-rsvp"
              onClick={(e) => scrollToSection(e, "#ucapan-rsvp")}
              className="mobile-link flex items-center gap-3 px-8 py-3 bg-stone-900 text-white font-elegant text-xs uppercase tracking-[0.25em] rounded-full shadow-lg hover:bg-stone-800 transition-all"
            >
              <Calendar size={14} />
              Confirm RSVP
            </a>
          </div>

          {/* Decorative Footer */}
          <div className="absolute bottom-12 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-romantic-200" />
              <span className="text-romantic-300 text-sm">❧</span>
              <div className="w-8 h-px bg-romantic-200" />
            </div>
            <span className="font-elegant text-xs tracking-[0.2em] text-stone-500">
              {weddingData.event.displayDate} • {weddingData.event.location}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
