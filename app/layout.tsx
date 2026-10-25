import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Цэцэрлэгийн Апп",
  description: "Хүүхдийн ахиц хөгжлийн систем",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body className="flex bg-gray-50 min-h-screen">
        {/* Хажуугийн цэс */}
        <Sidebar />
        
        {/* Хуудасны үндсэн контент */}
        <main className="flex-1 p-8">{children}</main>
      </body>
    </html>
  );
}