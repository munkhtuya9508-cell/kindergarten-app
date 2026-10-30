"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Браузер дээр нэвтэрсэн багшийн мэдээлэл байгаа эсэхийг шалгана
    const session = localStorage.getItem("teacher_session");

    if (!session && pathname !== "/login") {
      router.push("/login");
    } else {
      setIsLoggedIn(!!session);
    }
    setLoading(false);
  }, [pathname, router]);

  if (loading) {
    return (
      <html lang="mn">
        <body className="flex items-center justify-center min-h-screen bg-pink-50/20 text-gray-500 text-sm">
          Уншиж байна...
        </body>
      </html>
    );
  }

  const isLoginPage = pathname === "/login";

  return (
    <html lang="mn">
      <body className="bg-gray-50 flex min-h-screen">
        {/* Нэвтрэх хуудас биш бөгөөд нэвтэрсэн тохиолдолд ганцхан Sidebar харуулна */}
        {!isLoginPage && isLoggedIn && <Sidebar />}
        <main className={`flex-1 ${!isLoginPage ? "p-8" : ""}`}>
          {children}
        </main>
      </body>
    </html>
  );
}