"use client";

import React, { useState } from "react";
import { Plus, MessageSquare, Calendar, UserCheck } from "lucide-react";

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState([
    {
      id: "1",
      childName: "А. Болд",
      person: "Эцэг эх (Ээж)",
      date: "2026-10-15",
      summary: "Гэрийн орчинд ном унших сонирхлыг дэмжих талаар зөвлөлдөв.",
    },
    {
      id: "2",
      childName: "Б. Болор",
      person: "Хүүхэд өөрөө",
      date: "2026-10-18",
      summary: "Дуртай хичээл болон найзуудынхаа талаар ярилцлага хийсэн.",
    },
  ]);

  const [childName, setChildName] = useState("");
  const [person, setPerson] = useState("Эцэг эх");
  const [summary, setSummary] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName || !summary) return;

    const newInterview = {
      id: Date.now().toString(),
      childName,
      person,
      date: new Date().toISOString().split("T")[0],
      summary,
    };

    setInterviews([newInterview, ...interviews]);
    setChildName("");
    setSummary("");
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Ярилцлагын Тэмдэглэл 💬
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Эцэг эх болон хүүхэдтэй хийсэн ганцаарчилсан ярилцлагын тэмдэглэл
        </p>
      </div>

      {/* Шинэ ярилцлага нэмэх форм */}
      <form
        onSubmit={handleAdd}
        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4"
      >
        <h2 className="text-base font-bold text-gray-800">
          + Ярилцлагын тэмдэглэл нэмэх
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
              Ярилцсан хүн
            </label>
            <select
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white"
            >
              <option>Эцэг эх (Ээж)</option>
              <option>Эцэг эх (Аав)</option>
              <option>Хүүхэд өөрөө</option>
              <option>Бусад асран хамгаалагч</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Ярилцлагын товч утга
          </label>
          <textarea
            rows={3}
            placeholder="Ярилцлагын агуулга болон шийдвэрлэсэн зүйлсийг бичнэ үү..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
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
        <h2 className="text-base font-bold text-gray-800">Бүртгэгдсэн ярилцлагууд</h2>
        {interviews.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-pink-600 flex items-center gap-1.5">
                  <UserCheck size={16} /> {item.childName}
                </span>
                <span className="bg-pink-50 text-pink-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
                  {item.person}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{item.summary}</p>
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