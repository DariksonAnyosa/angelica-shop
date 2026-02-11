// Enhanced Interface for "Template" Logic
export interface CollectionItem {
    type: 'product' | 'editorial';
    id: string | number;
    // Basic
    name?: string;
    price?: string;
    img?: string;
    image?: string;  // Para CollectionView
    image2?: string; // Para hover
    colors?: string[]; // Swatches
    sizes?: string[]; // Tallas disponibles
    isNew?: boolean; // Tag NEW
    videoHover?: string;
    tag?: string;
    tagColor?: string;
    size?: 'normal' | 'large' | 'tall';
    // PDP Specific (The "Template" Fields)
    description?: string; // Short desc
    story?: string; // "La Historia"
    stylistNote?: string; // "La Caja Beige"
    gallery?: string[]; // Vertical Gallery
    crossSell?: {
        name: string;
        price: string;
        img: string;
        description: string;
    };
    realWomen?: { name: string; height: string; size: string; note: string }[];
    // Editorial Specific
    content?: string;
    sub?: string;
    bg?: string;
    overlayText?: string;
}

// Magazine Rhythm: 3 Columns
export const COLLECTION_ITEMS: CollectionItem[] = [
    // Fila 1: Productos principales
    {
        type: 'product', id: 101, size: 'normal',
        name: "Cardigan Celeste", price: "189",
        image: "/image-celeste.png",
        image2: "/image-chompa-beig.png",
        img: "/image-celeste.png",
        colors: ["#B8D4E8", "#E8D5C4", "#F5F5DC"],
        sizes: ["XS", "S", "M", "L", "XL"],
        isNew: true,
        videoHover: "/image-chompa-beig.png",
        tag: "Nuevo Ingreso", tagColor: "bg-[#4A3B32] text-white",
        story: "Cardigan suave tejido en algodón premium. Perfecto para días frescos.",
        stylistNote: "Combínalo con jeans blancos para un look casual elegante.",
        gallery: ["/image-celeste.png", "/image-chompa-beig.png"]
    },
    {
        type: 'product', id: 102, size: 'normal',
        name: "Sweater Beige", price: "210",
        image: "/image-chompa-beig.png",
        image2: "/image-celeste.png",
        img: "/image-chompa-beig.png",
        colors: ["#E8D5C4", "#C4A582", "#8B7355"],
        sizes: ["S", "M", "L"],
        isNew: false,
        videoHover: "/image-celeste.png",
        story: "Sweater oversized en tono neutro. Comodidad absoluta.",
        gallery: ["/image-chompa-beig.png"]
    },
    {
        type: 'product', id: 106, size: 'normal',
        name: "Sandalias Doradas", price: "199",
        image: "/image-zandalias.png",
        image2: "/hero.png",
        img: "/image-zandalias.png",
        colors: ["#D4AF37", "#C0C0C0", "#B87333"],
        isNew: true,
        videoHover: "/hero.png",
        story: "Sandalias elegantes con detalles brillantes. Perfectas para cualquier ocasión.",
        stylistNote: "Combínalas con un vestido midi para máximo impacto.",
        gallery: ["/image-zandalias.png"]
    },
    {
        type: 'product', id: 103, size: 'normal',
        name: "Vestido Verde", price: "249",
        image: "/hero.png",
        image2: "/image-celeste.png",
        img: "/hero.png",
        colors: ["#2F5233", "#4A7856", "#6B9B7C"],
        sizes: ["XS", "S", "M", "L", "XL"],
        isNew: false,
        videoHover: "/image-celeste.png",
        story: "Vestido tejido en tono verde bosque. Elegancia natural.",
        gallery: ["/hero.png"]
    },
    {
        type: 'product', id: 104, size: 'normal',
        name: "Cardigan Premium", price: "289",
        image: "/image-celeste.png",
        image2: "/image-zandalias.png",
        img: "/image-celeste.png",
        colors: ["#B8D4E8", "#FFFFFF", "#E0E0E0"],
        sizes: ["M", "L", "XL"],
        isNew: true,
        tag: "Best Seller", tagColor: "bg-red-900/80 text-white",
        story: "Cardigan premium en algodón orgánico. Suavidad incomparable.",
        stylistNote: "Ideal para capas. Úsalo abierto sobre un top básico.",
        gallery: ["/image-celeste.png"]
    },
    {
        type: 'product', id: 105, size: 'normal',
        name: "Top Asimétrico", price: "149",
        image: "/image-chompa-beig.png",
        image2: "/image-celeste.png",
        img: "/image-chompa-beig.png",
        colors: ["#E8D5C4", "#F5E6D3"],
        isNew: false,
        videoHover: "/image-celeste.png",
        story: "Top minimalista con diseño asimétrico. Sofisticación simple.",
        gallery: ["/image-chompa-beig.png"]
    },
    {
        type: 'product', id: 107, size: 'normal',
        name: "Vestido Elegante", price: "239",
        image: "/hero.png",
        image2: "/image-chompa-beig.png",
        img: "/hero.png",
        colors: ["#2F5233", "#1A3A1A"],
        sizes: ["XS", "S", "M", "L"],
        isNew: true,
        videoHover: "/image-chompa-beig.png",
        story: "Vestido midi perfecto para ocasiones especiales.",
        gallery: ["/hero.png"]
    },
    {
        type: 'product', id: 108, size: 'normal',
        name: "Blusa Premium", price: "169",
        image: "/image-celeste.png",
        image2: "/image-zandalias.png",
        img: "/image-celeste.png",
        colors: ["#B8D4E8", "#A5C8DB"],
        sizes: ["S", "M", "L"],
        isNew: false,
        story: "Blusa ligera en tonos suaves. Versatilidad absoluta.",
        gallery: ["/image-celeste.png"]
    },
    {
        type: 'product', id: 109, size: 'normal',
        name: "Sweater Neutral", price: "299",
        image: "/image-chompa-beig.png",
        image2: "/hero.png",
        img: "/image-chompa-beig.png",
        colors: ["#E8D5C4", "#D4C4B0", "#BFA98D"],
        sizes: ["XS", "S", "M", "L", "XL"],
        isNew: true,
        tag: "Best Seller", tagColor: "bg-[#4A3B32] text-white",
        story: "Sweater en tonos tierra. Estilo atemporal.",
        stylistNote: "Perfecto con pantalones de lino.",
        gallery: ["/image-chompa-beig.png"]
    },
    {
        type: 'product', id: 110, size: 'normal',
        name: "Sandalias Elegantes", price: "189",
        image: "/image-zandalias.png",
        image2: "/image-celeste.png",
        img: "/image-zandalias.png",
        colors: ["#D4AF37", "#FFD700"],
        isNew: false,
        videoHover: "/image-celeste.png",
        story: "Sandalias con acabado brillante. El toque final perfecto.",
        gallery: ["/image-zandalias.png"]
    },
    {
        type: 'product', id: 111, size: 'normal',
        name: "Conjunto Verde", price: "319",
        image: "/hero.png",
        image2: "/image-chompa-beig.png",
        img: "/hero.png",
        colors: ["#2F5233", "#4A7856"],
        sizes: ["M", "L", "XL"],
        isNew: true,
        tag: "Nuevo Ingreso", tagColor: "bg-[#4A3B32] text-white",
        story: "Conjunto completo en tejido premium.",
        gallery: ["/hero.png"]
    },
    {
        type: 'product', id: 112, size: 'normal',
        name: "Cardigan Soft", price: "199",
        image: "/image-celeste.png",
        image2: "/image-zandalias.png",
        img: "/image-celeste.png",
        colors: ["#B8D4E8", "#C8E0EC"],
        sizes: ["XS", "S", "M"],
        isNew: false,
        story: "Cardigan ultra suave. Tu nuevo favorito.",
        gallery: ["/image-celeste.png"]
    }
];

