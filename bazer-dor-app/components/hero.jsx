'use client';
import Image from 'next/image';

export default function Hero({ onScrollView }) {
  return (
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
            চাল, ডাল, তেল, সবজি, মাছ, মাংস,独立 ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন ও সর্বাধিক দামের পরিবর্তন এক নজরে।
          </p>
          <div className="pt-2 block">
            <button 
              onClick={onScrollView}
              className="bg-[#00a859] text-white font-black px-6 py-3 rounded-xl text-xs tracking-wider hover:opacity-95 transition-opacity inline-block shadow-sm cursor-pointer border-0"
            >
              সব পণ্য দেখুন
            </button>
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
  );
}