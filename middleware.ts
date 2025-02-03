import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  const protectedPaths = [ // 이 경로는 로그인 되어야만 점근 가능능
    '/mypage', 
    '/details', 
    '/posts', 
    '/passer', 
    '/result', 
    '/resume'
    ]; 
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // 저기 들어가려 할때 토큰 없으면 로그인으로 리다이렉트트
  if (isProtectedPath && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
