// // middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('fandora_auth_token')
  
//   if (!token && !request.nextUrl.pathname.startsWith('/signin')) {
//     return NextResponse.redirect(new URL('/signin', request.url))
//   }
  
//   return NextResponse.next()
// }

// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|signin).*)',
//   ],
// }
