import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // حماية صفحات المشرف والمبيعات
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
    const authToken = request.cookies.get('auth_token')?.value
    const userRole = request.cookies.get('user_role')?.value
    
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    if (pathname.startsWith('/admin') && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }
  
  // توجيه صفحة الدفع للمستخدمين المسجلين فقط
  if (pathname.startsWith('/checkout')) {
    const cartItems = request.cookies.get('cart_items')?.value
    const authToken = request.cookies.get('auth_token')?.value
    
    if (!cartItems || JSON.parse(cartItems).length === 0) {
      return NextResponse.redirect(new URL('/cart', request.url))
    }
    
    if (!authToken) {
      return NextResponse.redirect(new URL('/login?redirect=' + encodeURIComponent(pathname), request.url))
    }
  }
  
  // إضافة headers للأمان والتحليل
  const response = NextResponse.next()
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Game store specific headers
  response.headers.set('X-Game-Store', 'Minecraft-PUBG-Fortnite')
  
  // CORS headers for game APIs
  if (pathname.startsWith('/api/games')) {
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }
  
  return response
}

// تحديد المسارات التي يعمل عليها middleware
export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*', 
    '/checkout/:path*',
    '/api/games/:path*',
    '/profile/:path*'
  ]
}