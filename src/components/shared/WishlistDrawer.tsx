"use client";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import { X, Heart, ShoppingBag, ArrowRight, ChevronDown } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import NextImage from "next/image";
import ClientOnly from "@/components/shared/ClientOnly";

const emptySubscribe = () => () => {};
const returnTrue = () => true;
const returnFalse = () => false;

interface WishlistDrawerProps {
  onViewCollection?: () => void;
}

export default function WishlistDrawer({
  onViewCollection,
}: WishlistDrawerProps) {
  const {
    wishlist,
    isWishlistOpen,
    closeWishlist,
    toggleWishlistDrawer,
    removeFromWishlist,
    moveToCart,
    wishlistCount,
  } = useWishlist();
  const mounted = useSyncExternalStore(emptySubscribe, returnTrue, returnFalse);

  // Track which item has the size selector open
  const [selectingSizeFor, setSelectingSizeFor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("M");

  const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL"];

  // Lock body scroll
  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isWishlistOpen]);

  const handleClose = () => {
    toggleWishlistDrawer();
    setSelectingSizeFor(null);
  };

  const handleMoveToCart = (item: (typeof wishlist)[number]) => {
    moveToCart(item, selectedSize);
    setSelectingSizeFor(null);
    setSelectedSize("M");
  };

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className={`fixed inset-0 z-200 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ${
          isWishlistOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* ── Drawer Panel ── */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] z-201 bg-white shadow-luxe-xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isWishlistOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Lista de deseos"
      >
        <div className="flex flex-col h-full">
          {/* ═══ Header ═══ */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Heart size={18} strokeWidth={1.5} className="text-[#C19A6B]" />
              <h2 className="font-serif text-xl tracking-tight text-[#4A3B32]">
                Tus Favoritos
              </h2>
              {mounted && wishlistCount > 0 && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C19A6B] bg-[#C19A6B]/10 px-2 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </div>
            <button
              onClick={handleClose}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-300 text-gray-400 hover:text-[#4A3B32]"
              aria-label="Cerrar favoritos"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* ═══ Content ═══ */}
          <ClientOnly
            fallback={
              <div className="flex-1 flex items-center justify-center">
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  Cargando favoritos…
                </p>
              </div>
            }
          >
            {wishlist.length === 0 ? (
              /* ── Empty State ── */
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6">
                  <Heart size={32} strokeWidth={1} className="text-gray-300" />
                </div>
                <h3 className="font-serif text-lg text-[#4A3B32] mb-2">
                  Guarda tus favoritos aquí
                </h3>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed max-w-[260px]">
                  Toca el ícono del corazón en cualquier producto para guardarlo
                  en tu lista
                </p>
                <button
                  onClick={() => {
                    closeWishlist();
                    onViewCollection?.();
                  }}
                  className="bg-[#4A3B32] text-white px-8 py-3.5 rounded-full text-xs font-medium uppercase tracking-[0.2em] hover:bg-[#C19A6B] transition-all duration-300 ease-in-out hover:scale-105 shadow-luxe flex items-center gap-2"
                >
                  Explorar Colección
                  <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              /* ── Items List ── */
              <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4">
                <div className="space-y-0">
                  {wishlist.map((item, index) => (
                    <div
                      key={item.id}
                      className="py-5 border-b border-gray-50 last:border-0 animate-fade-in-up"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                          {item.image ? (
                            <NextImage
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <Heart
                                size={20}
                                className="text-gray-300"
                                strokeWidth={1}
                              />
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div>
                            <h4 className="font-serif text-sm text-[#4A3B32] leading-tight line-clamp-2 mb-1">
                              {item.name}
                            </h4>
                            <p className="text-sm font-medium text-black">
                              S/ {item.price.toFixed(2)}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 mt-2">
                            {/* Move to Cart */}
                            <button
                              onClick={() => {
                                if (selectingSizeFor === item.id) {
                                  handleMoveToCart(item);
                                } else {
                                  setSelectingSizeFor(item.id);
                                  setSelectedSize("M");
                                }
                              }}
                              className="text-[10px] uppercase tracking-[0.15em] font-medium text-[#4A3B32] hover:text-[#C19A6B] transition-colors duration-300 flex items-center gap-1"
                            >
                              <ShoppingBag size={12} strokeWidth={1.5} />
                              {selectingSizeFor === item.id
                                ? "Confirmar"
                                : "Mover a la Bolsa"}
                            </button>

                            <span className="text-gray-200">·</span>

                            {/* Remove */}
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="text-[10px] uppercase tracking-[0.15em] text-gray-400 hover:text-red-400 transition-colors duration-300"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* ── Inline Size Selector (expands on "Mover a la Bolsa" click) ── */}
                      {selectingSizeFor === item.id && (
                        <div className="mt-3 animate-fade-in-up">
                          <div className="flex items-center gap-1.5 mb-2">
                            <ChevronDown size={10} className="text-gray-400" />
                            <span className="text-[9px] uppercase tracking-widest text-gray-400">
                              Selecciona talla
                            </span>
                          </div>
                          <div className="flex gap-1.5">
                            {AVAILABLE_SIZES.map((size) => (
                              <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-3 py-1.5 text-[10px] font-medium rounded-md border transition-all duration-200 ${
                                  selectedSize === size
                                    ? "border-[#4A3B32] bg-[#4A3B32] text-white"
                                    : "border-gray-200 text-gray-500 hover:border-black"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ═══ Footer (when items exist) ═══ */}
            {wishlist.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-5 bg-white">
                <p className="text-[10px] text-gray-400 text-center mb-4 uppercase tracking-widest">
                  {wishlistCount}{" "}
                  {wishlistCount === 1
                    ? "favorito guardado"
                    : "favoritos guardados"}
                </p>
                <button
                  onClick={() => {
                    closeWishlist();
                    onViewCollection?.();
                  }}
                  className="w-full bg-[#4A3B32] text-white py-4 rounded-full font-medium text-sm uppercase tracking-[0.2em] hover:bg-[#C19A6B] transition-all duration-300 ease-in-out hover:scale-[1.02] shadow-luxe hover:shadow-luxe-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  Seguir Explorando
                  <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </ClientOnly>
        </div>
      </div>
    </>
  );
}
