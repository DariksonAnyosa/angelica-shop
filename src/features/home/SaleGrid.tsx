"use client";
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import NextImage from 'next/image';

interface SaleProduct {
    id: number;
    name: string;
    price: string;
    img: string;
    hoverImg: string;
    colors: string[];
    sizes: string[];
}

const SALE_PRODUCTS: SaleProduct[] = [
    {
        id: 201,
        name: "FINE CASHMERE BIAS TROUSER",
        price: "$590",
        img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1200&auto=format&fit=crop",
        hoverImg: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200&auto=format&fit=crop",
        colors: ["#C8B5A0", "#1A1A1A"],
        sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
        id: 202,
        name: "FINE CASHMERE BIAS TROUSER",
        price: "$590",
        img: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1200&auto=format&fit=crop",
        hoverImg: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
        colors: ["#1A1A1A", "#8B7355"],
        sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
        id: 203,
        name: "FINE CASHMERE BIAS TROUSER",
        price: "$590",
        img: "https://images.unsplash.com/photo-1594631252845-d9b502913042?q=80&w=1200&auto=format&fit=crop",
        hoverImg: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop",
        colors: ["#FFFFFF", "#1A1A1A", "#8B7355"],
        sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
        id: 204,
        name: "FINE CASHMERE SKIRT",
        price: "$450",
        img: "https://images.unsplash.com/photo-1551163943-3f6a29e3945a?q=80&w=1200&auto=format&fit=crop",
        hoverImg: "https://images.unsplash.com/photo-1582142382672-2d9370729729?q=80&w=1200&auto=format&fit=crop",
        colors: ["#1A1A1A"],
        sizes: ["XS", "S", "M", "L", "XL"]
    }
];

export default function SaleGrid({ onSelectProduct, products = [] }: { onSelectProduct: (id: number) => void, products?: any[] }) {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [gridView, setGridView] = useState<'2' | '4'>('4');

    // Use passed products or fallback to static (but static has different structure so ideally use passed)
    // Map Sanity data to component structure
    const displayProducts = products.length > 0 ? products.map((p: any) => ({
        id: p._id, // Sanity gives string IDs
        name: p.name,
        price: `S/ ${p.price}`,
        img: p.images?.[0] || '',
        hoverImg: p.images?.[1] || p.images?.[0] || '',
        colors: [], // TODO: Add color support in schema if needed
        sizes: p.sizes || [],
        isNew: true // Logic for "New" could be date based
    })) : SALE_PRODUCTS; // Fallback only if no data

    return (
        <section className="bg-white">
            {/* BLOQUE 1: Espacio superior generoso (altura del navbar + espacio extra) */}
            <div className="h-[140px] md:h-[160px]" />

            {/* BLOQUE 2: Título de Sección */}
            <div className="w-full px-6 mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-serif tracking-wide text-[#2A2A2A] text-balance">
                    NEW ARRIVALS
                </h1>
            </div>

            {/* BLOQUE 3: Barra de Herramientas (Toolbar) */}
            <div className="w-full px-6 md:px-12 mb-12">
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    {/* Izquierda: Filtros */}
                    <button className="flex items-center gap-2 text-xs uppercase tracking-wide font-medium text-[#2A2A2A] hover:opacity-60 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
                        <span>Filtros</span>
                        <span className="text-lg">+</span>
                    </button>

                    {/* Centro: Categorías */}
                    <div className="hidden md:flex gap-6 text-xs">
                        <button className="text-gray-400 hover:text-black transition-colors">
                            Blusas y Tops
                        </button>
                        <button className="text-gray-400 hover:text-black transition-colors">
                            Vestidos y Sets
                        </button>
                        <button className="text-black font-medium">
                            Pantalones y Faldas
                        </button>
                    </div>

                    {/* Derecha: Grid View Toggle */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setGridView('2')}
                            className={`text-xs uppercase tracking-wide transition-opacity ${gridView === '2' ? 'text-[#2A2A2A] font-medium' : 'text-gray-400 hover:text-[#2A2A2A]'
                                }`}
                        >
                            Catalogue View
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                            onClick={() => setGridView('4')}
                            className={`text-xs uppercase tracking-wide transition-opacity ${gridView === '4' ? 'text-[#2A2A2A] font-medium' : 'text-gray-400 hover:text-[#2A2A2A]'
                                }`}
                        >
                            Grid View
                        </button>
                    </div>
                </div>
            </div>

            {/* BLOQUE 4: Grid de productos */}
            <div className="w-full px-2">
                <div className={`grid ${gridView === '2' ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'} gap-1`}>
                    {displayProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => onSelectProduct(product.id)}
                            onMouseEnter={() => setHoveredId(product.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="cursor-pointer group relative"
                        >
                            {/* Contenedor de imagen con posición relativa */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                {/* Imagen principal */}
                                <NextImage
                                    src={product.img}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    className={`object-cover transition-opacity duration-700 ${hoveredId === product.id ? 'opacity-0' : 'opacity-100'
                                        }`}
                                />
                                {/* Imagen hover - con fade suave */}
                                <NextImage
                                    src={product.hoverImg}
                                    alt={`${product.name} back`}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    className={`object-cover transition-opacity duration-700 ${hoveredId === product.id ? 'opacity-100' : 'opacity-0'
                                        }`}
                                />

                                {/* Etiqueta NEW - Arriba Izquierda */}
                                <span className="absolute top-3 left-3 text-black text-xs font-bold uppercase tracking-wide">
                                    NEW
                                </span>

                                {/* Ícono Corazón - Arriba Derecha - Solo en Hover */}
                                {hoveredId === product.id && (
                                    <button className="absolute top-3 right-3 text-black hover:text-red-600 transition-colors">
                                        <Heart size={20} strokeWidth={1.5} />
                                    </button>
                                )}
                            </div>

                            {/* Info del producto - ABAJO DE LA IMAGEN */}
                            <div className="pt-3 px-2">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xs font-medium uppercase tracking-wide text-black flex-1">
                                        {product.name}
                                    </h3>

                                    {/* Precio - Esquina derecha */}
                                    <div className="text-sm text-black ml-4">
                                        {product.price}
                                    </div>
                                </div>

                                {/* Colores - SIEMPRE VISIBLES */}
                                <div className="flex gap-1.5 pt-1">
                                    {product.colors.map((color, idx) => (
                                        <div
                                            key={idx}
                                            className="w-4 h-4 border border-gray-300"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>

                                {/* Tallas - Solo en Hover */}
                                {hoveredId === product.id && (
                                    <div className="flex justify-end gap-2 pt-2">
                                        {product.sizes.map((size: string) => (
                                            <span
                                                key={size}
                                                className="text-xs text-gray-500"
                                            >
                                                {size}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Padding inferior */}
            <div className="h-12" />
        </section>
    );
}
