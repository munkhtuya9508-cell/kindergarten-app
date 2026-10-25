"use client";

import Link from "next/link";
import { LayoutDashboard, Users, Eye, MessageSquare, FileText } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Хажуугийн Цэс (Sidebar) */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col gap-6">
        <h1 className="text-xl font-bold text-pink-600 flex items-center gap-2">
          🌸 Хөгжлийн Хуудас
        </h1>

        <nav className="flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-pink-600 bg-pink-50 rounded-xl font-medium"
          >
            <LayoutDashboard size={20} />
            <span>Нүүр</span>
          </Link>

          <Link
            href="/children"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-xl transition"
          >
            <Users size={20} />
            <span>Хүүхдүүд</span>
          </Link>

          <Link
            href="/observations"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-xl transition"
          >
            <Eye size={20} />
            <span>Ажиглалт</span>
          </Link>

          <Link
            href="/interviews"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-xl transition"
          >
            <MessageSquare size={20} />
            <span>Ярилцлага</span>
          </Link>

          <Link
            href="/reports"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-xl transition"
          >
            <FileText size={20} />
            <span>Тайлан & Хэвлэх</span>
          </Link>
        </nav>
      </aside>

      {/* Үндсэн Нүүр хуудасны контент */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Нүүр хуудас</h1>
        <p className="text-gray-600">Цэцэрлэгийн удирдлагын системд тайван морилно уу.</p>
      </main>
    </div>
  );
}