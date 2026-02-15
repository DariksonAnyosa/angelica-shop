"use client";
import React, { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Heart,
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { AnimatePresence, motion } from "framer-motion";

// ── 1. Data Structure ─────────────────────────────────────────

type NavSubItem = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
  image: string;
  children?: NavSubItem[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "WOMEN",
    href: "/women",
    image:
      "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?q=80&w=600",
    children: [
      { label: "New Arrivals", href: "/women/new" },
      { label: "Dresses", href: "/women/dresses" },
      { label: "Tops & Shirts", href: "/women/tops" },
      { label: "Pants & Skirts", href: "/women/pants" },
      { label: "Knitwear", href: "/women/knitwear" },
    ],
  },
  {
    label: "MEN",
    href: "/men",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600",
    children: [
      { label: "New Arrivals", href: "/men/new" },
      { label: "Sweaters", href: "/men/sweaters" },
      { label: "Cardigans", href: "/men/cardigans" },
      { label: "Trousers", href: "/men/trousers" },
    ],
  },
  {
    label: "ACCESSORIES",
    href: "/accessories",
    image:
      "https://images.unsplash.com/photo-1517448931760-7052594a974b?q=80&w=600",
    children: [
      { label: "Scarves", href: "/accessories/scarves" },
      { label: "Hats", href: "/accessories/hats" },
      { label: "Gloves", href: "/accessories/gloves" },
      { label: "Socks", href: "/accessories/socks" },
    ],
  },
  {
    label: "ABOUT",
    href: "/about",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600",
  },
];

// Hydration helper
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

interface NavbarProps {
  onViewChange?: (view: string) => void;
  currentView?: string;
}

