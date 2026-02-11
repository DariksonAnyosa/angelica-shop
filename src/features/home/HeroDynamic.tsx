"use client";
import React, { useEffect, useState } from 'react';
import { HOME_V2 } from '@/lib/data';
import { getHomeConfig } from '@/lib/sanity.queries';

export default function HeroDynamic({ onExplore, onViewChange }: { onExplore: () => void, onViewChange: (view: string) => void }) {
    // 1. Estados para Data CMS
    const [cmsData, setCmsData] = useState<any>(null);

    // 2. Fetch al montar
    useEffect(() => {
        getHomeConfig().then((data) => {
            if (data) setCmsData(data);
        });
    }, []);

    // 3. Merge: Si hay CMS usa CMS, sino usa data local (Fallback)
    const hero = cmsData || HOME_V2.hero;

    // 4. Lógica de Imagen Responsiva
    // Si tenemos una imagen específica para Movil en CMS, la usamos.
    // CSS media query se encargará de mostrar una u otra, o podemos hacer check de window.
    // Para simplificar y rendimiento, usaremos <picture> tag nativo de HTML
    const desktopImg = hero.heroCommonImage || hero.mediaUrl;
    const mobileImg = hero.heroMobileImage || desktopImg; // Fallback a desktop si no hay mobile

    return (
        <section className="relative h-screen w-full overflow-hidden font-sans">

            {/* Background Image con soporte Art Direction (Desktop vs Mobile) */}
            <div className="absolute inset-0 z-0">
                <picture>
                    <source media="(max-width: 768px)" srcSet={mobileImg} />
                    <source media="(min-width: 769px)" srcSet={desktopImg} />
                    <img
                        src={desktopImg}
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                </picture>
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 w-full z-30 px-6 md:px-12 pb-12 md:pb-20">
                <div className="max-w-xl">
                    <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 font-light tracking-wide leading-tight">
                        {hero.heroTitle || hero.title}
                    </h2>

                    <button
                        onClick={onExplore}
                        className="bg-white text-black px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#FDFBF7] transition-transform hover:scale-105 shadow-sm"
                    >
                        {hero.heroButtonText || hero.buttonText}
                    </button>
                </div>
            </div>

        </section>
    );
}
