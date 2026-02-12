"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useCart } from "./CartContext";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  isWishlistOpen: boolean;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlistItem: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  moveToCart: (item: WishlistItem, size: string) => void;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlistDrawer: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  // Hydration-safe: lazy initializer reads localStorage on first render only
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("angelica-wishlist");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        console.error("Failed to parse wishlist from localStorage");
      }
    }
    return [];
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { addToCart } = useCart();

  // Persist to localStorage on changes
  useEffect(() => {
    localStorage.setItem("angelica-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = useCallback((item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.some((w) => w.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const toggleWishlistItem = useCallback((item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w.id === item.id);
      if (exists) {
        return prev.filter((w) => w.id !== item.id);
      }
      return [...prev, item];
    });
  }, []);

  const isInWishlist = useCallback(
    (id: string) => wishlist.some((w) => w.id === id),
    [wishlist],
  );

  const moveToCart = useCallback(
    (item: WishlistItem, size: string) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        size,
        quantity: 1,
      });
      removeFromWishlist(item.id);
    },
    [addToCart, removeFromWishlist],
  );

  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);
  const toggleWishlistDrawer = () => setIsWishlistOpen((prev) => !prev);

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isWishlistOpen,
        addToWishlist,
        removeFromWishlist,
        toggleWishlistItem,
        isInWishlist,
        moveToCart,
        openWishlist,
        closeWishlist,
        toggleWishlistDrawer,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
