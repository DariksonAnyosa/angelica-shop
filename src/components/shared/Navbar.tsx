"use client";
import React, { useState, useEffect, useSyncExternalStore } from "react";
import { Search, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

type SubCategory = {
  name: string;
  slug: string;
};

type Category = {
  name: string;
  slug: string;
  subcategories: SubCategory[];
};

const SHOP_CATEGORIES: Category[] = [
  {
    name: "NUEVO INGRESO",
    slug: "nuevo-ingreso",
    subcategories: [
      { name: "Ver Todo", slug: "todo" },
      { name: "Vestidos", slug: "vestidos" },
      { name: "Tops", slug: "tops" },
      { name: "Pantalones", slug: "pantalones" },
    ],
  },
  {
    name: "TENDENCIA",
    slug: "tendencia",
    subcategories: [
      { name: "Abrigos", slug: "abrigos" },
      { name: "Vestidos", slug: "vestidos" },
      { name: "Sets", slug: "sets" },
    ],
  },
  {
    name: "LO MÁS VENDIDO",
    slug: "mas-vendido",
    subcategories: [
      { name: "Ver Todo", slug: "todo" },
      { name: "Best Sellers", slug: "best-sellers" },
    ],
  },
];

interface NavbarProps {
  onViewChange: (view: string) => void;
  currentView: string;
}

export default function Navbar({ onViewChange, currentView }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { toggleCart, cartCount } = useCart();
  const { toggleWishlistDrawer, wishlistCount } = useWishlist();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setOpenDropdown(null);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Determinar estilos basados en scroll y vista
  const isHome = currentView === "HOME";
  const isAtTop = !isScrolled && isHome;

  const bgClass = isAtTop
    ? "bg-transparent border-transparent"
    : "bg-white/95 border-gray-100 backdrop-blur-md shadow-luxe";
  const logoColor = isAtTop ? "text-white" : "text-[#2A2A2A]";
  const iconColor = isAtTop ? "text-white/90" : "text-[#2A2A2A]";

  return (
    <>
      {/* Barra de Navegación Principal */}
      <div
        className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ease-in-out border-b ${bgClass} ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          {/* Izquierda: CATEGORÍAS PRINCIPALES */}
          <div className="flex items-center gap-8">
            {SHOP_CATEGORIES.map((category) => (
              <div
                key={category.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(category.slug)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => onViewChange("COLLECTION")}
                  className={`text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-300 ease-in-out ${
                    isAtTop ? "text-white" : "text-[#2A2A2A]"
                  } hover:opacity-60`}
                >
                  {category.name}
                </button>

                {/* DROPDOWN PEQUEÑO */}
                {openDropdown === category.slug && (
                  <div className="absolute top-full left-0 mt-2 w-[220px] bg-white border border-gray-100 rounded-2xl shadow-luxe-lg z-50 py-3 overflow-hidden">
                    {category.subcategories.map((sub) => (
                      <button
                        key={sub.slug}
                        onClick={() => {
                          onViewChange("COLLECTION");
                          setOpenDropdown(null);
                        }}
                        className="block w-full text-left px-5 py-2.5 text-[12px] tracking-wide text-[#2A2A2A] hover:bg-gray-50 transition-all duration-300 ease-in-out"
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Centro: LOGO */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 font-serif text-lg md:text-xl tracking-[0.25em] font-bold cursor-pointer transition-all duration-300 ease-in-out ${logoColor}`}
            onClick={() => onViewChange("HOME")}
          >
            ANGÉLICA
          </div>

          {/* Derecha: ICONOS */}
          <div
            className={`flex items-center gap-4 transition-all duration-300 ease-in-out ${iconColor}`}
          >
            <Search
              size={18}
              className="cursor-pointer hover:opacity-60 transition-all duration-300 ease-in-out hover:scale-110"
              strokeWidth={1.5}
            />
            <button
              onClick={toggleWishlistDrawer}
              className="relative cursor-pointer hover:opacity-60 transition-all duration-300 ease-in-out hover:scale-110"
              aria-label="Abrir favoritos"
            >
              <Heart size={18} strokeWidth={1.5} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C19A6B] rounded-full shadow-sm animate-fade-in-up" />
              )}
            </button>
            <button
              onClick={toggleCart}
              className="relative cursor-pointer hover:opacity-60 transition-all duration-300 ease-in-out hover:scale-110"
              aria-label="Abrir carrito"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C19A6B] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-fade-in-up shadow-sm">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
