'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, UserCircle } from 'lucide-react';

export default function Header() {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const t = {
    aboutUs: language === 'ru' ? 'О нас' : 'About us',
    products: language === 'ru' ? 'Продукты' : 'Products',
    pricing: language === 'ru' ? 'Цены' : 'Pricing',
    contact: language === 'ru' ? 'Контакты' : 'Contact us',
    signIn: language === 'ru' ? 'Войти' : 'Sign In',
    startFree: language === 'ru' ? 'Начать бесплатно' : 'Start for free',
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ru' ? 'en' : 'ru');
  };

  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="text-2xl font-bold text-blue-600">QuickSend</div>
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link href="#whyquicksend" className="text-gray-700 hover:text-blue-600 transition">
            {t.aboutUs}
          </Link>
          <Link href="#products" className="text-gray-700 hover:text-blue-600 transition">
            {t.products}
          </Link>
          <Link href="#pricing" className="text-gray-700 hover:text-blue-600 transition">
            {t.pricing}
          </Link>
          <Link href="#contact" className="text-gray-700 hover:text-blue-600 transition">
            {t.contact}
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">{language === 'ru' ? 'EN' : 'RU'}</span>
          </button>

          {!isAuthenticated ? (
            <div className="flex space-x-2">
              <button
                onClick={handleAuth}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
              >
                {t.signIn}
              </button>
              <button
                onClick={handleAuth}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {t.startFree}
              </button>
            </div>
          ) : (
            <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-full transition">
              <UserCircle className="w-6 h-6 text-gray-700" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}