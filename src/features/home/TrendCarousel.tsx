"use client";
import React from "react";
import { HOME_V2 } from "@/lib/data";
import { SanityProduct } from "@/lib/types";
import NextImage from "next/image";

export default function TrendCarousel({
  onSelectProduct,
  products = [],
}: {
  onSelectProduct: (id: number | string) => void;
  products?: SanityProduct[];
}) {
  const { trends } = HOME_V2;

  // ── Map CMS products (first 4) or fallback to static trends ──
  const displayItems =
    products.length > 0
      ? products.slice(0, 4).map((p: SanityProduct) => ({
          id: p._id,
          img: p.images?.[0] || "",
          name: p.name,
          price: `S/ ${p.price}`,
          tag: "Nuevo",
        }))
      : trends.map((t) => ({
          id: t.id,
          img: t.img,
          name: t.name,
          price: t.price,
          tag: t.tag,
        }));

  const featuredProduct = displayItems[0];
  const sideProducts = displayItems.slice(1, 4);

  return (
    <section className="w-full bg-angelica-bg">
      {/* ── Section Header ── */}
      <div className="text-center pt-20 pb-12 px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C19A6B] mb-3">
          Curated Selection
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#4A3B32] text-balance">
          Trending Now
        </h2>
      </div>

      {/* ── Split Layout: Hero Feature + Side Grid ── */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* ── LEFT: Featured Product (large card) ── */}
          <div
            onClick={() => onSelectProduct(featuredProduct.id)}
            className="group relative overflow-hidden rounded-xl cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && onSelectProduct(featuredProduct.id)
            }
          >
            {/* Image Container */}
            <div className="relative aspect-3/4 overflow-hidden rounded-xl">
              <NextImage
                src={featuredProduct.img}
                alt={featuredProduct.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Badge */}
              {featuredProduct.tag && (
                <span className="absolute top-5 left-5 z-10 bg-white/80 backdrop-blur-sm text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full text-[#4A3B32] font-medium">
                  {featuredProduct.tag}
                </span>
              )}

              {/* Glassmorphism CTA — slides up on hover */}
              <div className="absolute bottom-3 md:bottom-4 left-0 right-0 mx-auto w-[90%] opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 group-hover:md:opacity-100 group-hover:md:translate-y-0 transition-all duration-500 ease-out z-10">
                <button className="w-full bg-white/90 backdrop-blur-md text-black py-2.5 md:py-3.5 rounded-lg font-medium text-[10px] md:text-sm uppercase tracking-[0.15em] shadow-lg hover:bg-white transition-colors">
                  Ver Producto
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="pt-4 px-1">
              <h3 className="font-serif text-lg tracking-wide text-[#4A3B32] mb-1">
                {featuredProduct.name}
              </h3>
              <p className="font-medium text-black text-sm">
                {featuredProduct.price}
              </p>
            </div>
          </div>

          {/* ── RIGHT: Side Products (stacked) ── */}
          <div className="grid grid-cols-2 gap-4">
            {sideProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product.id)}
                className="group relative cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && onSelectProduct(product.id)
                }
              >
                {/* Image Container */}
                <div className="relative aspect-3/4 overflow-hidden rounded-xl">
                  <NextImage
                    src={product.img}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Badge */}
                  {product.tag && (
                    <span className="absolute top-3 left-3 z-10 bg-white/80 backdrop-blur-sm text-[10px] uppercase tracking-widest px-2 py-1 rounded-full text-[#4A3B32] font-medium">
                      {product.tag}
                    </span>
                  )}

                  {/* Glassmorphism CTA */}
                  <div className="absolute bottom-2 md:bottom-3 left-0 right-0 mx-auto w-[90%] opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 group-hover:md:opacity-100 group-hover:md:translate-y-0 transition-all duration-500 ease-out z-10">
                    <button className="w-full bg-white/90 backdrop-blur-md text-black py-2 md:py-2.5 rounded-lg font-medium text-[10px] md:text-xs uppercase tracking-[0.15em] shadow-lg hover:bg-white transition-colors">
                      Ver
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="pt-3 px-1">
                  <h3 className="font-serif text-base tracking-wide text-[#4A3B32] mb-0.5 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="font-medium text-black text-sm">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
