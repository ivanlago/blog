import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Temporariamente desabilitado para testar o redirecionamento
  console.log("Middleware interceptando:", request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
