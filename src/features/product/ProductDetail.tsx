"use client";
import React, { useState } from "react";
import { Plus, ArrowLeft, Heart, ChevronDown, ShoppingBag } from "lucide-react";
import { COLLECTION_ITEMS, PRODUCT_AMALFI } from "@/lib/data";
import { SanityProduct } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import NextImage from "next/image";

interface ProductDetailProps {
  productId?: string | number | null;
  onBack: () => void;
  products?: SanityProduct[];
}

export default function ProductDetail({
  productId,
  onBack,
  products = [],
}: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showRealWomen, setShowRealWomen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlistItem, isInWishlist } = useWishlist();

  // ── Data Logic (preserved) ──────────────────────────────────
  const cmsProduct = products.find((p: SanityProduct) => p._id === productId);

  const mappedProduct = cmsProduct
    ? {
        id: cmsProduct._id,
        name: cmsProduct.name,
        price: `S/ ${cmsProduct.price}`,
        numericPrice: cmsProduct.price,
        description: cmsProduct.description,
        story: cmsProduct.story,
        img: cmsProduct.images?.[0] || "",
        gallery: cmsProduct.images || [],
        sizes: cmsProduct.sizes || [],
        isSoldOut: cmsProduct.isSoldOut,
        stylistNote: "Disponible en tienda",
      }
    : null;

  const foundStaticProduct = COLLECTION_ITEMS.find(
    (p) => p.id == productId && p.type === "product",
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const product: Record<string, any> =
    mappedProduct ||
    (foundStaticProduct
      ? {
          ...PRODUCT_AMALFI,
          ...foundStaticProduct,
          gallery:
            foundStaticProduct.gallery && foundStaticProduct.gallery.length > 0
              ? foundStaticProduct.gallery
              : [foundStaticProduct.img || PRODUCT_AMALFI.img],
        }
      : PRODUCT_AMALFI);

  // Available sizes — use product sizes if available, else defaults
  const availableSizes: string[] =
    product.sizes && product.sizes.length > 0
      ? product.sizes
      : ["XS", "S", "M", "L", "XL"];

  // ── Add to Cart Handler ─────────────────────────────────────
  const handleAddToCart = () => {
    if (!selectedSize || product.isSoldOut) return;

    const priceStr = product.price?.replace(/[^\d.]/g, "") || "0";

    addToCart({
      id: String(product.id || productId),
      name: product.name,
      price: parseFloat(priceStr),
      image: product.img || product.gallery?.[0] || "",
      size: selectedSize,
      quantity: 1,
    });

    // Button feedback animation
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1500);
  };

  // ── Visual Render ───────────────────────────────────────────
  return (
    <div className="bg-white min-h-screen animate-fade-in-up">
      {/* ── Floating Back Button ── */}
      <div className="fixed top-0 left-0 w-full z-50 p-4 md:p-6 pointer-events-none">
        <button
          onClick={onBack}
          className="pointer-events-auto flex items-center gap-2 text-xs uppercase tracking-[0.15em] bg-white border border-black px-5 py-3 hover:bg-black hover:text-white transition-all duration-300 ease-in-out text-black font-bold"
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> Volver
        </button>
      </div>

      {/* ── Main 2-Column Layout ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0 min-h-screen">
        {/* ═══ LEFT: Image Gallery ═══ */}
        <div className="md:h-screen md:sticky md:top-0 overflow-hidden bg-gray-50">
          {/* Mobile: Horizontal scroll gallery */}
          <div className="md:hidden">
            <div className="relative aspect-3/4 w-full">
              <NextImage
                src={product.gallery?.[activeImageIndex] || product.img}
                alt={product.name}
                fill
                priority
                className="object-cover w-full h-full"
                sizes="100vw"
              />

              {/* Image dots indicator (Square) */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {product.gallery.map((_: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`w-2 h-2 transition-all duration-300 ${
                        i === activeImageIndex ? "bg-black w-6" : "bg-white/50"
                      }`}
                      aria-label={`View image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop: Vertical scrolling gallery */}
          <div className="hidden md:block h-screen overflow-y-auto scrollbar-hide">
            <div className="flex flex-col">
              {product.gallery?.map((img: string, i: number) => (
                <div key={i} className="relative w-full h-screen">
                  <NextImage
                    src={img}
                    alt={`${product.name} — View ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="50vw"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ RIGHT: Product Information ═══ */}
        <div className="px-6 py-10 md:px-16 md:py-0 md:h-screen md:flex md:flex-col md:justify-center md:sticky md:top-0 bg-white">
          <div className="max-w-lg mx-auto md:mx-0 w-full">
            {/* ── Collection Label ── */}
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-6">
              Nueva Colección
            </p>

            {/* ── Product Title (Serif, Large) ── */}
            <h1 className="font-serif text-4xl md:text-5xl text-black mb-4 text-balance leading-tight tracking-tight">
              {product.name}
            </h1>

            {/* ── Price ── */}
            <p className="text-xl md:text-2xl font-medium text-black mb-10">
              {product.price}
            </p>

            {/* ── Description ── */}
            <div className="mb-10 space-y-6">
              <p className="text-sm leading-relaxed text-gray-800 font-sans">
                {product.story || product.description}
              </p>

              {/* Stylist Note — accent border */}
              {product.stylistNote && (
                <div className="p-5 border border-black bg-gray-50 text-xs text-black">
                  <span className="font-bold block mb-2 uppercase tracking-[0.15em]">
                    Nota de la Estilista:
                  </span>
                  <span className="italic">
                    {"\u201C"}
                    {product.stylistNote}
                    {"\u201D"}
                  </span>
                </div>
              )}
            </div>

            {/* ── Size Selector ── */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-black">
                  Talla
                </span>
                <button
                  onClick={() => setShowRealWomen(!showRealWomen)}
                  className="text-[10px] uppercase tracking-[0.15em] text-gray-500 hover:text-black flex items-center gap-1 transition-all duration-300 ease-in-out"
                >
                  ¿Dudas con tu talla?{" "}
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${showRealWomen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {/* Real Women Fit Guide */}
              {showRealWomen && product.realWomen && (
                <div className="mb-6 bg-gray-50 border border-black p-5 animate-fade-in-up">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-4 text-center text-gray-500">
                    Referencias Reales
                  </p>
                  <div className="space-y-4">
                    {product.realWomen.map(
                      (
                        women: { name: string; height: string; note: string },
                        i: number,
                      ) => (
                        <div
                          key={i}
                          className="flex gap-4 items-start text-xs border-b border-gray-200 last:border-0 pb-3 last:pb-0"
                        >
                          <div className="w-8 h-8 bg-black shrink-0" />
                          <div>
                            <span className="font-bold text-black">
                              {women.name}
                            </span>{" "}
                            <span className="text-gray-500">
                              | {women.height}
                            </span>
                            <p className="text-gray-600 mt-1">{women.note}</p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Size Buttons — Minimal style */}
              <div className="grid grid-cols-5 gap-0 border border-black">
                {availableSizes.map((size, idx) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 flex items-center justify-center text-xs font-bold transition-all duration-200
                      ${
                        idx !== availableSizes.length - 1
                          ? "border-r border-black"
                          : ""
                      }
                      ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-white text-black hover:bg-gray-100"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Size Selection Hint */}
              {!selectedSize && (
                <p className="text-[10px] text-red-500 mt-2 uppercase tracking-widest font-medium">
                  * Selecciona tu talla
                </p>
              )}
            </div>

            {/* ── Action Buttons ── */}
            <div className="flex gap-0 mb-12">
              {/* Primary CTA — Add to Bag */}
              <button
                disabled={product.isSoldOut || !selectedSize}
                onClick={handleAddToCart}
                className={`flex-1 py-5 font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 ease-in-out flex items-center justify-center gap-3 border border-black
                  ${
                    product.isSoldOut
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                      : !selectedSize
                        ? "bg-white text-gray-300 cursor-not-allowed border-gray-200"
                        : isAdding
                          ? "bg-black text-white"
                          : "bg-black text-white hover:bg-white hover:text-black"
                  }`}
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
                {product.isSoldOut
                  ? "Agotado"
                  : isAdding
                    ? "¡Añadido!"
                    : "Añadir a la Bolsa"}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => {
                  const priceStr = product.price?.replace(/[^\d.]/g, "") || "0";
                  toggleWishlistItem({
                    id: String(product.id || productId),
                    name: product.name,
                    price: parseFloat(priceStr),
                    image: product.img || product.gallery?.[0] || "",
                  });
                }}
                className={`w-16 flex items-center justify-center border-y border-r border-black transition-all duration-300 ease-in-out hover:bg-gray-50 ${
                  isInWishlist(String(product.id || productId))
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
                aria-label={
                  isInWishlist(String(product.id || productId))
                    ? "Quitar de favoritos"
                    : "A\u00f1adir a favoritos"
                }
              >
                <Heart
                  size={20}
                  strokeWidth={1}
                  className={`transition-colors duration-300 ${
                    isInWishlist(String(product.id || productId))
                      ? "text-white fill-white"
                      : "text-black hover:text-gray-500"
                  }`}
                />
              </button>
            </div>

            {/* ── Cross-Sell (Complete the Look) ── */}
            {product.crossSell && (
              <div className="pt-8 border-t border-black">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6 text-black">
                  Completa el Look
                </p>
                <div className="flex gap-0 items-center bg-white border border-black p-0 group hover:bg-gray-50 transition-all duration-300 ease-in-out cursor-pointer">
                  <div className="w-24 h-24 bg-gray-50 overflow-hidden relative shrink-0 border-r border-black">
                    <NextImage
                      src={product.crossSell.img}
                      alt={product.crossSell.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div className="flex-1 min-w-0 px-6 py-4">
                    <p className="font-serif text-black text-lg tracking-tight">
                      {product.crossSell.name}
                    </p>
                    <p className="text-[10px] text-gray-500 line-clamp-1 mt-1 uppercase tracking-wider">
                      {product.crossSell.description}
                    </p>
                    <p className="text-sm font-bold text-black mt-2">
                      {product.crossSell.price}
                    </p>
                  </div>
                  <div className="h-24 w-16 border-l border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 ease-in-out shrink-0">
                    <Plus size={20} strokeWidth={1} />
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
