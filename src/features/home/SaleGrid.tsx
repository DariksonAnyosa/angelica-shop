"use client";
import React, { useState } from "react";
import { Heart, Eye } from "lucide-react";
import NextImage from "next/image";
import { SanityProduct } from "@/lib/types";
import { useWishlist } from "@/context/WishlistContext";

// ── Static fallback data ──────────────────────────────────────
interface SaleProduct {
  id: number | string;
  name: string;
  price: string;
  img: string;
  hoverImg: string;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
}

const SALE_PRODUCTS: SaleProduct[] = [
  {
    id: 201,
    name: "Fine Cashmere Bias Trouser",
    price: "$590",
    img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1200&auto=format&fit=crop",
    hoverImg:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200&auto=format&fit=crop",
    colors: ["#C8B5A0", "#1A1A1A"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: 202,
    name: "Fine Cashmere Wrap Blouse",
    price: "$590",
    img: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1200&auto=format&fit=crop",
    hoverImg:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
    colors: ["#1A1A1A", "#8B7355"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
  },
  {
    id: 203,
    name: "Fine Cashmere Midi Skirt",
    price: "$590",
    img: "https://images.unsplash.com/photo-1594631252845-d9b502913042?q=80&w=1200&auto=format&fit=crop",
    hoverImg:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop",
    colors: ["#FFFFFF", "#1A1A1A", "#8B7355"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: 204,
    name: "Fine Cashmere A-Line Skirt",
    price: "$450",
    img: "https://images.unsplash.com/photo-1551163943-3f6a29e3945a?q=80&w=1200&auto=format&fit=crop",
    hoverImg:
      "https://images.unsplash.com/photo-1582142382672-2d9370729729?q=80&w=1200&auto=format&fit=crop",
    colors: ["#1A1A1A"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
  },
];

// ── Component ─────────────────────────────────────────────────
export default function SaleGrid({
  onSelectProduct,
  products = [],
}: {
  onSelectProduct: (id: number | string) => void;
  products?: SanityProduct[];
}) {
  const [hoveredId, setHoveredId] = useState<number | string | null>(null);
  const [gridView, setGridView] = useState<"2" | "4">("4");
  const { toggleWishlistItem, isInWishlist } = useWishlist();

  // Map CMS data → component structure, or fallback to static
  const displayProducts: SaleProduct[] =
    products.length > 0
      ? products.map((p: SanityProduct) => ({
          id: p._id,
          name: p.name,
          price: `S/ ${p.price}`,
          img: p.images?.[0] || "",
          hoverImg: p.images?.[1] || p.images?.[0] || "",
          colors: p.colors || [],
          sizes: p.sizes || [],
          isNew: true,
        }))
      : SALE_PRODUCTS;

  return (
    <section className="bg-white">
      {/* ── Spacer for fixed navbar ── */}
      <div className="h-[140px] md:h-[160px]" />

      {/* ── Section Title ── */}
      <div className="w-full px-6 mb-4 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C19A6B] mb-3">
          Shop the Latest
        </p>
        <h1 className="text-3xl md:text-4xl font-serif tracking-tight text-[#2A2A2A] text-balance">
          New Arrivals
        </h1>
      </div>

      {/* ── Toolbar ── */}
      <div className="w-full px-6 md:px-12 mb-10">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          {/* Left: Filter */}
          <button className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] font-medium text-[#2A2A2A] hover:opacity-60 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-xl">
            <span>Filtros</span>
            <span className="text-lg leading-none">+</span>
          </button>

          {/* Center: Categories */}
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

          {/* Right: View Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setGridView("2")}
              className={`text-xs uppercase tracking-wide transition-opacity ${
                gridView === "2"
                  ? "text-[#2A2A2A] font-medium"
                  : "text-gray-400 hover:text-[#2A2A2A]"
              }`}
            >
              Catalogue
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => setGridView("4")}
              className={`text-xs uppercase tracking-wide transition-opacity ${
                gridView === "4"
                  ? "text-[#2A2A2A] font-medium"
                  : "text-gray-400 hover:text-[#2A2A2A]"
              }`}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="w-full px-3 md:px-6">
        <div
          className={`grid gap-x-3 gap-y-10 ${
            gridView === "2"
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="group relative cursor-pointer"
              onClick={() => onSelectProduct(product.id)}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* ── Image Container ── */}
              <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-gray-50">
                {/* Primary Image */}
                <NextImage
                  src={product.img}
                  alt={product.name}
                  fill
                  sizes={
                    gridView === "2"
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                  className={`object-cover w-full h-full transition-all duration-700 ease-out group-hover:scale-105 ${
                    hoveredId === product.id ? "opacity-0" : "opacity-100"
                  }`}
                />

                {/* Hover Image */}
                <NextImage
                  src={product.hoverImg}
                  alt={`${product.name} alternate`}
                  fill
                  sizes={
                    gridView === "2"
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                  className={`object-cover w-full h-full transition-all duration-700 ease-out group-hover:scale-105 ${
                    hoveredId === product.id ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* ── Badge: NEW (top-left) ── */}
                {product.isNew && (
                  <span className="absolute top-3 left-3 z-10 bg-white/80 backdrop-blur-sm text-[10px] uppercase tracking-widest px-2 py-1 rounded-full text-[#4A3B32] font-medium">
                    New
                  </span>
                )}

                <button
                  className={`absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full transition-all duration-300 ease-out opacity-100 md:opacity-0 translate-y-0 md:-translate-y-2 active:scale-95 ${
                    hoveredId === product.id
                      ? "md:opacity-100 md:translate-y-0"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    const priceStr =
                      product.price?.replace(/[^\d.]/g, "") || "0";
                    toggleWishlistItem({
                      id: String(product.id),
                      name: product.name,
                      price: parseFloat(priceStr),
                      image: product.img,
                    });
                  }}
                  aria-label={
                    isInWishlist(String(product.id))
                      ? "Quitar de favoritos"
                      : "Añadir a favoritos"
                  }
                >
                  <Heart
                    size={16}
                    strokeWidth={1.5}
                    className={`transition-colors duration-300 ${
                      isInWishlist(String(product.id))
                        ? "text-[#C19A6B] fill-[#C19A6B]"
                        : "text-[#4A3B32] hover:text-red-400"
                    }`}
                  />
                </button>

                {/* ── Glassmorphism CTA (slides up on hover) ── */}
                <div
                  className={`absolute bottom-3 md:bottom-4 left-0 right-0 mx-auto w-[90%] z-10 transition-all duration-500 ease-out opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 ${
                    hoveredId === product.id
                      ? "md:opacity-100 md:translate-y-0"
                      : ""
                  }`}
                >
                  <button
                    className="w-full bg-white/90 backdrop-blur-md text-black py-2.5 md:py-3 rounded-lg font-medium text-[10px] md:text-xs uppercase tracking-[0.15em] shadow-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product.id);
                    }}
                  >
                    <Eye size={14} strokeWidth={1.5} />
                    Ver Producto
                  </button>
                </div>
              </div>

              {/* ── Product Info (below image) ── */}
              <div className="pt-4 px-1">
                {/* Name */}
                <h3 className="font-serif text-base md:text-lg tracking-wide text-[#4A3B32] mb-1 line-clamp-1">
                  {product.name}
                </h3>

                {/* Price */}
                <p className="font-medium text-black text-sm mb-2">
                  {product.price}
                </p>

                {/* Color Swatches */}
                {product.colors.length > 0 && (
                  <div className="flex gap-1.5 pt-1">
                    {product.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-3.5 h-3.5 rounded-full border border-gray-200 transition-transform duration-300 hover:scale-125"
                        style={{ backgroundColor: color }}
                        aria-label={`Color: ${color}`}
                      />
                    ))}
                  </div>
                )}

                {/* Sizes — slide in on hover */}
                <div
                  className={`flex gap-2 pt-2 transition-all duration-300 ease-out ${
                    hoveredId === product.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1"
                  }`}
                >
                  {product.sizes.map((size: string) => (
                    <span
                      key={size}
                      className="text-[10px] uppercase tracking-widest text-gray-400"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-16" />
    </section>
  );
}
