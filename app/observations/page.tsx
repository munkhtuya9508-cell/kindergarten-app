"use "use client";

import React, { useState } from "react";
import { Plus, Eye, Calendar, User } from "lucide-react";

export default function ObservationsPage() {
  const [observations, setObservations] = useState([
    {
      id: "1",
      childName: "А. Болд",
      date: "2026-10-20",
      category: "Нийгэмшихүй",
      note: "Бусадтай тоглоомоо хуваалцаж, хамтран тоглох чадвар ажиглагдсан.",
    },
    {
      id: "2",
      childName: "Б. Болор",
      date: "2026-10-22",
      category: "Илэрхийлэх урлаг",
      note: "Өнгө ялгах болон зурах даалгаврыг маш сайн гүйцэтгэсэн.",
    },
  ]);

  const [childName, setChildName] = useState("");
  const [category, setCategory] = useState("Нийгэмшихүй");
  const [note, setNote] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName || !note) return;

    const newObs = {
      id: Date.now().toString(),
      childName,
      date: new Date().toISOString().split("T")[0],
      category,
      note,
    };

    setObservations([newObs, ...observations]);
    setChildName("");
    setNote("");
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Ажиглалтын Тэмдэглэл 👁️
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Хүүхдийн өдөр тутмын ахиц, хөгжлийг ажиглаж тэмдэглэх хэсэг
        </p>
      </div>

      {/* Шинэ ажиглалт нэмэх форм */}
      <form
        onSubmit={handleAdd}
        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4"
      >
        <h2 className="text-base font-bold text-gray-800">
          + Шинэ ажиглалт бичих
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Хүүхдийн нэр
            </label>
            <input
              type="text"
              placeholder="жишээ нь: А. Болд"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Хөгжлийн чиглэл
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white"
            >
              <option>Нийгэмшихүй</option>
              <option>Танин мэдэхүй</option>
              <option>Илэрхийлэх урлаг</option>
              <option>Хөдөлгөөн, эрүүл мэнд</option>
              <option>Хэл яриа</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Ажиглалтын тэмдэглэл
          </label>
          <textarea
            rows={3}
            placeholder="Ажиглагдсан ахиц, онцлогийг бичнэ үү..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition"
        >
          <Plus size={18} /> Тэмдэглэл хадгалах
        </button>
      </form>

      {/* Жагсаалт */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-gray-800">Бүртгэгдсэн ажиглалтууд</h2>
        {observations.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-pink-600 flex items-center gap-1.5">
                  <User size={16} /> {item.childName}
                </span>
                <span className="bg-pink-50 text-pink-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
                  {item.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{item.note}</p>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1 shrink-0">
              <Calendar size={14} /> {item.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}