// --- AMALFI DRESS DEFAULT (Example of Rich Data) ---
export const PRODUCT_AMALFI = {
    id: 'p-amalfi', // This should match a collection ID if it was in the grid, but serving as backup
    name: "Vestido Midi 'Amalfi'",
    price: "S/ 249",
    story: "Diseñado para esas tardes que se convierten en noches inolvidables. Su corte asimétrico acaricia tu figura sin apretar, dándote esa seguridad de quien sabe que todas las miradas están puestas en ella.",
    stylistNote: "Úsalo con sandalias doradas para una boda de día, o con zapatillas blancas para un brunch de domingo.",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200",
    gallery: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200", // Full body
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200", // Movement (simulated video)
        "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=1200", // Texture zoom
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200" // Lifestyle
    ],
    realWomen: [
        { name: "María", height: "1.60m", size: "S", note: "Usa talla S." },
        { name: "Carla", height: "1.70m", size: "L", note: "Tiene caderas anchas, usa talla L para mayor vuelo." },
        { name: "Ana", height: "1.75m", size: "M", note: "Prefiere talle M por el largo." }
    ],
    crossSell: {
        name: "Mini Bag Cuero",
        price: "S/ 149",
        description: "Este bolso fue diseñado específicamente para el tono de rojo de este vestido.",
        img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=300"
    }
};


