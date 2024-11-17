import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SECRETz });
  const { pathname } = new URL(req.url);

  if (!token && pathname === "/admin/*") {
    return NextResponse.redirect("/login");
  }

  if (pathname === "/admin/*" && token?.role == "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
