"use client";

import React, { useState, useEffect } from "react";
import { UserPlus, Trash2, Search, UserCheck, Edit2, X, Check } from "lucide-react";

interface Child {
  id: number;
  name: string;
  group: string;
  gender: string;
  birthDate: string;
}

const DEFAULT_CHILDREN: Child[] = [
  { id: 1, name: "А. Болд", group: "Бэлтгэл Б", gender: "Эр", birthDate: "2021-05-12" },
  { id: 2, name: "Б. Болор", group: "Бэлтгэл Б", gender: "Эм", birthDate: "2021-08-20" },
  { id: 3, name: "Д. Бат", group: "Бэлтгэл Б", gender: "Эр", birthDate: "2021-02-15" },
];

export default function ChildrenPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [name, setName] = useState("");
  const [group, setGroup] = useState("Бэлтгэл Б");
  const [gender, setGender] = useState("Эр");
  const [birthDate, setBirthDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Засварлаж байгаа хүүхдийг хадгалах State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editGroup, setEditGroup] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editBirthDate, setEditBirthDate] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("app_children");
    if (saved) {
      try {
        setChildren(JSON.parse(saved));
      } catch (e) {
        setChildren(DEFAULT_CHILDREN);
      }
    } else {
      setChildren(DEFAULT_CHILDREN);
      localStorage.setItem("app_children", JSON.stringify(DEFAULT_CHILDREN));
    }
  }, []);

  const saveAndBroadcast = (updated: Child[]) => {
    setChildren(updated);
    localStorage.setItem("app_children", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newChild: Child = {
      id: Date.now(),
      name,
      group,
      gender,
      birthDate: birthDate || "2021-01-01",
    };

    const updated = [newChild, ...children];
    saveAndBroadcast(updated);

    setName("");
    setBirthDate("");
  };

  const handleDeleteChild = (id: number) => {
    if (confirm("Энэ хүүхдийг хасахдаа итгэлтэй байна уу?")) {
      const updated = children.filter((child) => child.id !== id);
      saveAndBroadcast(updated);
    }
  };

  // Засварлах горим эхлүүлэх
  const startEditing = (child: Child) => {
    setEditingId(child.id);
    setEditName(child.name);
    setEditGroup(child.group);
    setEditGender(child.gender);
    setEditBirthDate(child.birthDate);
  };

  // Засварыг цуцлах
  const cancelEditing = () => {
    setEditingId(null);
  };

  // Засварыг хадгалах
  const handleSaveEdit = (id: number) => {
    if (!editName.trim()) return;

    const updated = children.map((child) => {
      if (child.id === id) {
        return {
          ...child,
          name: editName,
          group: editGroup,
          gender: editGender,
          birthDate: editBirthDate,
        };
      }
      return child;
    });

    saveAndBroadcast(updated);
    setEditingId(null);
  };

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
          Хүүхдийн мэдээллийг шинээр нэмэх, засах болон устгах хэсэг
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
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
            >
              <UserCheck size={18} /> Жагсаалтад нэмэх
            </button>
          </form>
        </div>

        {/* ХҮҮХДҮҮДИЙН ЖАГСААЛТ ВАН ЗАСВАРЛАХ ХЭСЭГ */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 md:col-span-2">
          <div className="flex justify-between items-center flex-wrap gap-2 border-b border-gray-100 pb-3">
            <h2 className="text-sm font-bold text-gray-800">
              Бүртгэлтэй хүүхдүүд ({filteredChildren.length})
            </h2>

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
                <div key={child.id} className="py-3 px-2 rounded-xl transition hover:bg-pink-50/20">
                  {editingId === child.id ? (
                    /* ЗАСВАРЛАХ ФОРМ */
                    <div className="space-y-3 bg-pink-50/40 p-3 rounded-xl border border-pink-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 font-medium focus:outline-none focus:border-pink-500 bg-white"
                          placeholder="Нэр"
                        />
                        <select
                          value={editGroup}
                          onChange={(e) => setEditGroup(e.target.value)}
                          className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 font-medium focus:outline-none focus:border-pink-500 bg-white"
                        >
                          <option value="Бэлтгэл Б">Бэлтгэл Б бүлэг</option>
                          <option value="Бэлтгэл А">Бэлтгэл А бүлэг</option>
                          <option value="Ахлах А">Ахлах А бүлэг</option>
                          <option value="Дунд А">Дунд А бүлэг</option>
                          <option value="Бага А">Бага А бүлэг</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 items-center">
                        <select
                          value={editGender}
                          onChange={(e) => setEditGender(e.target.value)}
                          className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 font-medium focus:outline-none focus:border-pink-500 bg-white"
                        >
                          <option value="Эр">Эр</option>
                          <option value="Эм">Эм</option>
                        </select>
                        <input
                          type="date"
                          value={editBirthDate}
                          onChange={(e) => setEditBirthDate(e.target.value)}
                          className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 font-medium focus:outline-none focus:border-pink-500 bg-white"
                        />
                        <div className="flex items-center gap-2 col-span-2 md:col-span-1 justify-end">
                          <button
                            onClick={() => handleSaveEdit(child.id)}
                            className="p-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                            title="Хадгалах"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-1.5 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition"
                            title="Цуцлах"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* ЭНГЭЙН ХАРАГДАХ МӨР */
                    <div className="flex items-center justify-between">
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

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEditing(child)}
                          className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition"
                          title="Засварлах"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteChild(child.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="Хасах / Устгах"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
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