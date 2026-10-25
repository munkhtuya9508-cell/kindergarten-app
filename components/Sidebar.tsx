"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Eye,
  MessageSquare,
  FileText,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Нүүр", path: "/", icon: LayoutDashboard },
    { name: "Хүүхдүүд", path: "/children", icon: Users },
    { name: "Ажиглалт", path: "/observations", icon: Eye },
    { name: "Ярилцлага", path: "/interviews", icon: MessageSquare },
    { name: "Тайлан & Хэвлэх", path: "/reports", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen p-6 flex flex-col justify-between shrink-0">
      <div>
        {/* Лого & Логоны нэр */}
        <Link href="/" className="flex items-center gap-2 mb-8">
          <span className="text-xl">🌸</span>
          <span className="font-bold text-lg text-pink-600">
            Хөгжлийн Хуудас
          </span>
        </Link>

        {/* Цэсний жагсаалт */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition ${
                  isActive
                    ? "bg-pink-50 text-pink-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}