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
    <div className="bg-angelica-bg min-h-screen animate-fade-in-up">
      {/* ── Floating Back Button ── */}
      <div className="fixed top-0 left-0 w-full z-50 p-4 md:p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full shadow-luxe hover:shadow-luxe-lg hover:bg-white transition-all duration-300 ease-in-out text-[#4A3B32] font-medium"
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> Volver
        </button>
      </div>

      {/* ── Main 2-Column Layout ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 min-h-screen">
        {/* ═══ LEFT: Image Gallery ═══ */}
        <div className="md:h-screen md:sticky md:top-0 overflow-hidden">
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

              {/* Image dots indicator */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {product.gallery.map((_: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === activeImageIndex ? "bg-white w-6" : "bg-white/50"
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
        <div className="px-6 py-10 md:px-12 md:py-0 md:h-screen md:flex md:flex-col md:justify-center md:sticky md:top-0">
          <div className="max-w-lg mx-auto md:mx-0 w-full">
            {/* ── Collection Label ── */}
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C19A6B] font-bold mb-4">
              Nueva Colección
            </p>

            {/* ── Product Title (Serif, Large) ── */}
            <h1 className="font-serif text-4xl md:text-5xl text-[#4A3B32] mb-3 text-balance leading-tight tracking-tight">
              {product.name}
            </h1>

            {/* ── Price ── */}
            <p className="text-2xl font-medium text-black mb-8">
              {product.price}
            </p>

            {/* ── Description ── */}
            <div className="mb-8 space-y-4">
              <p className="text-sm leading-relaxed text-gray-600">
                {product.story || product.description}
              </p>

              {/* Stylist Note — accent border */}
              {product.stylistNote && (
                <div className="p-4 bg-white border-l-2 border-[#C19A6B] italic text-xs text-[#4A3B32] rounded-r-xl shadow-luxe">
                  <span className="font-bold not-italic block mb-1 uppercase tracking-[0.15em]">
                    Nota de la Estilista:
                  </span>
                  {"\u201C"}
                  {product.stylistNote}
                  {"\u201D"}
                </div>
              )}
            </div>

            {/* ── Size Selector ── */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#4A3B32]">
                  Talla
                </span>
                <button
                  onClick={() => setShowRealWomen(!showRealWomen)}
                  className="text-[10px] uppercase tracking-[0.15em] text-[#C19A6B] hover:text-[#4A3B32] flex items-center gap-1 transition-all duration-300 ease-in-out"
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
                <div className="mb-6 bg-white p-4 rounded-xl animate-fade-in-up shadow-luxe">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 text-center text-gray-400">
                    Referencias Reales
                  </p>
                  <div className="space-y-3">
                    {product.realWomen.map(
                      (
                        women: { name: string; height: string; note: string },
                        i: number,
                      ) => (
                        <div
                          key={i}
                          className="flex gap-3 items-start text-xs border-b border-gray-100 last:border-0 pb-2 last:pb-0"
                        >
                          <div className="w-8 h-8 rounded-full bg-gray-100 shrink-0" />
                          <div>
                            <span className="font-bold text-[#4A3B32]">
                              {women.name}
                            </span>{" "}
                            <span className="text-gray-400">
                              | {women.height}
                            </span>
                            <p className="text-gray-500 mt-1">{women.note}</p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Size Buttons — Minimal style */}
              <div className="grid grid-cols-5 gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 flex items-center justify-center border text-xs font-medium rounded-md transition-all duration-300 ease-in-out
                      ${
                        selectedSize === size
                          ? "border-[#4A3B32] bg-[#4A3B32] text-white shadow-luxe"
                          : "border-gray-200 text-gray-500 hover:border-black hover:text-black"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Size Selection Hint */}
              {!selectedSize && (
                <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">
                  Selecciona tu talla
                </p>
              )}
            </div>

            {/* ── Action Buttons ── */}
            <div className="flex gap-3 mb-10">
              {/* Primary CTA — Add to Bag */}
              <button
                disabled={product.isSoldOut || !selectedSize}
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-full font-medium text-sm uppercase tracking-[0.2em] transition-all duration-300 ease-in-out flex items-center justify-center gap-2.5
                  ${
                    product.isSoldOut
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : !selectedSize
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : isAdding
                          ? "bg-[#C19A6B] text-white scale-95"
                          : "bg-[#4A3B32] text-white hover:bg-[#C19A6B] hover:scale-[1.02] shadow-luxe hover:shadow-luxe-lg active:scale-95"
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
                className={`w-14 flex items-center justify-center border rounded-full transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 ${
                  isInWishlist(String(product.id || productId))
                    ? "border-[#C19A6B] bg-[#C19A6B]/10"
                    : "border-gray-200 hover:border-red-300"
                }`}
                aria-label={
                  isInWishlist(String(product.id || productId))
                    ? "Quitar de favoritos"
                    : "A\u00f1adir a favoritos"
                }
              >
                <Heart
                  size={18}
                  strokeWidth={1.5}
                  className={`transition-colors duration-300 ${
                    isInWishlist(String(product.id || productId))
                      ? "text-[#C19A6B] fill-[#C19A6B]"
                      : "text-gray-400 hover:text-red-400"
                  }`}
                />
              </button>
            </div>

            {/* ── Cross-Sell (Complete the Look) ── */}
            {product.crossSell && (
              <div className="pt-8 border-t border-gray-100">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-[#C19A6B]">
                  Completa el Look
                </p>
                <div className="flex gap-4 items-center bg-white p-3 rounded-2xl group hover:shadow-luxe-lg transition-all duration-300 ease-in-out cursor-pointer shadow-luxe">
                  <div className="w-16 h-16 bg-gray-50 overflow-hidden rounded-xl relative shrink-0">
                    <NextImage
                      src={product.crossSell.img}
                      alt={product.crossSell.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-[#4A3B32] text-sm">
                      {product.crossSell.name}
                    </p>
                    <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">
                      {product.crossSell.description}
                    </p>
                    <p className="text-xs font-medium text-black mt-1">
                      {product.crossSell.price}
                    </p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-[#4A3B32] text-white flex items-center justify-center hover:bg-[#C19A6B] transition-all duration-300 ease-in-out shadow-luxe hover:scale-110 shrink-0">
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
