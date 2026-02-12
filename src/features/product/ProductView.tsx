"use client";
import React, { useState } from "react";
import NextImage from "next/image";
import { useCart } from "@/context/CartContext";
import { Plus } from "lucide-react";
import Link from "next/link";
import { SanityProduct } from "@/lib/types";

interface ProductViewProps {
  product: SanityProduct;
  relatedProducts: SanityProduct[];
  youMayAlsoLike: SanityProduct[];
}

export default function ProductView({
  product,
  relatedProducts,
  youMayAlsoLike,
}: ProductViewProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>("S"); // Defaulting to S as requested
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0] || null,
  );

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] ?? "",
      size: selectedSize,
      color: selectedColor || undefined,
      quantity: 1,
    });
    alert("Agregado al carrito"); // Temporary feedback
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Split Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Left: Image Gallery (Scrollable) */}
        <div className="w-full lg:w-1/2 lg:h-screen lg:overflow-y-auto hide-scrollbar">
          <div className="flex flex-col gap-1">
            {(product.images ?? []).map((img: string, index: number) => (
              <div
                key={index}
                className="relative w-full aspect-[3/4] bg-gray-100"
              >
                <NextImage
                  src={img}
                  alt={`${product.name} - ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Details (Sticky) */}
        <div className="w-full lg:w-1/2 lg:h-screen lg:overflow-y-auto">
          <div className="sticky top-0 p-6 md:p-12 lg:p-20 flex flex-col h-full">
            {/* Header Info */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] uppercase tracking-widest text-gray-500">
                  New Arrival
                </span>
                <span className="text-[11px] uppercase tracking-widest text-gray-500">
                  From S/. {product.price}
                </span>
              </div>
              <h1 className="text-3xl md:text-3xl font-normal uppercase tracking-wide text-balance mb-4">
                {product.name}
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                {product.description}
              </p>
            </div>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-3">
                  Color
                </span>
                <div className="flex gap-2">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 rounded-full border border-gray-200 transition-transform ${selectedColor === color ? "ring-1 ring-black ring-offset-2 scale-110" : ""}`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] uppercase tracking-widest text-gray-500">
                  Size
                </span>
                <button className="text-[10px] uppercase tracking-widest text-gray-400 underline hover:text-black">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL"].map((size) => {
                  const isAvailable = size === "S"; // Hardcoded for 'S' availability as requested
                  return (
                    <button
                      key={size}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center text-[11px] border transition-all
                                                ${
                                                  !isAvailable
                                                    ? "text-gray-300 border-gray-100 cursor-not-allowed decoration-slice"
                                                    : selectedSize === size
                                                      ? "border-black bg-black text-white"
                                                      : "border-gray-200 text-black hover:border-black"
                                                }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-16">
              <button
                onClick={handleAddToCart}
                disabled={product.isSoldOut}
                className="w-full bg-black text-white h-12 text-[11px] uppercase tracking-widest hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {product.isSoldOut ? "Sold Out" : "Add to Cart"}{" "}
                <span className="text-[10px]">— S/. {product.price}</span>
              </button>
              <div className="mt-4 text-center">
                <span className="text-[10px] uppercase tracking-widest text-gray-500">
                  Free shipping on orders over S/. 300
                </span>
              </div>
            </div>

            {/* Related Products: "Combina bien con" */}
            {relatedProducts.length > 0 && (
              <div className="mt-auto pt-10 border-t border-gray-100">
                <h3 className="text-[11px] uppercase tracking-widest text-gray-900 mb-6 italic font-serif">
                  Pairs well with
                </h3>
                <div className="space-y-4">
                  {relatedProducts.map((rel) => (
                    <Link
                      href={`/product/${rel.slug}`}
                      key={rel._id}
                      className="flex gap-4 group cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <div className="relative w-16 h-20 bg-gray-100 shrink-0">
                        <NextImage
                          src={rel.images?.[0] ?? ""}
                          alt={rel.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-[11px] uppercase tracking-wide text-black mb-1 group-hover:underline decoration-1 underline-offset-4">
                          {rel.name}
                        </h4>
                        <span className="text-[11px] text-gray-500">
                          S/. {rel.price}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* "You May Also Like" Footer Section */}
      <div className="w-full px-6 md:px-12 py-20 border-t border-gray-100">
        <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-10">
          You may also like
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-1">
          {youMayAlsoLike.map((item) => (
            <Link
              href={`/product/${item.slug}`}
              key={item._id}
              className="group cursor-pointer flex flex-col gap-2"
            >
              <div className="relative aspect-[3/4] w-full bg-[#F0F0F0] overflow-hidden">
                <NextImage
                  src={item.images?.[0] ?? ""}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-opacity duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col px-1">
                <div className="flex items-start justify-between w-full mb-1">
                  <h3 className="text-[11px] uppercase tracking-wide font-medium text-black pr-2 leading-tight">
                    {item.name}
                  </h3>
                  <span className="text-[11px] font-medium text-black shrink-0">
                    S/. {item.price}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
