import { NextResponse, NextRequest } from 'next/server'
import getOrCreateDB from './model/server/dbsetup'
import getOrCreateStorage from './model/server/storage.collection'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    await Promise.all([
        getOrCreateDB(),
        getOrCreateStorage(),
    ])
  return NextResponse.next()
}
 
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ],
}