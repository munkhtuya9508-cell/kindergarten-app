"use client";

import { useState } from "react";
import { Pencil, Trash2, ChevronRight, UserPlus } from "lucide-react";
import Link from "next/link";

export default function ChildrenPage() {
  const [children, setChildren] = useState([
    { id: "1", name: "А. Болд", dob: "2021-05-12", group: "Бэлтгэл Б бүлэг" },
    { id: "2", name: "Б. Болор", dob: "2021-08-20", group: "Бэлтгэл Б бүлэг" },
  ]);

  const handleDelete = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    if (confirm(`${name}-г устгахдаа итгэлтэй байна уу?`)) {
      setChildren(children.filter((child) => child.id !== id));
    }
  };

  const handleEdit = (e: React.MouseEvent, child: any) => {
    e.stopPropagation();
    const newName = prompt("Шинэ нэрийг оруулна уу:", child.name);
    if (newName && newName.trim() !== "") {
      setChildren(
        children.map((c) => (c.id === child.id ? { ...c, name: newName } : c))
      );
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Бэлтгэл Б бүлгийн хүүхдүүд 👶
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Хүүхдийн нэр дээр дарж дэлгэрэнгүй ахиц, ажиглалт, ярилцлагыг харна уу
          </p>
        </div>
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition">
          <UserPlus size={18} />
          + Шинэ хүүхэд нэмэх
        </button>
      </div>

      <div className="space-y-4">
        {children.map((child) => (
          <div
            key={child.id}
            className="border border-gray-200 rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition bg-white"
          >
            <div>
              <h3 className="text-lg font-semibold text-pink-600">
                {child.name}
              </h3>
              <p className="text-gray-500 text-xs mt-2">
                Төрсөн огноо: {child.dob}
              </p>
              <p className="text-gray-400 text-xs">{child.group}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => handleEdit(e, child)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                title="Засах"
              >
                <Pencil size={18} />
              </button>

              <button
                type="button"
                onClick={(e) => handleDelete(e, child.id, child.name)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                title="Устгах"
              >
                <Trash2 size={18} />
              </button>

              <Link
                href={`/children/${child.id}`}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}