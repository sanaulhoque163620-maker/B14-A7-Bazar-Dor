'use client';
import { use, useEffect, Suspense } from 'react';
import { useBazar } from '@/app/context';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import toast from 'react-hot-toast';
import Link from 'next/link';

function ProductDetailsContent({ paramsPromise }) {
  const unwrappedParams = use(paramsPromise);
  const slug = unwrappedParams?.slug;

  const { products, user, loading } = useBazar();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      toast.error('পণ্যটির বিস্তারিত দেখতে অনুগ্রহ করে প্রথমে সাইন ইন করুন।');
      router.push('/signin');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="w-full bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-75">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
      </div>
    );
  }

  const product = products.find(p => String(p.id) === String(slug));

  const toBengaliNumber = (num) => {
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).split('').map(digit => {
      const index = englishDigits.indexOf(digit);
      return index !== -1 ? bengaliDigits[index] : digit;
    }).join('');
  };

  if (!product) {
    return (
      <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center max-w-sm w-full shadow-sm mx-auto">
        <span className="text-5xl select-none">❌</span>
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-wide mt-4 mb-2">পণ্যটি খুঁজে পাওয়া যায়নি</h2>
        <Link href="/" className="bg-emerald-600 text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider block text-center">হোম পেজে ফিরে যান</Link>
      </div>
    );
  }

  const mockBazars = [
    { name: 'মাঠ বাজার', location: 'ময়মনসিংহ', min: '৫৯', max: '৬৫', avg: '৬২' },
    { name: 'সদর market', location: 'রাজশাহী', min: '৬০', max: '৬৬', avg: '৬৩' },
    { name: 'বাজারহাট', location: 'খুলনা', min: '৬০', max: '৬৭', avg: '৬০.৫০' },
    { name: 'বাসারঘাট বাজার', location: 'রাজশাহী', min: '৬০', max: '৬৮', avg: '৬৪' },
    { name: 'চৌর বাজার', location: 'ময়মনসিংহ', min: '৬০', max: '৬৯', avg: '৬৪.牢' },
    { name: 'আমতলী বাজার', location: 'চট্টগ্রাম', min: '৬০', max: '৬৯', avg: '৬৫' },
    { name: 'ভরলগেট বাজার', location: 'খুলনা', min: '৬২', max: '৬৯', avg: '৬৫.৫০' },
    { name: 'চৌরাস্তা বাজার', location: 'সিলেট', min: '৬০', max: '৭০', avg: '৬৭' },
    { name: 'গ্রীন মার্কেট, মিরপুর', location: 'ঢাকা', min: '৬৪', max: '৭০', avg: '৬৭.৫০' },
    { name: 'চৌদগ্রাম বাজার', location: 'চট্টগ্রাম', min: '৬০', max: '৭০', avg: '৬৮' },
    { name: 'আমবাজার', location: 'সিলেট', min: '৬৪', max: '৭৩', avg: '৬৮.৫০' },
    { name: 'কারওয়ান বাজার', location: 'ঢাকা', min: '৬৫', max: '৭০', avg: '৬৯' }
  ];

  return (
    <>
      <div className="text-slate-400 text-xs font-bold flex items-center gap-2 select-none uppercase tracking-wider pl-1">
        <Link href="/" className="hover:text-emerald-600 transition-colors">নিত্যপণ্যের দাম</Link>
        <span>&gt;</span>
        <span className="hover:text-emerald-600 transition-colors">চাল</span>
        <span>&gt;</span>
        <span className="text-slate-600 font-black">{product.name}</span>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-4xl select-none shrink-0 shadow-sm">
            {product.emoji || '🍚'}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-800 uppercase tracking-wide leading-none">{product.name}</h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wide pt-1">প্রতি {product.unit || 'কেজি'} · চাল</p>
            <p className="text-slate-500 text-xs font-medium pt-1">গতকালকের তুলনায় আজকে দাম বেড়েছে + ২ টাকা</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center min-w-40 self-stretch md:self-auto flex flex-col justify-center items-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">আজকের দাম</span>
          <span className="text-slate-800 font-black text-3xl leading-none">{toBengaliNumber(product.price || 66)}</span>
          <span className="text-[11px] text-slate-400 font-bold mt-1 block">টাকা / {product.unit || 'কেজি'}</span>
          <span className="text-[10px] font-black text-red-500 flex items-center gap-0.5 mt-2 bg-red-50 px-2 py-0.5 rounded">▲ {toBengaliNumber((product.priceChange || 0.5).toFixed(1))}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center justify-between">
            <span>সর্বনিম্ন দাম</span>
            <span className="text-green-600 font-black bg-green-50 px-2 py-0.5 rounded text-[10px]">৫৯ টাকা</span>
          </div>
          <div className="text-green-600 font-black text-2xl pt-1">৫৯ টাকা</div>
          <p className="text-[10px] text-slate-400 font-medium pt-1">সবচেয়ে কম মাঠ বাজার</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center justify-between">
            <span>সর্বোচ্চ দাম</span>
            <span className="text-red-600 font-black bg-red-50 px-2 py-0.5 rounded text-[10px]">৭৩ টাকা</span>
          </div>
          <div className="text-red-600 font-black text-2xl pt-1">৭৩ টাকা</div>
          <p className="text-[10px] text-slate-400 font-medium pt-1">সবচেয়ে বেশি আমবাজার</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center justify-between">
            <span>গড় দাম</span>
            <span className="text-emerald-600 font-black bg-emerald-50 px-2 py-0.5 rounded text-[10px]">৬৬ টাকা</span>
          </div>
          <div className="text-emerald-700 font-black text-2xl pt-1">{toBengaliNumber(product.price || 66)} টাকা</div>
          <p className="text-[10px] text-slate-400 font-medium pt-1">প্রতি কেজি এর হিসাব</p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-black text-slate-800 uppercase tracking-wider">বাজারভিত্তিক আজকের দাম</h2>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-xs font-black uppercase tracking-wider">
                <th className="py-3 px-4 font-black">বাজার</th>
                <th className="py-3 px-4 font-black">বিভাগ</th>
                <th className="py-3 px-4 font-black">সর্বনিম্ন</th>
                <th className="py-3 px-4 font-black">সর্বাধিক</th>
                <th className="py-3 px-4 font-black">গড়</th>
              </tr>
            </thead>
            <tbody className="text-xs text-slate-700 font-bold">
              {mockBazars.map((bazar, idx) => (
                <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-black text-slate-800">{bazar.name}</td>
                  <td className="py-3.5 px-4 text-slate-400 font-bold uppercase tracking-wide">{bazar.location}</td>
                  <td className="py-3.5 px-4 text-slate-600">{bazar.min} টাকা</td>
                  <td className="py-3.5 px-4 text-slate-600">{bazar.max}  টাকা</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-black">{bazar.avg}  টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default function ProductDetailsPage({ params }) {
  return (
    <div className="bg-[#fcfdfa] min-h-screen text-slate-800 flex flex-col">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 pt-44 pb-16 flex-1 w-full space-y-6">
        <Suspense fallback={
          <div className="w-full bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-75">
            <span className="loading loading-spinner loading-lg text-emerald-600"></span>
          </div>
        }>
          <ProductDetailsContent paramsPromise={params} />
        </Suspense>
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