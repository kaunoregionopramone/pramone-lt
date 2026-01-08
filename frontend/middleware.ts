import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const { searchParams } = url;
  
  // Check if URL has Sanity preview parameters
  const hasPreviewParam = searchParams.has("sanity-preview-perspective");
  
  if (hasPreviewParam) {
    // If we have preview params but draft mode is not enabled,
    // we need to enable it by redirecting to the enable endpoint
    const draftModeCookie = request.cookies.get("__prerender_bypass");
    
    if (!draftModeCookie) {
      // Build the redirect URL - preserve all query parameters
      const redirectUrl = url.toString();
      const enableUrl = new URL("/api/draft-mode/enable", request.url);
      enableUrl.searchParams.set("redirect", redirectUrl);
      
      return NextResponse.redirect(enableUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
