'use client';
import Link from 'next/link';

export default function ProductCard({ product }) {
  if (!product) return null;

  const toBengaliNumber = (num) => {
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).split('').map(digit => {
      const index = englishDigits.indexOf(digit);
      return index !== -1 ? bengaliDigits[index] : digit;
    }).join('');
  };

  const priceChange = product.priceChange || 0;
  const isUp = priceChange > 0;
  const isDown = priceChange < 0;
  const formattedChange = toBengaliNumber(Math.abs(priceChange).toFixed(1));
  const formattedPrice = toBengaliNumber((product.price || 0).toLocaleString());

  return (
    <Link 
      href={`/product/${product.id}`}
      className="bg-white border border-slate-100/80 rounded-2xl p-4 flex flex-row items-center gap-4 hover:border-emerald-500 hover:shadow-md transition-all duration-300 group cursor-pointer w-full"
    >
      <div className="w-16 h-16 bg-[#f8f9fa] border border-slate-100 rounded-xl flex items-center justify-center text-3xl shrink-0 select-none group-hover:scale-105 transition-transform">
        {product.emoji || '🍚'}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-slate-800 font-black text-sm uppercase tracking-wide truncate group-hover:text-emerald-600 transition-colors leading-none mb-1">
            {product.name}
          </h3>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">
            প্রতি {product.unit || 'কেজি'}
          </p>
        </div>

        <div className="flex items-end justify-between w-full mt-1">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">আজকের দাম</span>
            <span className="text-slate-800 font-black text-sm mt-1 leading-none">{formattedPrice} টাকা</span>
          </div>

          <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider flex items-center gap-0.5 leading-none h-5 ${
            isUp ? 'bg-red-50 text-red-500' : isDown ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400'
          }`}>
            <span>{isUp ? '▲' : isDown ? '▼ -' : '—'}</span>
            <span>{formattedChange}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
}