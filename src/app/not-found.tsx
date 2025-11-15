// app/not-found.tsx
import Link from 'next/link';
import { headers } from 'next/headers';
import NotFoundAnimation from '@/components/LottieAnimation';

export default async function GlobalNotFound() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  const preferredLang = acceptLanguage.toLowerCase().includes('ru') ? 'ru' : 'en';

  const translations = {
    ru: {
      title: "Страница не найдена",
      description: "Мы не можем найти страницу, которую вы ищете.",
      backHome: "Вернуться на главную"
    },
    en: {
      title: "Page Not Found", 
      description: "We can't seem to find the page you're looking for.",
      backHome: "Return to Home"
    }
  };

  const t = translations[preferredLang];
  return (
    <html lang={preferredLang} className="h-full">
      <body className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4 py-8 transition-colors duration-300">
        <NotFoundAnimation />

        <div className="text-center max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">
            {t.description}
          </p>

          <Link
            href={`/${preferredLang}`}
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600"
          >
            {t.backHome}
          </Link>
        </div>
      </body>
    </html>
  );
}