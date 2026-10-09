'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const BazarContext = createContext();

const initialCategories = [
  { id: '1', name: 'চাল', slug: 'chal' },
  { id: '2', name: 'ডাল', slug: 'dal' },
  { id: '3', name: 'তেল', slug: 'tel' },
  { id: '4', name: 'সবজি', slug: 'sobji' },
  { id: '5', name: 'মাছ', slug: 'mach' },
  { id: '6', name: 'মাংস', slug: 'mansho' },
  { id: '7', name: 'ডিম ও দুধ', slug: 'dim-dudh' },
  { id: '8', name: 'মসলা', slug: 'moshla' }
];

const initialProducts = [
  { id: '1', name: 'স্বর্ণমাছি চাল', category: 'chal', price: 54, unit: 'কেজি', emoji: '🍚', priceChange: 2.5 },
  { id: '2', name: 'মিনিকেট চাল', category: 'chal', price: 68, unit: 'কেজি', emoji: '🍚', priceChange: 1.2 },
  { id: '3', name: 'নাজিরশাইল চাল', category: 'chal', price: 75, unit: 'কেজি', emoji: '🍚', priceChange: 0.8 },
  { id: '4', name: 'আটাশ চাল', category: 'chal', price: 58, unit: 'কেজি', emoji: '🍚', priceChange: 1.5 },
  { id: '5', name: 'পাইজাম চাল', category: 'chal', price: 56, unit: 'কেজি', emoji: '🍚', priceChange: 2.0 },
  { id: '6', name: 'চিনিগুড়া চাল', category: 'chal', price: 135, unit: 'কেজি', emoji: '🍚', priceChange: 3.4 },
  { id: '7', name: 'মসুর ডাল (বড়)', category: 'dal', price: 105, unit: 'কেজি', emoji: '🫘', priceChange: -1.5 },
  { id: '8', name: 'মসুর ডাল (ছোট)', category: 'dal', price: 135, unit: 'কেজি', emoji: '🫘', priceChange: -2.1 },
  { id: '9', name: 'মুগ ডাল', category: 'dal', price: 160, unit: 'কেজি', emoji: '🫘', priceChange: -1.0 },
  { id: '10', name: 'ছোলার ডাল', category: 'dal', price: 115, unit: 'কেজি', emoji: '🫘', priceChange: -0.5 },
  { id: '11', name: 'সয়াবিন তেল (১ লিটার)', category: 'tel', price: 165, unit: 'লিটার', emoji: '🟫', priceChange: -1.8 },
  { id: '12', name: 'সয়াবিন তেল (৫ লিটার)', category: 'tel', price: 810, unit: 'পিস', emoji: '🟫', priceChange: 0.0 },
  { id: '13', name: 'সরিষার তেল', category: 'tel', price: 240, unit: 'লিটার', emoji: '🟫', priceChange: 0.5 },
  { id: '14', name: 'দেশি আলু', category: 'sobji', price: 55, unit: 'কেজি', emoji: '🥔', priceChange: 4.2 },
  { id: '15', name: 'দেশি পেঁয়াজ', category: 'sobji', price: 110, unit: 'কেজি', emoji: '🧅', priceChange: 5.6 },
  { id: '16', name: 'আমদানি করা রসুন', category: 'sobji', price: 210, unit: 'কেজি', emoji: '🧄', priceChange: 2.1 },
  { id: '17', name: 'দেশi আদা', category: 'sobji', price: 240, unit: 'কেজি', emoji: '🫚', priceChange: 1.8 },
  { id: '18', name: 'কাঁচামরিচ', category: 'sobji', price: 180, unit: 'কেজি', emoji: '🌶️', priceChange: 8.5 },
  { id: '19', name: 'বেগুন', category: 'sobji', price: 70, unit: 'কেজি', emoji: '🟩', priceChange: 0.0 },
  { id: '20', name: 'টমেটো', category: 'sobji', price: 140, unit: 'কেজি', emoji: '🟩', priceChange: -3.2 },
  { id: '21', name: 'রুই মাছ (১ কেজি সাইজ)', category: 'mach', price: 320, unit: 'কেজি', emoji: '🐟', priceChange: 1.5 },
  { id: '22', name: 'কাতল মাছ', category: 'mach', price: 360, unit: 'কেজি', emoji: '🐟', priceChange: 0.0 },
  { id: '23', name: 'ইলিশ মাছ (৮০০ গ্রাম)', category: 'mach', price: 1200, unit: 'পিস', emoji: '🐟', priceChange: 4.8 },
  { id: '24', name: 'চেইংড়ি মাছ', category: 'mach', price: 750, unit: 'কেজি', emoji: '🐟', priceChange: -2.5 },
  { id: '25', name: 'ব্রয়লার মুরগি', category: 'mansho', price: 175, unit: 'কেজি', emoji: '🍗', priceChange: -1.2 },
  { id: '26', name: 'কক মুরগি', category: 'mansho', price: 280, unit: 'কেজি', emoji: '🍗', priceChange: -3.0 },
  { id: '27', name: 'গরুর মাংস', category: 'mansho', price: 750, unit: 'কেজি', emoji: '🥩', priceChange: 0.0 },
  { id: '28', name: 'খাসির মাংস', category: 'mansho', price: 1050, unit: 'কেজি', emoji: '🥩', priceChange: 0.5 },
  { id: '29', name: 'ফার্মের ডিম (লাল)', category: 'dim-dudh', price: 145, unit: 'ডজন', emoji: '🥚', priceChange: 2.8 },
  { id: '30', name: 'দেশি মুরগির ডিম', category: 'dim-dudh', price: 210, unit: 'ডজন', emoji: '🥚', priceChange: 0.0 },
  { id: '31', name: 'তরল দুধ (প্যাকিং)', category: 'dim-dudh', price: 90, unit: 'লিটার', emoji: '🥛', priceChange: 1.1 },
  { id: '32', name: 'দেশি শুকনামরিচ', category: 'moshla', price: 380, unit: 'কেজি', emoji: '🌶️', priceChange: -4.0 },
  { id: '33', name: 'হলুদ গুড়া', category: 'moshla', price: 280, unit: 'কেজি', emoji: '🌶️', priceChange: 0.0 }
];

export function BazarProvider({ children }) {
  const [categories] = useState(initialCategories);
  const [products] = useState(initialProducts);
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('bazar_user');
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (e) {
          localStorage.removeItem('bazar_user');
        }
      }
    }
    return null;
  });
  
  const [loading] = useState(false);

  const login = (userData) => {
    setUser(userData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bazar_user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bazar_user');
    }
  };

  const updateUser = (newName) => {
    if (user) {
      const updated = { ...user, name: newName };
      setUser(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('bazar_user', JSON.stringify(updated));
      }
    }
  };

  return (
    <BazarContext.Provider value={{ categories, products, user, loading, login, logout, updateUser }}>
      {children}
    </BazarContext.Provider>
  );
}

export function useBazar() {
  return useContext(BazarContext);
}