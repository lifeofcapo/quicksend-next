// app/[lang]/auth/error/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "OAuthCallback":
        return "Ошибка при входе через Google. Пожалуйста, проверьте настройки OAuth в Google Cloud Console.";
      case "Configuration":
        return "Ошибка конфигурации сервера.";
      case "AccessDenied":
        return "Доступ запрещен.";
      default:
        return "Произошла неизвестная ошибка при аутентификации.";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Ошибка входа</h2>
          <p className="mt-2 text-red-600">{getErrorMessage(error)}</p>
          <div className="mt-6 space-y-4">
            <Link
              href="/login"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Попробовать снова
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}