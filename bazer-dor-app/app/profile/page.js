'use client';
import { useState, useEffect } from 'react';
import { useBazar } from '@/app/context';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import toast from 'react-hot-toast';
import { auth } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';
import Image from 'next/image';

export default function ProfilePage() {
  const { user, updateUser, logout, loading } = useBazar();
  const [newName, setNewName] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  const handleUpdate = async (e) => {
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
      toast.success('আপনার প্রোফাইল তথ্য সফলভাবে আপডেট করা হয়েছে!');
    } catch (error) {
      toast.error('প্রোফাইল আপডেট করতে সমস্যা হয়েছে।');
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      logout();
      toast.success('সাইন আউট সম্পন্ন হয়েছে!');
      router.push('/signin');
    } catch (error) {
      toast.error('সাইন আউট ব্যর্থ হয়েছে।');
    }
  };

  return (
    <div className="bg-[#fcfdfa] min-h-screen text-slate-800 flex flex-col">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 pt-40 pb-16 flex-1 w-full flex flex-col gap-6">
        
        <div className="text-left w-full space-y-1 pl-1">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">আমার প্রোফাইল</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm w-full flex flex-row items-center justify-between gap-4 min-h-25">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0 shadow-sm relative">
              {user.image ? (
                <Image src={user.image} alt={user.name} fill className="object-cover" unoptimized />
              ) : (
                <span className="text-slate-800 text-2xl font-black">👤</span>
              )}
            </div>
            <div className="space-y-1 flex flex-col justify-center">
              <h2 className="text-xl font-black text-slate-900 tracking-wide leading-none">
                {user.name}
              </h2>
              <p className="text-slate-400 text-xs font-bold tracking-wide pt-1">
                {user.email}
              </p>
            </div>
          </div>

          <button 
            onClick={handleSignOut}
            className="border border-red-200 text-red-500 bg-white text-xs px-5 py-2.5 rounded-xl font-black tracking-wider uppercase flex items-center gap-1.5 hover:bg-red-50/50 transition-all cursor-pointer shadow-sm shrink-0"
          >
            <span>↪</span> সাইন আউট
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm w-full flex flex-col gap-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-black text-slate-900">তথ্য</h3>
          </div>
          
          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs text-slate-700 font-black block">নাম</label>
              <input 
                type="text" 
                defaultValue={user.name || ''}
                onChange={(e) => setNewName(e.target.value)} 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-bold focus:outline-none focus:border-[#00a859] transition-colors shadow-inner" 
                placeholder="আপনার নাম" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-[#00a859] text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider hover:opacity-95 transition-all cursor-pointer shadow-sm border-0"
            >
              আপডেট
            </button>
          </form>
        </div>

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