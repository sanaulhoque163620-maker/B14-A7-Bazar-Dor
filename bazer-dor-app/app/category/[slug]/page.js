'use client';
import { useState, use, Suspense } from 'react';
import { useBazar } from '@/app/context';
import Navbar from '@/components/navbar';
import ProductCard from '@/components/productCard';
import Link from 'next/link';

function CategoryContent({ paramsPromise }) {
  const unwrappedParams = use(paramsPromise);
  const slug = unwrappedParams?.slug;

  const { products, categories, loading } = useBazar();
  const [sortBy, setSortBy] = useState('ডিফল্ট');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentCategory = categories.find(c => (c.slug || c.name) === slug);
  const categoryProducts = products.filter(p => p.category === slug);

  const sortedProducts = [...categoryProducts].sort((a, b) => {
    const priceA = Number(a.price) || 0;
    const priceB = Number(b.price) || 0;
    if (sortBy === 'দাম: কম থেকে বেশি') return priceA - priceB;
    if (sortBy === 'দাম: বেশি থেকে কম') return priceB - priceA;
    return 0;
  });

  const getCatIcon = (categorySlug) => {
    if (categorySlug === 'chal') return '🍚';
    if (categorySlug === 'dal') return '🫘';
    if (categorySlug === 'tel') return '🟫';
    if (categorySlug === 'sobji') return '🟩';
    if (categorySlug === 'mach') return '🐟';
    if (categorySlug === 'mansho') return '🥩';
    if (categorySlug === 'dim-dudh') return '🥚';
    return '🌶️';
  };

  if (loading) {
    return (
      <div className="w-full bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-75 gap-4">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
        <p className="text-slate-400 text-xs font-black uppercase tracking-wider animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!currentCategory || categoryProducts.length === 0) {
    return (
      <div className="w-full bg-white border border-slate-100 rounded-3xl p-16 flex flex-col items-center justify-center text-center min-h-100 gap-6 shadow-sm">
        <div className="text-6xl select-none">🔍</div>
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-wide">কোনো পণ্য পাওয়া যায়নি</h1>
        <Link href="/" className="bg-emerald-600 text-white font-black uppercase px-6 py-3 rounded-xl text-xs tracking-wider shadow-sm">হোম পেজে ফিরে যান</Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm w-full flex flex-row items-center justify-start gap-4 min-h-25 text-left">
        <div className="w-14 h-14 bg-[#f8f9fa] border border-slate-100 rounded-xl flex items-center justify-center text-3xl select-none shrink-0 shadow-sm">
          {getCatIcon(slug)}
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-wide leading-none">{currentCategory.name}</h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-2 leading-none">{categoryProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm w-full flex items-center justify-end gap-3 min-h-16">
        <span className="text-xs font-black text-slate-500 uppercase tracking-wide">সাজান</span>
        <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="bg-slate-50 border border-slate-200 text-xs px-5 py-2 rounded-xl text-slate-700 font-black tracking-wider uppercase flex items-center gap-2 hover:border-slate-300 transition-all cursor-pointer">
            {sortBy}
            <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden p-1 flex flex-col">
              {['ডিফল্ট', 'দাম: কম থেকে বেশি', 'দাম: বেশি থেকে কম'].map((option) => (
                <button key={option} onClick={() => { setSortBy(option); setIsDropdownOpen(false); }} className={`text-left text-xs uppercase tracking-wider font-black px-4 py-2.5 rounded-lg transition-colors cursor-pointer ${sortBy === option ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>{option}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col items-start pl-1">
          <p className="text-slate-400 text-xs font-black uppercase tracking-wider">মোট {categoryProducts.length}টি পণ্য দেখানো হচ্ছে</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {sortedProducts.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </>
  );
}

export default function CategoryPage({ params }) {
  return (
    <div className="bg-[#fcfdfa] min-h-screen text-slate-800 flex flex-col">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 flex-1 w-full flex flex-col gap-6">
        <Suspense fallback={
          <div className="w-full bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-24">
            <span className="loading loading-spinner loading-lg text-emerald-600"></span>
          </div>
        }>
          <CategoryContent paramsPromise={params} />
        </Suspense>
      </main>
    </div>
  );
}