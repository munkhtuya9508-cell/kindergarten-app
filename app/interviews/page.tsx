"use client";

import React, { useState } from "react";
import { Plus, MessageSquare, Calendar, UserCheck } from "lucide-react";

export default function InterviewsPage() {
  const childrenList = [
    "А. Болд (Бэлтгэл Б)",
    "Б. Болор (Бэлтгэл Б)",
    "Д. Бат (Бэлтгэл Б)",
  ];

  const [interviews, setInterviews] = useState([
    {
      id: "1",
      childName: "А. Болд (Бэлтгэл Б)",
      person: "Эцэг эх (Ээж)",
      date: "2026-10-15",
      summary: "Гэрийн орчинд ном унших сонирхлыг дэмжих талаар зөвлөлдөв.",
    },
  ]);

  const [selectedChild, setSelectedChild] = useState(childrenList[0]);
  const [person, setPerson] = useState("Эцэг эх (Ээж)");
  const [summary, setSummary] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary) return;

    const newInterview = {
      id: Date.now().toString(),
      childName: selectedChild,
      person,
      date: new Date().toISOString().split("T")[0],
      summary,
    };

    setInterviews([newInterview, ...interviews]);
    setSummary("");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Ярилцлага 💬
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Форм хэсэг */}
        <form
          onSubmit={handleAdd}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4"
        >
          <h2 className="text-sm font-semibold text-gray-700">
            Ярилцлагын тэмдэглэл нэмэх
          </h2>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Хүүхэд сонгох:
            </label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white"
            >
              {childrenList.map((child) => (
                <option key={child} value={child}>
                  {child}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Ярилцсан хүн:
            </label>
            <select
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white"
            >
              <option>Эцэг эх (Ээж)</option>
              <option>Эцэг эх (Аав)</option>
              <option>Хүүхэд өөрөө</option>
              <option>Бусад асран хамгаалагч</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Ярилцлагын товч утга:
            </label>
            <textarea
              rows={4}
              placeholder="Ярилцлагын агуулга болон шийдвэрлэсэн зүйлсийг бичнэ үү..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition"
          >
            <Plus size={18} /> Тэмдэглэл хадгалах
          </button>
        </form>

        {/* Жагсаалт хэсэг */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-800">Бүртгэгдсэн ярилцлагууд</h2>
          {interviews.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-2"
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-pink-600">{item.childName}</span>
                <span className="text-gray-400">{item.date}</span>
              </div>
              <span className="inline-block bg-pink-50 text-pink-600 text-[10px] px-2 py-0.5 rounded-full font-medium">
                {item.person}
              </span>
              <p className="text-xs text-gray-600 leading-relaxed">{item.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}