"use client";
import React from "react";
import { HOME_V2 } from "@/lib/data";
import NextImage from "next/image";

export default function ThreeColumnBanner({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  // Fallback if saleCategories is not yet populated (though we just added it)
  const categories = HOME_V2.saleCategories || [];

  if (categories.length === 0) return null;

  return (
    <section className="w-full bg-angelica-bg">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="relative group cursor-pointer overflow-hidden h-[600px] md:h-[700px]"
          >
            {/* Background Image */}
            <NextImage
              src={cat.img}
              alt={cat.label}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay Gradient (Bottom only for readability) */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

            {/* Content: Bottom Left */}
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="font-serif text-3xl md:text-4xl mb-2 tracking-[0.06em]">
                {cat.label}
              </h3>
              <button className="text-sm font-bold uppercase tracking-[0.15em] border-b border-white hover:text-gray-200 hover:border-gray-200 transition-all duration-300 ease-in-out">
                {cat.linkText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
