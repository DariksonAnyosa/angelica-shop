"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HOME_V2 } from "@/lib/data";
import { HomeConfig } from "@/lib/types";
import { getHomeConfig } from "@/lib/sanity.queries";

export default function HeroDynamic({
  onExplore,
}: {
  onExplore: () => void;
  onViewChange?: (view: string) => void;
}) {
  // ── Data Logic (preserved) ──────────────────────────────────
  const [cmsData, setCmsData] = useState<HomeConfig | null>(null);

  useEffect(() => {
    getHomeConfig().then((data) => {
      if (data) setCmsData(data);
    });
  }, []);

  const hero = (cmsData || HOME_V2.hero) as HomeConfig;

  // Responsive image logic
  const desktopImg = hero.heroCommonImage || hero.mediaUrl || "/hero.png";
  const mobileImg = hero.heroMobileImage || desktopImg;

  // Announcement / subtitle text
  const announcement =
    hero.heroAnnouncement || "Beautifully crafted cashmere for every season.";

  // ── Visual Render ───────────────────────────────────────────
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* ── Background Image (Next/Image with priority for LCP) ── */}
      {/* Desktop */}
      <Image
        src={desktopImg}
        alt="Hero Background"
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        className="hidden md:block object-cover w-full h-full animate-slow-pan"
      />
      {/* Mobile */}
      <Image
        src={mobileImg}
        alt="Hero Background Mobile"
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        className="block md:hidden object-cover w-full h-full"
      />

      {/* ── Cinematic Overlay ── */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* ── Vignette — subtle radial gradient for depth ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* ── Content — Bottom-left anchored with fade-in-up ── */}
      <div className="absolute inset-0 z-20 flex items-end">
        <div className="w-full px-6 md:px-16 pb-16 md:pb-24">
          <div className="max-w-2xl animate-fade-in-up">
            {/* Subtitle / Announcement */}
            <p className="text-lg md:text-xl font-medium tracking-wide text-white/90 mb-4 drop-shadow-sm">
              {announcement}
            </p>

            {/* Main Title — Imposing Typography */}
            <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight text-white drop-shadow-md leading-[1.1] mb-8">
              {hero.heroTitle || hero.title}
            </h1>

            {/* CTA Button — Luxury Pill */}
            <button
              onClick={onExplore}
              className="bg-white text-black px-8 py-4 rounded-full font-medium text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#C19A6B] hover:text-white hover:scale-105 shadow-[0_8px_30px_rgb(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {hero.heroButtonText || hero.buttonText || "Explorar"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Scroll hint — subtle animated chevron ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-shimmer">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-sm"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
