import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // You can add custom middleware logic here if needed
  return NextResponse.next();
}

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware
export const config = {
  matcher: [
    // Skip static files and API routes that have special handling
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
