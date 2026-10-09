'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBazar } from '@/app/context';
import { Suspense, useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

function NavbarContent() {
  const { categories, user, logout, products } = useBazar();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toBengaliNumber = (num) => {
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).split('').map(digit => {
      const index = englishDigits.indexOf(digit);
      return index !== -1 ? bengaliDigits[index] : digit;
    }).join('');
  };

  const getCatIcon = (slug) => {
    if (slug === 'chal') return '🍚';
    if (slug === 'dal') return '🫘';
    if (slug === 'tel') return '🟫';
    if (slug === 'sobji') return '🟩';
    if (slug === 'mach') return '🐟';
    if (slug === 'mansho') return '🥩';
    if (slug === 'dim-dudh') return '🥚';
    return '🌶️';
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 fixed top-0 left-0 z-50 shadow-sm block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between bg-white">
        <Link href="/" className="flex flex-col justify-center cursor-pointer select-none">
          <span className="text-xl md:text-2xl font-black text-emerald-600 tracking-tight">🛒 বাজার দর</span>
          <span className="text-[10px] text-slate-400 font-bold pl-0.5 mt-0.5">
            মঙ্গলবার, ৯ই সেপ্টেম্বর, ২০২৫
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {categories.map((cat, idx) => {
            const catSlug = cat.slug || cat.name;
            const targetPath = `/category/${catSlug}`;
            const isActive = pathname === targetPath;
            return (
              <Link
                key={idx}
                href={targetPath}
                className={`px-3 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
                  isActive ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="text-xs">{getCatIcon(catSlug)}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3 bg-white relative" ref={menuRef}>
          {user ? (
            <div>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-xs font-black text-slate-700 bg-slate-100 hover:bg-slate-200/80 px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2 transition-colors cursor-pointer"
              >
                {user?.image ? (
                  <div className="w-5 h-5 rounded-full overflow-hidden block relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={user.image} alt={user?.name || "User"} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <span>👤</span>
                )}
                <span>{user?.name || "ব্যবহারকারী"}</span>
                <svg className={`w-3 h-3 text-slate-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex flex-col border-b border-slate-100 pb-2.5">
                    <span className="text-sm font-black text-slate-900 truncate">{user?.name}</span>
                    <span className="text-xs text-slate-400 font-bold truncate mt-0.5">{user?.email}</span>
                  </div>
                  
                  <Link 
                    href="/profile" 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xs font-black text-slate-700 hover:bg-slate-50 p-2 rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <span className="text-sm">👤</span> আমার প্রোফাইল
                  </Link>
                  
                  <button 
                    onClick={() => { setIsMenuOpen(false); logout(); }}
                    className="text-xs font-black text-red-500 hover:bg-red-50 p-2 rounded-xl flex items-center gap-2 text-left transition-colors w-full cursor-pointer border-0"
                  >
                    <span className="text-sm">↪</span> সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/signin" className="text-xs font-black text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl">
                💖 সাইন ইন
              </Link>
              <Link href="/signup" className="bg-emerald-600 text-white text-xs font-black px-4 py-2.5 rounded-xl hover:opacity-90 shadow-sm">
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden w-full bg-slate-50 border-t border-slate-200 overflow-x-auto whitespace-nowrap px-4 py-2 flex gap-2 scrollbar-none">
        {categories.map((cat, idx) => {
          const catSlug = cat.slug || cat.name;
          const targetPath = `/category/${catSlug}`;
          return (
            <Link key={idx} href={targetPath} className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1 ${pathname === targetPath ? 'bg-emerald-600 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>
              <span>{getCatIcon(catSlug)}</span>
              <span>{cat.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="w-full bg-emerald-900 text-white h-8 border-t border-emerald-800 flex items-center overflow-hidden select-none relative z-50">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 font-black text-[11px] uppercase tracking-wide py-1">
          {products.concat(products).concat(products).map((p, idx) => {
            const isUp = idx % 3 === 0;
            const isDown = idx % 3 === 1;
            const bPrice = toBengaliNumber(p.price || 0);
            const bChange = toBengaliNumber(Math.abs(p.priceChange || 0).toFixed(1));
            return (
              <div key={idx} className="flex items-center gap-2 shrink-0">
                <span className="text-sm">{p.emoji || '🍚'}</span>
                <span>{p.name}</span>
                <span className="text-emerald-300 font-bold">{bPrice} টাকা/{p.unit || 'কেজি'}</span>
                {isUp && <span className="text-green-400 flex items-center gap-0.5">▲ {bChange}%</span>}
                {isDown && <span className="text-red-400 flex items-center gap-0.5">▼ -{bChange}%</span>}
                {!isUp && !isDown && <span className="text-slate-400 flex items-center gap-0.5">— ০.০%</span>}
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}

const DynamicNavbarContent = dynamic(() => Promise.resolve(NavbarContent), {
  ssr: false,
});

export default function Navbar() {
  return (
    <Suspense fallback={<div className="w-full h-24 bg-white border-b border-slate-200 fixed top-0 left-0 z-50"></div>}>
      <DynamicNavbarContent />
    </Suspense>
  );
}