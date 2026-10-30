"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Eye, MessageSquare, FileText, Sparkles } from "lucide-react";

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
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen p-6 space-y-8">
      <div className="flex items-center gap-2 text-pink-600 font-bold text-lg">
        <Sparkles size={22} />
        <span>Хөгжлийн Хуудас</span>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition ${
                isActive
                  ? "bg-pink-50 text-pink-600 font-bold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}