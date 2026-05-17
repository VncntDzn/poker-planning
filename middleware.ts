// middleware.ts
import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")
  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*"], // Protected routes
}
