'use client';
import { useBazar } from './context';
import Navbar from '@/components/navbar';
import ProductCard from '@/components/productCard';
import Image from 'next/image';

export default function Home() {
  const { products, loading } = useBazar();

  const handleScroll = (e) => {
    e.preventDefault();
    const target = document.getElementById('সব-পণ্য');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const risers = products.filter(p => ["1", "2", "3", "4", "5", "6"].includes(p.id));
  const fallers = products.filter(p => ["7", "8", "9", "26", "10", "11"].includes(p.id));

  return (
    <div className="bg-[#fcfdfa] min-h-screen text-slate-800">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#f3f7f0] border border-[#e2ebd9] rounded-3xl p-8 sm:p-12 shadow-sm">
          
          <div className="lg:col-span-8 space-y-4 text-left">
            <span className="text-slate-500 text-xs font-bold bg-white/80 border border-slate-200/60 px-3 py-1 rounded-full inline-block">
              মঙ্গলবার, ৯ই সেপ্টেম্বর, ২০২৫
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl leading-relaxed font-semibold mb-2">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন ও সর্বাধিক দামের পরিবর্তন এক নজরে।
            </p>
            <div className="pt-2 block">
              <a 
                href="#সব-পণ্য" 
                onClick={handleScroll}
                className="bg-[#00a859] text-white font-black px-6 py-3 rounded-xl text-xs tracking-wider hover:opacity-95 transition-opacity inline-block shadow-sm cursor-pointer"
              >
                সব পণ্য দেখুন
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center items-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 relative select-none">
              <Image 
                src="/bazar-hero.png" 
                alt="Bazar Basket" 
                fill
                priority
                className="object-contain filter drop-shadow-sm" 
              />
            </div>
          </div>

        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-row items-center gap-4 animate-pulse w-full h-24">
                <div className="w-16 h-16 bg-slate-100 rounded-xl shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                  <div className="h-3 bg-slate-100 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <section>
              <div className="flex items-center gap-2 mb-4 font-black text-xl uppercase tracking-wider text-red-600">
                <span>▲ আজ দাম বেড়েছে</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {risers.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4 font-black text-xl uppercase tracking-wider text-green-600">
                <span>▼ আজ দাম কমেছে</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {fallers.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            <section id="সব-পণ্য">
              <div className="border-b border-slate-200 pb-3 mb-4 flex flex-col items-start">
                <h2 className="text-xl font-black uppercase tracking-wider text-slate-800">সব পণ্য</h2>
                <p className="text-slate-400 text-xs font-black uppercase tracking-wider mt-1">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </>
        )}

      </main>

      <footer className="w-full bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium">
          <div>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</div>
          <div className="text-slate-500 italic">“সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”</div>
        </div>
      </footer>
    </div>
  );
}