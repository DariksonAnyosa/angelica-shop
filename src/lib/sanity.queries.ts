import { groq } from "next-sanity";
import { client } from "./sanity";

export const PRODUCTS_QUERY = groq`*[_type == "product" && !(_id in path("drafts.**"))] {
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

export const HOME_CONFIG_QUERY = groq`*[_type == "homeConfig"][0] {
  heroTitle,
  heroAnnouncement,
  "heroCommonImage": heroCommonImage.asset->url,
  "heroMobileImage": heroMobileImage.asset->url,
  heroButtonText,
  heroLink
}`;

export async function getProducts() {
  return client.fetch(PRODUCTS_QUERY);
}

export async function getHomeConfig() {
  return client.fetch(HOME_CONFIG_QUERY);
}
