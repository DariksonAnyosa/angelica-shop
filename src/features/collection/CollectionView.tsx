"use client";
import React, { useState } from 'react';
import { Grid, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { COLLECTION_ITEMS } from '@/lib/data';
import NextImage from 'next/image';

interface CollectionViewProps {
    onProductSelect?: (id: number | string) => void;
    products?: any[];
}

export default function CollectionView({ onProductSelect, products = [] }: CollectionViewProps) {
    const [hoveredId, setHoveredId] = useState<number | string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'catalogue'>('grid');

    // Mapear CMS Products
    const cmsItems = products.map((p: any) => ({
        type: 'product',
        id: p._id,
        name: p.name,
        price: p.price,
        image: p.images?.[0],
        image2: p.images?.[1] || p.images?.[0],
        colors: p.colors || [],
        sizes: p.sizes,
        isNew: true
    }));

    // Use CMS items if available, else static fallback
    const itemsToDisplay = cmsItems.length > 0 ? cmsItems : COLLECTION_ITEMS.filter(item => item.type === 'product');

    // Primeras 3 filas (12 productos)
    const firstBatch = itemsToDisplay.slice(0, 12);

    // Siguientes 5 filas (20 productos más)
    const secondBatch = itemsToDisplay.slice(12, 32);

    return (
        <div className="min-h-screen bg-white">
            {/* BLOQUE A: Header está en Navbar (sticky por defecto) */}

            {/* BLOQUE B: Barra de Control */}
            <div className="max-w-[1920px] mx-auto px-6 md:px-12 pt-20 pb-8">
                <div className="flex items-center justify-between">
                    {/* Izquierda: Título de la Página */}
                    <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-balance">
                        NEW ARRIVALS
                    </h1>

                    {/* Derecha: Herramientas */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`flex items-center gap-2 text-[11px] uppercase tracking-wide transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm ${viewMode === 'grid' ? 'opacity-100' : 'opacity-40 hover:opacity-60'
                                }`}
                        >
                            <Grid size={16} strokeWidth={1.5} />
                            <span className="hidden md:inline">Grid</span>
                        </button>

                        <button
                            onClick={() => setViewMode('catalogue')}
                            className={`flex items-center gap-2 text-[11px] uppercase tracking-wide transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm ${viewMode === 'catalogue' ? 'opacity-100' : 'opacity-40 hover:opacity-60'
                                }`}
                        >
                            <LayoutGrid size={16} strokeWidth={1.5} />
                            <span className="hidden md:inline">Catalogue</span>
                        </button>

                        <button className="flex items-center gap-2 text-[11px] uppercase tracking-wide hover:opacity-60 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm">
                            <SlidersHorizontal size={16} strokeWidth={1.5} />
                            <span className="hidden md:inline">Filtros</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* BLOQUE C: Grilla de Productos - Parte 1 (3 filas = 12 productos) */}
            <div className="w-full px-1 mb-10">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-1">
                    {firstBatch.map((item) => (
                        <div
                            key={item.id}
                            className="group cursor-pointer flex flex-col gap-2"
                            onClick={() => onProductSelect && onProductSelect(item.id)}
                            onMouseEnter={() => setHoveredId(item.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Imagen */}
                            <div className="relative aspect-[3/4] w-full bg-[#F0F0F0]">
                                {/* Imagen Principal */}
                                <NextImage
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    className="object-cover transition-opacity duration-500"
                                    style={{ opacity: hoveredId === item.id ? 0 : 1 }}
                                />

                                {/* Imagen Secundaria (hover) */}
                                {item.image2 && (
                                    <NextImage
                                        src={item.image2}
                                        alt={item.name}
                                        fill
                                        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                        className="object-cover transition-opacity duration-500"
                                        style={{ opacity: hoveredId === item.id ? 1 : 0 }}
                                    />
                                )}

                                {item.isNew && (
                                    <div className="absolute top-4 left-4 text-[12px] font-medium tracking-widest text-black z-10 uppercase">
                                        NEW
                                    </div>
                                )}
                            </div>

                            {/* Info del Producto - Nuevo Diseño Estilo Referencia */}
                            <div className="flex flex-col px-1">
                                {/* Fila 1: Nombre y Precio */}
                                <div className="flex items-start justify-between w-full mb-1">
                                    <h3 className="text-[13px] uppercase tracking-wide font-medium text-black pr-4 leading-tight">
                                        {item.name}
                                    </h3>
                                    <span className="text-[13px] font-medium text-black shrink-0">
                                        S/. {item.price}
                                    </span>
                                </div>

                                {/* Fila 2: Colores (Siempre visibles) y Tallas (Hover/Desktop) */}
                                <div className="flex items-center justify-between min-h-[20px]">
                                    {/* Swatches de Color Formato Cuadrado Pequeño */}
                                    {item.colors && item.colors.length > 0 ? (
                                        <div className="flex gap-1">
                                            {item.colors.map((color: string, index: number) => (
                                                <div
                                                    key={index}
                                                    className="w-3 h-3 border border-gray-400/50"
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div />
                                    )}

                                    {/* Tallas */}
                                    {item.sizes && item.sizes.length > 0 && (
                                        <div className="hidden lg:flex gap-2 text-[11px] uppercase tracking-wider text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {item.sizes.map((size: string, index: number) => (
                                                <span key={index}>{size}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* BLOQUE D: El "Break" Visual - Banner Full Width */}
            <div className="w-full my-4 md:my-8 px-1">
                <div className="relative w-full h-[500px] md:h-[700px] overflow-hidden">
                    <NextImage
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1920&auto=format&fit=crop"
                        alt="Campaign"
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                    {/* Overlay con texto Minimalista */}
                    <div className="absolute inset-x-0 bottom-12 flex justify-center">
                        <div className="text-center text-white mix-blend-difference">
                            <h2 className="text-4xl md:text-6xl font-light tracking-widest mb-2 uppercase">
                                The Collection
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* BLOQUE E: Grilla de Productos - Parte 2 (5 filas = 20 productos) */}
            <div className="w-full px-1 pb-20">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-1">
                    {secondBatch.map((item) => (
                        <div
                            key={item.id}
                            className="group cursor-pointer flex flex-col gap-2"
                            onClick={() => onProductSelect && onProductSelect(item.id)}
                            onMouseEnter={() => setHoveredId(item.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Imagen */}
                            <div className="relative aspect-[3/4] w-full bg-[#F0F0F0]">
                                {/* Imagen Principal */}
                                <NextImage
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    className="object-cover transition-opacity duration-500"
                                    style={{ opacity: hoveredId === item.id ? 0 : 1 }}
                                />

                                {/* Imagen Secundaria (hover) */}
                                {item.image2 && (
                                    <NextImage
                                        src={item.image2}
                                        alt={item.name}
                                        fill
                                        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                        className="object-cover transition-opacity duration-500"
                                        style={{ opacity: hoveredId === item.id ? 1 : 0 }}
                                    />
                                )}

                                {item.isNew && (
                                    <div className="absolute top-4 left-4 text-[12px] font-medium tracking-widest text-black z-10 uppercase">
                                        NEW
                                    </div>
                                )}
                            </div>

                            {/* Info del Producto */}
                            <div className="flex flex-col px-1">
                                {/* Fila 1: Nombre y Precio */}
                                <div className="flex items-start justify-between w-full mb-1">
                                    <h3 className="text-[13px] uppercase tracking-wide font-medium text-black pr-4 leading-tight">
                                        {item.name}
                                    </h3>
                                    <span className="text-[13px] font-medium text-black shrink-0">
                                        S/. {item.price}
                                    </span>
                                </div>

                                {/* Fila 2: Colores y Tallas */}
                                <div className="flex items-center justify-between min-h-[20px]">
                                    {/* Swatches */}
                                    {item.colors && item.colors.length > 0 ? (
                                        <div className="flex gap-1">
                                            {item.colors.map((color: string, index: number) => (
                                                <div
                                                    key={index}
                                                    className="w-3 h-3 border border-gray-400/50"
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div />
                                    )}

                                    {/* Tallas */}
                                    {item.sizes && item.sizes.length > 0 && (
                                        <div className="hidden lg:flex gap-2 text-[11px] uppercase tracking-wider text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {item.sizes.map((size: string, index: number) => (
                                                <span key={index}>{size}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
