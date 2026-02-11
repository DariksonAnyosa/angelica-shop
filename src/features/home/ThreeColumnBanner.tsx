"use client";
import React from 'react';
import { HOME_V2 } from '@/lib/data';

export default function ThreeColumnBanner({ onSelect }: { onSelect: (id: string) => void }) {
    // Fallback if saleCategories is not yet populated (though we just added it)
    const categories = HOME_V2.saleCategories || [];

    if (categories.length === 0) return null;

    return (
        <section className="w-full bg-[#fdfbf7]">
            <div className="grid grid-cols-1 md:grid-cols-3">
                {categories.map((cat, index) => (
                    <div
                        key={cat.id}
                        onClick={() => onSelect(cat.id)}
                        className="relative group cursor-pointer overflow-hidden h-[600px] md:h-[700px]"
                    >
                        {/* Background Image */}
                        <img
                            src={cat.img}
                            alt={cat.label}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Overlay Gradient (Bottom only for readability) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

                        {/* Content: Bottom Left */}
                        <div className="absolute bottom-8 left-8 text-white">
                            <h3 className="font-serif text-3xl md:text-4xl mb-2 tracking-wide">
                                {cat.label}
                            </h3>
                            <button className="text-sm font-bold uppercase tracking-widest border-b border-white hover:text-gray-200 hover:border-gray-200 transition-colors">
                                {cat.linkText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
