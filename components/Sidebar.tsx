"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Eye, MessageSquare, FileText } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Нүүр", href: "/", icon: LayoutDashboard },
    { name: "Хүүхдүүд", href: "/children", icon: Users },
    { name: "Ажиглалт", href: "/observations", icon: Eye },
    { name: "Ярилцлага", href: "/interviews", icon: MessageSquare },
    { name: "Тайлан & Хэвлэх", href: "/reports", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-white min-h-screen border-r border-gray-200 p-6 flex flex-col gap-6">
      <h1 className="text-xl font-bold text-pink-600 flex items-center gap-2">
        🌸 Хөгжлийн Хуудас
      </h1>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-pink-50 text-pink-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}