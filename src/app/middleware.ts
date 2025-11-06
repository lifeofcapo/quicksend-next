// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Получаем язык из пути
    const pathname = req.nextUrl.pathname;
    const language = pathname.startsWith('/ru') ? 'ru' : 'en';
    
    // Если пользователь авторизован и пытается зайти на страницу логина - редирект на профиль
    if (pathname.includes('/login') && req.nextauth.token) {
      return NextResponse.redirect(new URL(`/${language}/profile`, req.url));
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        
        // Разрешаем доступ к странице логина всем
        if (pathname.includes('/login')) {
          return true;
        }
        
        // Для защищённых страниц требуем токен
        if (pathname.includes('/profile')) {
          return !!token;
        }
        
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/(en|ru)/profile/:path*",
    "/(en|ru)/login",
  ],
};