import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ALL_PRODUCTS, CATEGORIES } from '../data/products';
import {
  Star,
  ShoppingBag,
  SlidersHorizontal,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2
} from 'lucide-react';

export default function ProductCatalog() {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setQuickViewProduct,
    addStandardProductToCart
  } = useStore();

  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'low-high' | 'high-low' | 'rating'

  // Filter & Search
  let filtered = ALL_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort
  if (sortBy === 'low-high') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'high-low') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  const handleProductCardClick = (product) => {
    setQuickViewProduct(product);
  };

  return (
    <section id="products-catalog" className="py-12 sm:py-16 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Filter Pills (E-commerce Style) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 border ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-900/40'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Filter Toolbar: Active Count + Sort dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold text-white">
              Showing <span className="text-red-400 font-black">{filtered.length}</span> Products
            </span>
            {searchQuery && (
              <span className="text-slate-400">
                matching "<strong className="text-blue-400">{searchQuery}</strong>"
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-2 text-red-400 hover:underline"
                >
                  Clear
                </button>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-semibold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-hidden focus:border-blue-500"
            >
              <option value="featured">Featured Fresh</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* STANDARD PRODUCT GRID */}
        {filtered.length === 0 ? (
          <div className="bg-slate-950 rounded-3xl p-12 text-center border border-slate-800 space-y-3">
            <div className="text-4xl">🔍</div>
            <h3 className="text-lg font-bold text-white">No products found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find items matching your search. Try resetting filters or browsing all departments.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const isBroiler = product.isBroiler;
              const isLivestock = product.isLivestock;

              return (
                <div
                  key={product.id}
                  className="group bg-slate-950 rounded-3xl border border-slate-800 hover:border-blue-600/60 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
                >
                  {/* Card Media Header */}
                  <div>
                    <div
                      onClick={() => handleProductCardClick(product)}
                      className="relative h-52 bg-slate-900 overflow-hidden cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-md ${
                            product.badgeColor || 'bg-red-600'
                          }`}
                        >
                          {product.badge}
                        </span>
                      </div>

                      {product.originalPrice && (
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-950 text-blue-400 border border-blue-800 shadow-md">
                            Save ₦{(product.originalPrice - product.price).toLocaleString()}
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300">
                        <span className="font-semibold text-blue-400 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                          {product.unit}
                        </span>
                        <div className="flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded text-amber-400 font-bold border border-white/10">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{product.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-4 sm:p-5 space-y-2.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {product.categoryName}
                      </div>

                      <h3
                        onClick={() => handleProductCardClick(product)}
                        className="font-bold text-white text-sm sm:text-base leading-snug group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {product.shortDesc}
                      </p>

                      {/* Price Section */}
                      <div className="pt-2 flex items-baseline gap-2">
                        <span className="text-lg sm:text-xl font-black text-white">
                          ₦{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs font-semibold text-slate-500 line-through">
                            ₦{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                        {isBroiler && (
                          <span className="text-[10px] text-red-400 font-bold">(from 1.8kg)</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Button */}
                  <div className="p-4 sm:p-5 pt-0">
                    {product.isCustomizable ? (
                      <button
                        type="button"
                        onClick={() => handleProductCardClick(product)}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-red-950/40"
                      >
                        <span>{isBroiler ? 'Configure Weight & Cuts' : 'Select Size & Dressing'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => addStandardProductToCart(product)}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-red-600 text-slate-200 hover:text-white border border-slate-800 hover:border-red-600 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add To Basket</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* E-COMMERCE SERVICE PROMISES BANNER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950 text-red-400 flex items-center justify-center shrink-0 border border-red-800">
              <Truck className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-white">Temperature Controlled Vans</div>
              <div className="text-slate-400">Direct delivery across Lagos, Ogun & Ibadan</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 flex items-center justify-center shrink-0 border border-blue-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-white">100% Bio-Secure & Halal</div>
              <div className="text-slate-400">Strictly inspected livestock & poultry</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950 text-red-400 flex items-center justify-center shrink-0 border border-red-800">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-white">Paystack & Flutterwave</div>
              <div className="text-slate-400">256-bit encrypted cards, USSD & transfer</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
