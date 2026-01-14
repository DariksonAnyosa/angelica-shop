/**
 * ANGELICA SHOP - Type Definitions
 * Tipos TypeScript para todo el proyecto
 */

// ===== PRODUCTO BASE =====
export interface Product {
  id: number;
  name: string;
  collection: string;
  price: string;
  priceNumber?: number;
  description: string;
  details: string[];
  image: string;
  accessoryImg: string;
  accentColor: AccentColor;
  category?: ProductCategory;
  sizes?: Size[];
  inStock?: boolean;
}

// ===== ITEM DE COLECCIÓN (para Grid) =====
export interface CollectionProduct {
  type: 'product';
  id: number;
  name: string;
  price: string;
  image: string;
  size: 'normal' | 'large';
  tags: string[];
}

export interface CollectionInterlude {
  type: 'interlude';
  id: string;
  content: string;
  title: string;
  image: string;
  size: 'normal' | 'large';
}

export type CollectionItem = CollectionProduct | CollectionInterlude;

// ===== DETALLE DE PRODUCTO (para Scrollytelling) =====
export interface ProductDetail {
  id: number;
  name: string;
  collection: string;
  price: string;
  description: string;
  details: string[];
  image: string;
  accessoryImg: string;
  accentColor: AccentColor;
  // Cinematic fields
  subtitle?: string;
  bg?: string;
  features?: string[];
}

// Colores de acento disponibles
export type AccentColor =
  | 'bg-rose-50'
  | 'bg-stone-50'
  | 'bg-slate-50'
  | 'bg-amber-50'
  | 'bg-emerald-50';

// Categorías de productos
export type ProductCategory =
  | 'vestidos'
  | 'conjuntos'
  | 'tops'
  | 'pantalones'
  | 'accesorios';

// Tallas disponibles
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

// ===== ESTADO DE VISTA =====
export type ViewState = 'collection' | 'detail';

// ===== MODAL =====
export interface ModalProps {
  product: ProductDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

// ===== NAVEGACIÓN =====
export interface NavbarProps {
  onBack?: () => void;
  isDetailView?: boolean;
  cartItemsCount?: number;
}

// ===== COMPONENTES UI =====
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'subtle';
  className?: string;
}

// ===== SECCIONES =====
export interface ScrollyProductProps {
  product: ProductDetail;
  onOpenModal: (product: ProductDetail) => void;
}

export interface ProductCardProps {
  item: CollectionProduct;
  onClick: (item: CollectionProduct) => void;
}

export interface InterludeCardProps {
  item: CollectionInterlude;
}

export interface CollectionGridProps {
  onProductClick: (item: CollectionProduct) => void;
  showHeader?: boolean;
}
