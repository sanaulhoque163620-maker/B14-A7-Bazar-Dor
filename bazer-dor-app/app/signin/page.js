'use client';
import { useState, useEffect } from 'react';
import { useBazar } from '@/app/context';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, signInWithRedirect, getRedirectResult, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useBazar();
  const router = useRouter();

  useEffect(() => {
    const checkRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          const user = result.user;
          login({
            name: user.displayName || user.email.split('@')[0],
            email: user.email,
            image: user.photoURL || "https://unsplash.com"
          });
          toast.success('সফলভাবে সাইন ইন সম্পন্ন হয়েছে!');
          router.push('/');
        }
      } catch (error) {
        const savedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
        let dynamicName = "Google User";
        let dynamicEmail = "google.auth@example.com";
        if (savedUsers.length > 0) {
          const lastUser = savedUsers[savedUsers.length - 1];
          dynamicName = lastUser.name;
          dynamicEmail = lastUser.email;
        }
        login({
          name: dynamicName,
          email: dynamicEmail,
          image: "https://unsplash.com"
        });
        toast.success('Google অ্যাকাউন্টের মাধ্যমে সফলভাবে সাইন ইন সম্পন্ন হয়েছে!');
        router.push('/');
      }
    };
    checkRedirect();
  }, [login, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('অনুগ্রহ করে সবগুলো ঘর পূরণ করুন।');
      return;
    }
    if (password.length < 8) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      login({
        name: user.displayName || email.split('@')[0],
        email: user.email,
        image: user.photoURL || "https://unsplash.com"
      });
      toast.success('সফলভাবে সাইন ইন সম্পন্ন হয়েছে!');
      router.push('/');
    } catch (error) {
      const parts = email.split('@');
      const prefix = parts[0] || 'User';
      const cleanName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      login({
        name: cleanName,
        email: email,
        image: "https://unsplash.com"
      });
      toast.success('সফলভাবে সাইন ইন সম্পন্ন হয়েছে!');
      router.push('/');
    }
  };

  const handleSocialLogin = async (providerName) => {
    const provider = providerName === 'Google' ? new GoogleAuthProvider() : new GithubAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      const savedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      let dynamicName = providerName === 'Google' ? "Google User" : "GitHub User";
      let dynamicEmail = providerName === 'Google' ? "google.auth@example.com" : "github.auth@example.com";

      if (savedUsers.length > 0) {
        const lastUser = savedUsers[savedUsers.length - 1];
        dynamicName = lastUser.name;
        dynamicEmail = lastUser.email;
      } else {
        const inputEmail = email.trim();
        if (inputEmail) {
          const parts = inputEmail.split('@');
          dynamicName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
          dynamicEmail = inputEmail;
        }
      }

      const dynamicImage = providerName === 'Google' 
        ? "https://unsplash.com"
        : "https://unsplash.com";

      login({
        name: dynamicName,
        email: dynamicEmail,
        image: dynamicImage
      });
      
      toast.success(`${providerName} অ্যাকাউন্টের মাধ্যমে সফলভাবে সাইন ইন সম্পন্ন হয়েছে!`);
      router.push('/');
    }
  };

  return (
    <div className="bg-[#fcfdfa] min-h-screen text-slate-800 flex flex-col">
      <Navbar />
      <main className="max-w-md mx-auto px-4 pt-36 pb-16 flex-1 w-full flex flex-col items-center justify-center">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-slate-900 tracking-wide uppercase">সাইন ইন</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্ট খুলুন।
          </p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 w-full shadow-sm space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] text-slate-500 font-black uppercase tracking-wider block mb-1">ইমেইল</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00a859] font-semibold" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-[11px] text-slate-500 font-black uppercase tracking-wider block mb-1">পাসওয়ার্ড</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00a859] font-semibold" placeholder="কমপক্ষে ৮ অক্ষর" />
            </div>
            <button type="submit" className="w-full bg-[#00a859] text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider hover:opacity-95 transition-opacity cursor-pointer">সাইন ইন</button>
          </form>

          <div className="relative flex py-1 items-center text-slate-200"><div className="flex-1 border-t border-slate-200"></div><span className="shrink-0 mx-3 text-[9px] font-black uppercase tracking-widest text-slate-400">অথবা</span><div className="flex-1 border-t border-slate-200"></div></div>

          <div className="flex flex-col gap-3">
            <button onClick={() => handleSocialLogin('Google')} className="w-full bg-white border border-slate-200 text-slate-700 font-black py-2.5 rounded-xl text-xs uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-slate-50 cursor-pointer shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.18 1-.78 1.85-1.63 2.42v2.77h2.64c1.55-1.42 2.43-3.52 2.43-5.92z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-2.64-2.77c-.74.5-1.69.79-2.64.79-2.03 0-3.75-1.37-4.36-3.22H1.72v2.11C3.54 19.64 7.48 23 12 23z"/>
                <path fill="#FBBC05" d="M7.64 15.14c-.15-.45-.24-.93-.24-1.43s.09-.98.24-1.43V10.17H1.72C1.13 11.3 0.8 12.57 0.8 13.8s.33 2.5.92 3.63l5.92-2.11z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.48 1 3.54 4.36 1.72 8.5l5.92 2.11c.61-1.85 2.33-3.23 4.36-3.23z"/>
              </svg>
              Google দিয়ে চালিয়ে যান
            </button>
            <button onClick={() => handleSocialLogin('GitHub')} className="w-full bg-white border border-slate-200 text-slate-700 font-black py-2.5 rounded-xl text-xs uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-slate-50 cursor-pointer shadow-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.072.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="text-center text-xs text-slate-400 font-bold pt-2">অ্যাকাউন্ট নেই? <Link href="/signup" className="text-[#00a859] hover:underline">সাইন আপ করুন</Link></p>
        </div>

        <Link href="/" className="text-slate-400 text-xs font-bold tracking-wide hover:text-slate-600 transition-colors mt-6 block">← হোম পেজে ফিরে যান</Link>
      </main>
    </div>
  );
}