// --- HOME V2.0 CMS DATA ---
export const HOME_V2 = {
    hero: {
        type: 'image',
        // User provided image
        mediaUrl: "/hero.png",
        announcement: "Beautifully crafted cashmere for every season.",
        title: "End of Season Sale",
        buttonText: "Shop Now",
        linkTo: "COLLECTION",
        // Vertical Menu Items for the "Editorial" Header
        menuItems: ["Shop", "New Arrivals", "Collections", "About", "Sale"]
    },
    saleCategories: [
        {
            id: 'celeste',
            label: "Sale Cardigans",
            img: "/image-celeste.png",
            linkText: "Shop Now"
        },
        {
            id: 'chompa',
            label: "Sale Sweaters",
            img: "/image-chompa-beig.png",
            linkText: "Shop Now"
        },
        {
            id: 'zandalias',
            label: "Sale Sandals",
            img: "/image-zandalias.png",
            linkText: "Shop Now"
        }
    ],
    vibes: [
        { id: 'romantica', label: "Cita Romántica", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&auto=format&fit=crop" },
        { id: 'office', label: "Office Chic", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop" },
        { id: 'fiesta', label: "Noche de Fiesta", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop" },
        { id: 'relax', label: "Relax con Estilo", img: "https://images.unsplash.com/photo-1545959783-c5b967926189?q=80&w=600&auto=format&fit=crop" }
    ],
    trends: [
        {
            id: 105, name: "Top Asimétrico", price: "S/ 149",
            img: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=600",
            tag: "Trending"
        },
        {
            id: 109, name: "Mono 'Noche'", price: "S/ 299",
            img: "https://images.unsplash.com/photo-1594631252845-d9b502913042?q=80&w=600",
            tag: "Best Seller"
        },
        {
            id: 104, name: "Set Tejido 'Lima'", price: "S/ 289",
            img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600",
            tag: "Pocas Unidades"
        },
        {
            id: 101, name: "Blusa Seda", price: "S/ 189",
            img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=600",
            tag: "Nuevo"
        }
    ],
    trendEdit: {
        tag: "TENDENCIA 2026",
        title: "Old Money Aesthetic",
        text: "No es ostentación, es patrimonio. Prendas clásicas, linos puros y cortes que no necesitan logotipos para demostrar su valor.",
        img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200", // Mood shot: Elegant, classic
        buttonText: "Ver la Selección"
    }
};
