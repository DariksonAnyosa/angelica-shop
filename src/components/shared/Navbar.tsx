"use client";
import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag } from 'lucide-react';

type SubCategory = {
    name: string;
    slug: string;
}

type Category = {
    name: string;
    slug: string;
    subcategories: SubCategory[];
}

const SHOP_CATEGORIES: Category[] = [
    {
        name: 'NUEVO INGRESO',
        slug: 'nuevo-ingreso',
        subcategories: [
            { name: 'Ver Todo', slug: 'todo' },
            { name: 'Vestidos', slug: 'vestidos' },
            { name: 'Tops', slug: 'tops' },
            { name: 'Pantalones', slug: 'pantalones' },
        ]
    },
    {
        name: 'TENDENCIA',
        slug: 'tendencia',
        subcategories: [
            { name: 'Abrigos', slug: 'abrigos' },
            { name: 'Vestidos', slug: 'vestidos' },
            { name: 'Sets', slug: 'sets' },
        ]
    },
    {
        name: 'LO MÁS VENDIDO',
        slug: 'mas-vendido',
        subcategories: [
            { name: 'Ver Todo', slug: 'todo' },
            { name: 'Best Sellers', slug: 'best-sellers' },
        ]
    }
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

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Determinar estilos basados en scroll y vista
    const isHome = currentView === 'HOME';
    const isAtTop = !isScrolled && isHome;
    
    const bgClass = isAtTop ? 'bg-transparent border-transparent' : 'bg-white/95 border-gray-200 backdrop-blur-sm';
    const logoColor = isAtTop ? 'text-white' : 'text-[#2A2A2A]';
    const iconColor = isAtTop ? 'text-white/90' : 'text-[#2A2A2A]';

    return (
        <>
            {/* Barra de Navegación Principal */}
            <div className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${bgClass} ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}>
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
                                    onClick={() => onViewChange('COLLECTION')}
                                    className={`text-[11px] uppercase tracking-wide font-medium transition-opacity ${
                                        isAtTop ? 'text-white' : 'text-[#2A2A2A]'
                                    } hover:opacity-60`}
                                >
                                    {category.name}
                                </button>

                                {/* DROPDOWN PEQUEÑO */}
                                {openDropdown === category.slug && (
                                    <div className="absolute top-full left-0 mt-2 w-[220px] bg-white border border-gray-200 shadow-lg z-50 py-3">
                                        {category.subcategories.map((sub) => (
                                            <button
                                                key={sub.slug}
                                                onClick={() => {
                                                    onViewChange('COLLECTION');
                                                    setOpenDropdown(null);
                                                }}
                                                className="block w-full text-left px-5 py-2.5 text-[12px] text-[#2A2A2A] hover:bg-gray-50 transition-colors"
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
                        className={`absolute left-1/2 -translate-x-1/2 font-serif text-lg md:text-xl tracking-[0.2em] font-bold cursor-pointer transition-colors ${logoColor}`}
                        onClick={() => onViewChange('HOME')}
                    >
                        ANGÉLICA
                    </div>

                    {/* Derecha: ICONOS */}
                    <div className={`flex items-center gap-4 transition-colors ${iconColor}`}>
                        <Search size={18} className="cursor-pointer hover:opacity-60 transition-opacity" strokeWidth={1.5} />
                        <Heart size={18} className="cursor-pointer hover:opacity-60 transition-opacity" strokeWidth={1.5} />
                        <ShoppingBag size={18} className="cursor-pointer hover:opacity-60 transition-opacity" strokeWidth={1.5} />
                    </div>
                </div>
            </div>
        </>
    );
}
