import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = token.role;

    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
    }
    if (pathname.startsWith("/dashboard/doctor") && role !== "doctor") {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
    }
    if (pathname.startsWith("/dashboard/staff") && role !== "staff") {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
    }
    if (pathname.startsWith("/dashboard/patient") && role !== "patient") {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
