import Sidebar from "@/components/Sidebar";
import "./globals.css";

export const metadata = {
  title: "Хөгжлийн Хуудас",
  description: "Цэцэрлэгийн багшид зориулсан хөгжлийн ахицын систем",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body className="bg-gray-50 flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8">{children}</main>
      </body>
    </html>
  );
}