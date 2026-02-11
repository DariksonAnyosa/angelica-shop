"use client";
import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-[#FDFBF7] text-[#4A3B32] pt-24 pb-12 border-t border-[#E5E5E5]">
            <div className="max-w-7xl mx-auto px-6 text-center">

                <h2 className="font-serif text-4xl mb-8">ANGÉLICA</h2>

                <div className="flex justify-center gap-8 mb-12 text-xs tracking-widest uppercase font-bold text-gray-500">
                    <a href="#" className="hover:text-[#C19A6B] transition-colors">Instagram</a>
                    <a href="#" className="hover:text-[#C19A6B] transition-colors">WhatsApp</a>
                    <a href="#" className="hover:text-[#C19A6B] transition-colors">Email</a>
                </div>

                <div className="max-w-md mx-auto mb-16">
                    <p className="text-sm text-gray-600 mb-6 italic">"La elegancia es la única belleza que no se marchita."</p>
                    <div className="flex border-b border-[#4A3B32]/20 pb-2">
                        <input type="email" placeholder="Únete al club (Correo)" className="bg-transparent w-full outline-none text-[#4A3B32] placeholder-gray-400 text-sm" />
                        <button className="text-xs font-bold uppercase tracking-widest hover:text-[#C19A6B] transition-colors">Suscribir</button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 uppercase tracking-widest border-t border-[#E5E5E5] pt-8">
                    <p>© 2026 Angélica Shop. Lima, Perú.</p>
                    <div className="flex gap-6">
                        <span>Términos</span>
                        <span>Privacidad</span>
                        <span>Envíos</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
