"use client";
import React from 'react';
import { HOME_V2 } from '@/lib/data';

import NextImage from 'next/image';

export default function TrendCarousel({ onSelectProduct, products = [] }: { onSelectProduct: (id: number) => void, products?: any[] }) {
    const { trends } = HOME_V2;

    const cmsFeatured = products[0] ? {
        id: products[0]._id,
        img: products[0].images?.[0] || '',
        name: products[0].name
    } : null;

    const featuredProduct = cmsFeatured || trends[0];
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <section className="w-full h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* COLUMNA IZQUIERDA: MOOD IMAGE */}
                <div className="relative h-full w-full overflow-hidden">
                    <NextImage
                        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop"
                        alt="Editorial Lifestyle"
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </div>

                {/* COLUMNA DERECHA */}
                <div className="relative h-full w-full bg-white flex flex-col justify-between items-center py-16 px-12 lg:py-20 lg:px-16">
                    <div className="text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.4em] text-black">
                            Featured
                        </p>
                    </div>

                    <div className="flex items-center justify-center w-full">
                        <div
                            onClick={() => onSelectProduct(featuredProduct.id)}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="cursor-pointer group w-[50%] max-w-[280px] relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm"
                            tabIndex={0}
                            role="button"
                            onKeyDown={(e) => e.key === 'Enter' && onSelectProduct(featuredProduct.id)}
                        >
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <NextImage
                                    src={featuredProduct.img}
                                    alt={featuredProduct.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />

                                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                    <button className="text-white text-sm font-light tracking-wide hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                                        Shop Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <h2 className="font-sans font-bold text-2xl lg:text-3xl uppercase tracking-tight text-black text-balance">
                            Complete in Cashmere
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
