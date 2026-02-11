
import React from 'react';
import NextImage from 'next/image';
import { client } from '@/lib/sanity';
import { groq } from 'next-sanity';
import { notFound } from 'next/navigation';
import ProductView from '@/features/product/ProductView';

// Re-use the query but filter by slug
const PRODUCT_BY_SLUG_QUERY = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  price,
  description,
  story,
  isSoldOut,
  "images": images[].asset->url,
  "sizes": sizes,
  "colors": colors,
  "relatedProducts": relatedProducts[]->{
    _id,
    name,
    price,
    "slug": slug.current,
    "images": images[].asset->url
  },
  category
}`;

const ALL_PRODUCTS_QUERY = groq`*[_type == "product" && !(_id in path("drafts.**"))] {
  _id,
  name,
  "slug": slug.current,
  price,
  "images": images[].asset->url
}`;

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });
    const allProducts = await client.fetch(ALL_PRODUCTS_QUERY);

    if (!product) {
        notFound();
    }

    // Filter out the current product from "You May Also Like"
    const otherProducts = allProducts.filter((p: any) => p._id !== product._id).slice(0, 4);

    return (
        <ProductView
            product={product}
            relatedProducts={product.relatedProducts || []}
            youMayAlsoLike={otherProducts}
        />
    );
}
