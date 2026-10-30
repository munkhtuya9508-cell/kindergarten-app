import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Нэвтрэх хуудас руу орж байвал шалгалт хийхгүй
  if (request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // Браузер дээр багшийн сесс эсвэл cookie байгаа эсэхийг шалгах
  const authCookie = request.cookies.get("teacher_session");

  // Хэрэв нэвтрээгүй бол шууд /login хуудас руу чиглүүлнэ
  if (!authCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};