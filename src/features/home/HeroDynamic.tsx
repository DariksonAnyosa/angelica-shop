import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroDynamic({
  onExplore,
}: {
  onExplore: () => void;
  onViewChange?: (view: string) => void;
}) {
  // ── Scroll Parallax Logic ──
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate opacity and transform for parallax effect
  const opacity = Math.max(0, 1 - scrollY / 800);
  const transform = `translateY(${scrollY * 0.5}px)`;

  // High quality Unsplash image (Elle & Riley style)
  const heroImage = "/hero.png";

  // Announcement / subtitle text
  const announcement = "Beautifully crafted cashmere for every season.";
  const title = "TIMELESS ELEGANCE";
  const buttonText = "EXPLORAR COLECCIÓN";

  // ── Visual Render ───────────────────────────────────────────
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* ── Parallax Container (Image + Content) ── */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ opacity, transform }}
      >
        {/* ── Background Image ── */}
        <Image
          src={heroImage}
          alt="Elegant woman in minimal cashmere fashion"
          fill
          priority
          sizes="100vw"
          className="object-cover w-full h-full"
        />

        {/* ── Cinematic Overlay ── */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* ── Content (Centered) ── */}
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-6 animate-fade-in-up">
            {/* Subtitle / Announcement */}
            <p className="text-sm md:text-base uppercase tracking-[0.2em] font-medium text-white mb-6 drop-shadow-md">
              {announcement}
            </p>

            {/* Main Title — Imposing Typography */}
            <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight text-white drop-shadow-lg leading-[1.1] mb-10">
              {title}
            </h1>

            {/* CTA Button — Minimal White Border */}
            <button
              onClick={onExplore}
              className="bg-transparent text-white px-10 py-4 border border-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-[0.2em] text-xs font-bold"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>

      {/* ── Scroll hint — simplified (Fixed position, doesn't scroll away immediately) ── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-bounce transition-opacity duration-300"
        style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
