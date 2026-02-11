"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import HeroDynamic from '@/features/home/HeroDynamic';
import ThreeColumnBanner from '@/features/home/ThreeColumnBanner';
import TrendCarousel from '@/features/home/TrendCarousel';
import SaleGrid from '@/features/home/SaleGrid';
import CollectionView from '@/features/collection/CollectionView';
import ProductDetail from '@/features/product/ProductDetail';

export default function AngelicaShop() {
  const [currentView, setCurrentView] = useState('HOME');
  const [selectedProductId, setSelectedProductId] = useState<number | string | null>(null);

  // CMS Data State
  const [products, setProducts] = useState<any[]>([]);

  // Fetch Products on Mount
  useEffect(() => {
    import('@/lib/sanity.queries').then(({ getProducts }) => {
      getProducts().then((data) => {
        console.log("Sanity Fetch Result:", data);
        if (data) setProducts(data);
      }).catch(err => console.error("Sanity Fetch Error:", err));
    });
  }, []);

  // Helper to open a product
  const handleProductSelect = (id: number | string) => {
    setSelectedProductId(id);
    setCurrentView('PRODUCT');
  };

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="bg-[#FDFBF7] min-h-screen font-sans selection:bg-[#C19A6B] selection:text-white overflow-x-hidden text-[#4A3B32]">

      {/* Navegación Principal */}
      <Navbar onViewChange={setCurrentView} currentView={currentView} />

      {/* RUTEO SIMPLE */}
      {currentView === 'HOME' ? (
        <>
          <HeroDynamic
            onExplore={() => setCurrentView('COLLECTION')}
            onViewChange={setCurrentView}
          />

          {/* NEW: Three Column Banner (Editorial Sale) */}
          <ThreeColumnBanner onSelect={(id) => setCurrentView('COLLECTION')} />

          {/* Pass cmsProducts to TrendCarousel */}
          <TrendCarousel
            onSelectProduct={handleProductSelect}
            products={products}
          />

          {/* Sale Grid Section receiving CMS products */}
          <SaleGrid
            onSelectProduct={handleProductSelect}
            products={products}
          />
        </>
      ) : currentView === 'COLLECTION' ? (
        // Pass CMS products to CollectionView
        <CollectionView
          onProductSelect={handleProductSelect}
          products={products}
        />
      ) : (
        // Pass CMS products to ProductDetail for "Find" logic
        <ProductDetail
          productId={selectedProductId}
          onBack={() => setCurrentView('COLLECTION')}
          products={products}
        />
      )}

      {currentView !== 'PRODUCT' && <Footer />}
    </div>
  );
}
