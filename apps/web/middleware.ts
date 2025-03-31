import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname === "/"
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard")

  // Since we're using localStorage for token storage, we can't access it in middleware
  // Instead, we'll let the client-side handle the redirects
  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
} 