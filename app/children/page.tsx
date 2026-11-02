"use client";

import React, { useState } from "react";
import { UserPlus, Trash2, Search, UserCheck } from "lucide-react";

interface Child {
  id: number;
  name: string;
  group: string;
  gender: string;
  birthDate: string;
}

export default function ChildrenPage() {
  // Бааз дээрх хүүхдүүдийн анхны жагсаалт
  const [children, setChildren] = useState<Child[]>([
    { id: 1, name: "А. Болд", group: "Бэлтгэл Б", gender: "Эр", birthDate: "2021-05-12" },
    { id: 2, name: "Б. Болор", group: "Бэлтгэл Б", gender: "Эм", birthDate: "2021-08-20" },
    { id: 3, name: "Д. Бат", group: "Бэлтгэл Б", gender: "Эр", birthDate: "2021-02-15" },
  ]);

  // Формын оруулах утгуудын State
  const [name, setName] = useState("");
  const [group, setGroup] = useState("Бэлтгэл Б");
  const [gender, setGender] = useState("Эр");
  const [birthDate, setBirthDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Шинэ хүүхэд нэмэх функц
  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Хүүхдийн нэрийг оруулна уу!");
      return;
    }

    const newChild: Child = {
      id: Date.now(), // Дахин давтагдашгүй ID
      name,
      group,
      gender,
      birthDate: birthDate || "2021-01-01",
    };

    // Жагсаалт руу шинэ хүүхдийг нэмэх
    setChildren([newChild, ...children]);

    // Формын талбаруудыг цэвэрлэх
    setName("");
    setBirthDate("");
  };

  // Хүүхэд устгах функц
  const handleDeleteChild = (id: number) => {
    if (confirm("Энэ хүүхдийн мэдээллийг устгахдаа суртай байна уу?")) {
      setChildren(children.filter((child) => child.id !== id));
    }
  };

  // Хайлтаар шүүж харуулах
  const filteredChildren = children.filter((child) =>
    child.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Хүүхдийн бүртгэл 👶
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Анги бүлгийн хүүхдүүдийн бүртгэлийг хөтлөх болон шинэ хүүхэд нэмэх
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* ШИНЭ ХҮҮХЭД НЭМЭХ ФОРМ */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 md:col-span-1">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <UserPlus className="text-pink-500" size={18} /> Шинэ хүүхэд нэмэх
          </h2>

          <form onSubmit={handleAddChild} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Овог Нэр:
              </label>
              <input
                type="text"
                placeholder="Ж: А. Болд"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Бүлэг / Анги:
              </label>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white"
              >
                <option value="Бэлтгэл Б">Бэлтгэл Б бүлэг</option>
                <option value="Бэлтгэл А">Бэлтгэл А бүлэг</option>
                <option value="Ахлах А">Ахлах А бүлэг</option>
                <option value="Дунд А">Дунд А бүлэг</option>
                <option value="Бага А">Бага А бүлэг</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Хүйс:
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white"
                >
                  <option value="Эр">Эр</option>
                  <option value="Эм">Эм</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Төрсөн огноо:
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-500 bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition mt-2"
            >
              <UserCheck size={18} /> Жагсаалтад нэмэх
            </button>
          </form>
        </div>

        {/* ХҮҮХДҮҮДИЙН ЖАГСААЛТ */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 md:col-span-2">
          <div className="flex justify-between items-center flex-wrap gap-2 border-b border-gray-100 pb-3">
            <h2 className="text-sm font-bold text-gray-800">
              Бүртгэлтэй хүүхдүүд ({filteredChildren.length})
            </h2>

            {/* Хайлтын хэсэг */}
            <div className="relative w-48">
              <Search className="absolute left-2.5 top-2.5 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Нэрээр хайх..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-500 bg-gray-50/50"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredChildren.length > 0 ? (
              filteredChildren.map((child) => (
                <div
                  key={child.id}
                  className="py-3 flex items-center justify-between hover:bg-pink-50/20 px-2 rounded-xl transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-pink-100 text-pink-600 font-bold text-xs flex items-center justify-center">
                      {child.name.substring(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{child.name}</p>
                      <p className="text-[11px] text-gray-400">
                        {child.group} • {child.gender} • {child.birthDate}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteChild(child.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                    title="Устгах"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-center text-gray-400 py-8">
                Бүртгэлтэй хүүхэд олдсонгүй.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}