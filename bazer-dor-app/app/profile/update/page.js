'use client';
import { useState, useEffect } from 'react';
import { useBazar } from '@/app/context';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import toast from 'react-hot-toast';
import { auth } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';

export default function UpdateProfilePage() {
  const { user, updateUser } = useBazar();
  const [newName, setNewName] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/signin');
    }
  }, [user, router]);

  if (!user) return null;

  const handleUpdateInformation = async (e) => {
    e.preventDefault();
    const targetName = newName.trim() || user.name;
    if (!targetName) {
      toast.error('অনুগ্রহ করে একটি বৈধ নাম লিখুন।');
      return;
    }

    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: targetName
        });
      }
      updateUser(targetName);
      toast.success('আপনার নাম সফলভাবে আপডেট করা হয়েছে!');
      router.push('/profile');
    } catch (error) {
      toast.error('BetterAuth আপডেট প্রসেস করতে ব্যর্থ হয়েছে।');
    }
  };

  return (
    <div className="bg-[#fcfdfa] min-h-screen text-slate-800 flex flex-col">
      <Navbar />
      <main className="max-w-md mx-auto px-4 pt-36 pb-16 flex-1 w-full flex flex-col items-center justify-center">
        <div className="text-center mb-6 w-full">
          <h1 className="text-2xl font-black text-slate-900 tracking-wide uppercase">তথ্য পরিবর্তন</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">BetterAuth গাইডলাইন অনুযায়ী আপনার নাম পরিবর্তন করুন।</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 w-full shadow-sm">
          <form onSubmit={handleUpdateInformation} className="space-y-4">
            <div>
              <label className="text-[11px] text-slate-500 font-black uppercase tracking-wider block mb-1">নাম (Name)</label>
              <input 
                type="text" 
                defaultValue={user.name || ''}
                onChange={(e) => setNewName(e.target.value)} 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#00a859]" 
                placeholder="নতুন নাম লিখুন" 
              />
            </div>
            <button type="submit" className="w-full bg-[#00a859] text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider hover:opacity-95 transition-opacity cursor-pointer">তথ্য আপডেট করুন</button>
          </form>
          <button onClick={() => router.push('/profile')} className="w-full text-center text-slate-400 text-xs font-bold tracking-wide hover:text-slate-600 transition-colors mt-4 block">← প্রোফাইলে ফিরে যান</button>
        </div>
      </main>
    </div>
  );
}