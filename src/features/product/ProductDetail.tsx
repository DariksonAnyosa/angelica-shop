"use client";
import React, { useState } from 'react';
import { Plus, ArrowLeft, Heart, ChevronDown } from 'lucide-react';
import { COLLECTION_ITEMS, PRODUCT_AMALFI } from '@/lib/data';
import NextImage from 'next/image';

interface ProductDetailProps {
    productId?: string | number | null;
    onBack: () => void;
    products?: any[];
}

export default function ProductDetail({ productId, onBack, products = [] }: ProductDetailProps) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [showRealWomen, setShowRealWomen] = useState(false);

    // 1. Dynamic Data Fetching
    // Determine if we have CMS data for this ID
    const cmsProduct = products.find((p: any) => p._id === productId);

    // Mapping Logic: CMS -> Component Structure
    const mappedProduct = cmsProduct ? {
        id: cmsProduct._id,
        name: cmsProduct.name,
        price: `S/ ${cmsProduct.price}`,
        description: cmsProduct.description,
        story: cmsProduct.story,
        img: cmsProduct.images?.[0] || '',
        gallery: cmsProduct.images || [],
        sizes: cmsProduct.sizes || [],
        isSoldOut: cmsProduct.isSoldOut,
        stylistNote: "Disponible en tienda" // Default note or add to schema
    } : null;

    const foundStaticProduct = COLLECTION_ITEMS.find(p => p.id == productId && p.type === 'product');

    // Merge logic: Mapped CMS > Static Found > Amalfi Default
    const product: any = mappedProduct || (foundStaticProduct ? {
        ...PRODUCT_AMALFI,
        ...foundStaticProduct,
        gallery: (foundStaticProduct.gallery && foundStaticProduct.gallery.length > 0)
            ? foundStaticProduct.gallery
            : [foundStaticProduct.img || PRODUCT_AMALFI.img]
    } : PRODUCT_AMALFI);

    return (
        <div className="bg-[#FDFBF7] min-h-screen animate-fade-in-up">
            {/* Back Nav */}
            <div className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference text-white pointer-events-none">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest pointer-events-auto hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded-sm"
                >
                    <ArrowLeft size={16} /> Volver
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">

                {/* IZQUIERDA: Galería Inmersiva Vertical (60%) */}
                <div className="lg:col-span-7 bg-[#F0F0F0] lg:h-screen lg:overflow-y-auto scrollbar-hide">
                    <div className="flex flex-col">
                        {product.gallery?.map((img: string, i: number) => (
                            <div key={i} className="relative w-full aspect-[3/4] md:aspect-auto md:h-screen">
                                <NextImage src={img} alt={`View ${i}`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" priority={i === 0} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* DERECHA: Sticky Panel (40%) */}
                <div className="lg:col-span-5 relative bg-white px-6 py-12 md:px-12 md:py-24 flex flex-col justify-center shadow-2xl z-40">
                    <div className="lg:h-screen lg:sticky lg:top-0 lg:flex lg:flex-col lg:justify-center">

                        {/* Header */}
                        <div className="mb-8">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Nueva Colección</span>
                            <h1 className="font-serif text-4xl md:text-5xl text-[#4A3B32] mt-2 mb-2 text-balance">{product.name}</h1>
                            <p className="text-2xl font-light text-gray-800">{product.price}</p>
                        </div>

                        {/* Storytelling */}
                        <div className="mb-8 space-y-4">
                            <p className="text-sm leading-relaxed text-gray-600">{product.story || product.description}</p>

                            {/* Conditional Rendering: Stylist Note */}
                            {product.stylistNote && (
                                <div className="p-4 bg-[#FDFBF7] border-l-2 border-[#C19A6B] italic text-xs text-[#4A3B32]">
                                    <span className="font-bold not-italic block mb-1 uppercase tracking-wider">Nota de la Estilista:</span>
                                    "{product.stylistNote}"
                                </div>
                            )}
                        </div>

                        {/* Tallas & Probador Virtual */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#4A3B32]">Talla</span>
                                <button
                                    onClick={() => setShowRealWomen(!showRealWomen)}
                                    className="text-[10px] uppercase tracking-widest text-[#C19A6B] underline hover:text-[#4A3B32] flex items-center gap-1"
                                >
                                    ¿Dudas con tu talla? <ChevronDown size={12} className={`transition-transform ${showRealWomen ? 'rotate-180' : ''}`} />
                                </button>
                            </div>

                            {/* Probador Virtual Expandable */}
                            {showRealWomen && product.realWomen && (
                                <div className="mb-6 bg-[#FDFBF7] p-4 rounded-sm animate-fade-in-up">
                                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3 text-center text-gray-400">Referencias Reales</p>
                                    <div className="space-y-3">
                                        {product.realWomen.map((women: any, i: number) => (
                                            <div key={i} className="flex gap-3 items-start text-xs border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div> {/* Avatar Placeholder */}
                                                <div>
                                                    <span className="font-bold text-[#4A3B32]">{women.name}</span> <span className="text-gray-400">| {women.height}</span>
                                                    <p className="text-gray-500 mt-1">{women.note}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3">
                                {['S', 'M', 'L'].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 flex items-center justify-center border text-xs font-bold transition-all
                                            ${selectedSize === size
                                                ? 'border-[#4A3B32] bg-[#4A3B32] text-white'
                                                : 'border-gray-200 text-gray-400 hover:border-[#C19A6B] hover:text-[#C19A6B]'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 mb-12">
                            <button
                                disabled={product.isSoldOut}
                                className={`flex-1 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors shadow-xl
                                    ${product.isSoldOut
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-[#4A3B32] text-white hover:bg-[#C19A6B]'
                                    }`}
                            >
                                {product.isSoldOut ? 'Agotado' : 'Añadir a la Bolsa'}
                            </button>
                            <button className="w-14 flex items-center justify-center border border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400 transition-colors">
                                <Heart size={20} />
                            </button>
                        </div>

                        {/* Cross Sell (Complete the Look) - Conditional */}
                        {product.crossSell && (
                            <div className="pt-8 border-t border-gray-100">
                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 text-[#C19A6B]">Completa el Look</p>
                                <div className="flex gap-4 items-center bg-[#FDFBF7] p-3 rounded-sm group hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="w-16 h-16 bg-white overflow-hidden rounded-sm relative">
                                        <NextImage src={product.crossSell.img} alt={product.crossSell.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-serif text-[#4A3B32]">{product.crossSell.name}</p>
                                        <p className="text-[10px] text-gray-500 line-clamp-2 mt-1">{product.crossSell.description}</p>
                                    </div>
                                    <div className="h-8 w-8 rounded-full bg-[#4A3B32] text-white flex items-center justify-center hover:bg-[#C19A6B] transition-colors shadow-lg">
                                        <Plus size={14} />
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
