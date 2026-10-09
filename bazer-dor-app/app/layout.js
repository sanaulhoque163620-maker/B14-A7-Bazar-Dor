import { BazarProvider } from './context';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata = {
  title: '🛒 বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের দাম',
  description: 'প্রয়োজনীয় পণ্যের লাইভ বাজার দর এক নজরে',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col">
        <BazarProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <div className="flex-1">
            {children}
          </div>
        </BazarProvider>
      </body>
    </html>
  );
}