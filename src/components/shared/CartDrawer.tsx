"use client";
import React, { useEffect, useSyncExternalStore } from "react";
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Minus,
  Plus,
  MessageCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import NextImage from "next/image";
import ClientOnly from "@/components/shared/ClientOnly";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

interface CartDrawerProps {
  onViewCollection?: () => void;
}

export default function CartDrawer({ onViewCollection }: CartDrawerProps) {
  const {
    cart,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useCart();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const handleWhatsAppCheckout = () => {
    const itemLines = cart
      .map((item) => `▪️ ${item.quantity}x ${item.name} (Talla: ${item.size})`)
      .join("\n");

    const message = `Hola Angelica Shop! 🌸
Me encantaría confirmar el siguiente pedido:
${itemLines}
💰 Total a Pagar: S/ ${cartTotal.toFixed(2)}
Quedo a la espera de los datos de pago.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/51906005773?text=${encoded}`, "_blank");
  };

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <>
      {/* ── Backdrop Overlay ── */}
      <div
        className={`fixed inset-0 z-200 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleCart}
        aria-hidden="true"
      />

      {/* ── Drawer Panel ── */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] z-201 bg-white shadow-luxe-xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        <div className="flex flex-col h-full">
          {/* ═══ Header ═══ */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-xl tracking-tight text-[#4A3B32]">
                Tu Bolsa
              </h2>
              {mounted && cartCount > 0 && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C19A6B] bg-[#C19A6B]/10 px-2 py-0.5 rounded-full">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </span>
              )}
            </div>
            <button
              onClick={toggleCart}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-300 text-gray-400 hover:text-[#4A3B32]"
              aria-label="Cerrar carrito"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* ═══ Cart Items or Empty State ═══ */}
          <ClientOnly
            fallback={
              <div className="flex-1 flex items-center justify-center">
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  Cargando bolsa…
                </p>
              </div>
            }
          >
            {cart.length === 0 ? (
              /* ── Empty State ── */
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6">
                  <ShoppingBag
                    size={32}
                    strokeWidth={1}
                    className="text-gray-300"
                  />
                </div>
                <h3 className="font-serif text-lg text-[#4A3B32] mb-2">
                  Tu bolsa está vacía
                </h3>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed max-w-[240px]">
                  Descubre piezas únicas diseñadas para ti
                </p>
                <button
                  onClick={() => {
                    toggleCart();
                    onViewCollection?.();
                  }}
                  className="bg-[#4A3B32] text-white px-8 py-3.5 rounded-full text-xs font-medium uppercase tracking-[0.2em] hover:bg-[#C19A6B] transition-all duration-300 ease-in-out hover:scale-105 shadow-luxe flex items-center gap-2"
                >
                  Ver Colección
                  <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              /* ── Items List ── */
              <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4">
                <div className="space-y-0">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.id}-${item.size}-${index}`}
                      className="flex gap-4 py-5 border-b border-gray-50 last:border-0 group animate-fade-in-up"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-gray-50 shrink-0">
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
                            <ShoppingBag
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
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase tracking-widest text-gray-400">
                              Talla: {item.size}
                            </span>
                            {item.color && (
                              <>
                                <span className="text-gray-200">·</span>
                                <span className="text-[10px] uppercase tracking-widest text-gray-400">
                                  {item.color}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Quantity + Price Row */}
                        <div className="flex items-end justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.size, -1)
                              }
                              className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:border-[#4A3B32] hover:text-[#4A3B32] transition-all duration-200 active:scale-90"
                              aria-label="Reducir cantidad"
                            >
                              <Minus size={10} strokeWidth={2} />
                            </button>
                            <span className="w-6 text-center text-xs font-medium text-[#4A3B32] tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.size, 1)
                              }
                              className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:border-[#4A3B32] hover:text-[#4A3B32] transition-all duration-200 active:scale-90"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus size={10} strokeWidth={2} />
                            </button>
                          </div>

                          {/* Price + Delete */}
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-black">
                              S/ {(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                              onClick={() => removeFromCart(item.id, item.size)}
                              className="text-gray-300 hover:text-red-400 transition-colors duration-300 p-1 -mr-1"
                              aria-label={`Eliminar ${item.name}`}
                            >
                              <Trash2 size={14} strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ═══ Footer (fixed at bottom, only when items exist) ═══ */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-5 bg-white">
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium">
                    Subtotal
                  </span>
                  <span className="text-lg font-medium text-[#4A3B32]">
                    S/ {cartTotal.toFixed(2)}
                  </span>
                </div>

                {/* Shipping Note */}
                <p className="text-[10px] text-gray-400 text-center mb-4 uppercase tracking-widest">
                  Envío calculado al finalizar
                </p>

                {/* WhatsApp Checkout Button */}
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-[#4A3B32] text-white py-4 rounded-full font-medium text-sm uppercase tracking-[0.2em] hover:bg-[#C19A6B] transition-all duration-300 ease-in-out hover:scale-[1.02] shadow-luxe hover:shadow-luxe-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} strokeWidth={1.5} />
                  Pedir por WhatsApp
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={toggleCart}
                  className="w-full text-center mt-3 text-[10px] uppercase tracking-[0.15em] text-gray-400 hover:text-[#4A3B32] transition-colors duration-300 py-2"
                >
                  Seguir Comprando
                </button>
              </div>
            )}
          </ClientOnly>
        </div>
      </div>
    </>
  );
}