export default function Navbar({
  onViewChange = () => {},
  currentView = "HOME",
}: NavbarProps) {
  // ── 2. State Logic ──────────────────────────────────────────
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Mobile Stack: Array of NavItems. Empty = Root.
  const [menuStack, setMenuStack] = useState<NavItem[]>([]);

  // Smart Scroll Logic
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

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
      const isScrollingDown = currentScrollY > lastScrollY;
      const isAtTop = currentScrollY < 10;

      setIsScrolled(!isAtTop);

      // Height of navbar approx 60px.
      // Hide when scrolling down & not at top. Show when scrolling up.
      if (isScrollingDown && currentScrollY > 60 && !isMobileOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobileOpen]);

  // Helpers
  const currentStackItem =
    menuStack.length > 0 ? menuStack[menuStack.length - 1] : null;

  const handleMobilePush = (item: NavItem) => {
    if (item.children && item.children.length > 0) {
      setMenuStack([...menuStack, item]);
    } else {
      // Navigate to link
      setIsMobileOpen(false);
      setMenuStack([]);
      // In a real app: router.push(item.href)
      if (onViewChange) onViewChange("COLLECTION");
    }
  };

  const handleMobilePop = () => {
    setMenuStack(menuStack.slice(0, -1));
  };

  const handleClose = () => {
    setIsMobileOpen(false);
    setMenuStack([]);
    setHoveredCategory(null);
  };

  const handleOpen = () => {
    setIsMobileOpen(true);
    setIsVisible(true); // Ensure visible when opening
  };

  // Determine appearance classes
  // If at top && !hovered && !mobileOpen -> Transparent, Text White (assuming hero is dark/image) or Black?
  // User said: "Textos negros (o blancos si está transparente sobre el hero)"
  // Let's assume Hero is dark -> Text White at Top.
  // Else (Scrolled Up or Hovered or Mobile) -> White BG, Text Black.

  const isTransparent =
    !isScrolled && hoveredCategory === null && !isMobileOpen;
  const isHome = currentView === "HOME";

  // If we are NOT on home, usually we want black text always?
  // Let's stick to the rule: Top = Transparent context.
  // If user scrolls down/up -> White BG -> Black Text.

  const headerBg = isTransparent
    ? "bg-transparent border-transparent"
    : "bg-white border-b border-gray-100 shadow-sm";

  const textColor = isTransparent && isHome ? "text-white" : "text-black";

  // When Mobile Open -> Always White BG, Black Text (Fixed overlay handles bg)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${headerBg} ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-3 flex items-center justify-between">
          {/* 1. Left: Links (Desktop) or "Menu" (Mobile) */}
          <div className="flex-1 flex items-center">
            {/* Mobile Trigger */}
            <button
              onClick={handleOpen}
              className={`md:hidden text-xs uppercase tracking-[0.2em] font-medium leading-none ${textColor}`}
            >
              Menu
            </button>

            {/* Desktop Navigation */}
            <nav className={`hidden md:flex gap-8 ${textColor}`}>
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setHoveredCategory(item.label)}
                >
                  <Link
                    href={item.href}
                    className={`text-xs uppercase tracking-[0.2em] font-medium hover:opacity-70 transition-opacity pb-1 border-b border-transparent hover:border-current`}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* 2. Center: Logo */}
          <div className="flex-1 flex justify-center">
            <button
              onClick={() => {
                if (onViewChange) onViewChange("HOME");
                handleClose();
              }}
              className={`font-serif text-2xl tracking-[0.2em] font-bold ${textColor}`}
            >
              ANGÉLICA
            </button>
          </div>

          {/* 3. Right: Icons */}
          <div className={`flex-1 flex justify-end gap-5 ${textColor}`}>
            <button
              aria-label="Search"
              className="hover:opacity-60 transition-opacity"
            >
              <Search size={18} strokeWidth={1} />
            </button>
            <button
              onClick={toggleWishlistDrawer}
              className="relative hover:opacity-60 transition-opacity"
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-current rounded-none" />
              )}
            </button>
            <button
              onClick={toggleCart}
              className="relative hover:opacity-60 transition-opacity"
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-current rounded-none" />
              )}
            </button>
          </div>
        </div>

        {/* ── Desktop Mega Menu ── */}
        <AnimatePresence>
          {hoveredCategory && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-sm hidden md:block text-black"
              onMouseEnter={() => setHoveredCategory(hoveredCategory)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {NAV_ITEMS.map((item) => {
                if (item.label !== hoveredCategory) return null;
                return (
                  <div
                    key={item.label}
                    className="max-w-[1920px] mx-auto grid grid-cols-12 min-h-[400px]"
                  >
                    {/* Left Column: Subcategories */}
                    <div className="col-span-3 px-12 py-12 border-r border-gray-100">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">
                        Expore {item.label}
                      </p>
                      <ul className="space-y-4">
                        {item.children?.map((sub) => (
                          <li key={sub.label}>
                            <Link
                              href={sub.href}
                              className="text-sm font-medium hover:underline underline-offset-4 decoration-1 uppercase tracking-wider block"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href={item.href}
                            className="text-sm font-bold mt-4 block uppercase tracking-wider hover:underline underline-offset-4"
                          >
                            View All
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Right Column: Featured Image */}
                    <div className="col-span-9 relative bg-gray-50">
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute bottom-8 left-8 text-white">
                        <p className="font-serif text-3xl tracking-wide">
                          {item.label} Collection
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile Full Screen Menu ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col text-black"
          >
            {/* Mobile Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 h-[60px] shrink-0">
              {/* Left Button */}
              <div className="flex-1 flex justify-start">
                {menuStack.length > 0 ? (
                  <button
                    onClick={handleMobilePop}
                    className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] font-bold"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                ) : (
                  <button
                    onClick={handleClose}
                    className="text-xs uppercase tracking-[0.2em] font-bold"
                  >
                    Close
                  </button>
                )}
              </div>

              {/* Center Logo */}
              <div className="flex-1 flex justify-center">
                <span className="font-serif text-xl tracking-[0.2em] font-bold">
                  ANGÉLICA
                </span>
              </div>

              {/* Right Icons */}
              <div className="flex-1 flex justify-end gap-5">
                <Search size={18} strokeWidth={1} />
                <ShoppingBag size={18} strokeWidth={1} />
              </div>
            </div>

            {/* Mobile Body */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-8 flex flex-col gap-6">
                {(currentStackItem
                  ? currentStackItem.children || []
                  : NAV_ITEMS
                ).map((item: any) => (
                  <button
                    key={item.label}
                    onClick={() =>
                      currentStackItem ? null : handleMobilePush(item)
                    }
                    className="flex items-center justify-between w-full text-left group"
                  >
                    <span className="text-2xl font-light tracking-wide uppercase group-hover:opacity-60 transition-opacity">
                      {item.label}
                    </span>
                    {/* Show arrow only if it's a parent category (not in stack) */}
                    {!currentStackItem && item.children && (
                      <ChevronRight size={18} className="text-gray-300" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Footer used for Image */}
            <div className="h-[35vh] relative shrink-0 bg-gray-100 mt-auto">
              <Image
                src={
                  currentStackItem?.image || NAV_ITEMS[0].image // Default to first item image if root
                }
                alt="Category"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2">
                  Featured
                </p>
                <p className="font-serif text-2xl tracking-wide">
                  {currentStackItem ? currentStackItem.label : "COLLECTIONS"}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
