// Shared Product type matching the Sanity CMS schema (sanity.queries.ts)
export interface SanityProduct {
  _id: string;
  name: string;
  slug?: string;
  price: number;
  description?: string;
  story?: string;
  isSoldOut?: boolean;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  relatedProducts?: SanityProduct[];
  category?: string;
}

// Home CMS config type
export interface HomeConfig {
  heroTitle?: string;
  heroAnnouncement?: string;
  heroCommonImage?: string;
  heroMobileImage?: string;
  heroButtonText?: string;
  heroLink?: string;
  // Fallback fields from static HOME_V2.hero data
  mediaUrl?: string;
  title?: string;
  buttonText?: string;
}
