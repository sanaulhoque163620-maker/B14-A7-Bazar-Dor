'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-[#fcfdfa] min-h-screen text-slate-800 flex flex-col items-center justify-center p-4">
      <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center max-w-md w-full shadow-sm flex flex-col items-center justify-center gap-6">
        <span className="text-7xl select-none">🔍</span>
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-wide mb-2">পেজটি পাওয়া যায়নি</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider max-w-xs mx-auto leading-relaxed">
            দুঃখিত, আপনি যে ঠিকানায় খোঁজার চেষ্টা করছেন তা বর্তমানে আমাদের বাজার দর সিস্টেমে তালিকাভুক্ত নেই।
          </p>
        </div>
        <Link 
          href="/" 
          className="w-full bg-[#00a859] text-white font-black uppercase py-3 rounded-xl text-xs tracking-widest hover:opacity-95 transition-all text-center shadow-sm cursor-pointer block"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}