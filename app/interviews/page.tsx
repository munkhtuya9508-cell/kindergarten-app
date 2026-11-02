"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Plus, Calendar, Image as ImageIcon, Video } from "lucide-react";

interface Interview {
  id: number;
  child: string;
  type: string;
  date: string;
  note: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
}

export default function InterviewsPage() {
  const [childrenList, setChildrenList] = useState<string[]>([
    "А. Болд (Бэлтгэл Б)",
    "Б. Болор (Бэлтгэл Б)",
    "Д. Бат (Бэлтгэл Б)",
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("app_children");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const names = parsed.map((c: any) => `${c.name} (${c.group})`);
        if (names.length > 0) setChildrenList(names);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const [selectedFilterChild, setSelectedFilterChild] = useState<string>("Бүх хүүхэд");
  const [selectedFormChild, setSelectedFormChild] = useState<string>(childrenList[0] || "");
  const [interviewType, setInterviewType] = useState("Хүүхэдтэй хийсэн ярилцлага");
  const [note, setNote] = useState("");
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: 1,
      child: "А. Болд (Бэлтгэл Б)",
      type: "Эцэг эхтэй хийсэн ярилцлага",
      date: "2026-10-12",
      note: "Гэрийн орчинд ном унших цагийг тохируулж, бие даан ном зааж өгөхөөр тохиров.",
      mediaUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&q=80",
      mediaType: "image",
    },
  ]);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaUrl(url);
      setMediaType(file.type.startsWith("video") ? "video" : "image");
    }
  };

  const handleAddInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    const newInterview: Interview = {
      id: Date.now(),
      child: selectedFormChild || childrenList[0],
      type: interviewType,
      date: new Date().toISOString().split("T")[0],
      note,
      mediaUrl: mediaUrl || undefined,
      mediaType,
    };

    setInterviews([newInterview, ...interviews]);
    setNote("");
    setMediaUrl("");
  };

  const filteredInterviews =
    selectedFilterChild === "Бүх хүүхэд"
      ? interviews
      : interviews.filter((item) => item.child === selectedFilterChild);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Ярилцлагын бүртгэл 💬
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Эцэг эх болон хүүхэдтэй хийсэн ярилцлагыг зураг, бичлэгийн хамт хөтлөх
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-600">Хүүхдээр шүүх:</span>
          <select
            value={selectedFilterChild}
            onChange={(e) => setSelectedFilterChild(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-pink-600 focus:outline-none bg-pink-50/50"
          >
            <option value="Бүх хүүхэд">Бүх хүүхэд</option>
            {childrenList.map((child) => (
              <option key={child} value={child}>
                {child}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 md:col-span-1">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Plus className="text-pink-500" size={18} /> Шинэ ярилцлага нэмэх
          </h2>
          <form onSubmit={handleAddInterview} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Хүүхэд сонгох:</label>
              <select
                value={selectedFormChild}
                onChange={(e) => setSelectedFormChild(e.target.value)}
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
              <label className="block text-xs font-medium text-gray-600 mb-1">Ярилцлагын төрөл:</label>
              <select
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white"
              >
                <option value="Хүүхэдтэй хийсэн ярилцлага">Хүүхэдтэй хийсэн ярилцлага</option>
                <option value="Эцэг эхтэй хийсэн ярилцлага">Эцэг эхтэй хийсэн ярилцлага</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Ярилцлагын агуулга:</label>
              <textarea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Тохиролцсон болон ярилцсан зүйлсийг бичнэ үү..."
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-500 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Зураг / Бичлэг хавсаргах:</label>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100 cursor-pointer"
              />
              {mediaUrl && (
                <div className="mt-2 relative rounded-lg overflow-hidden border border-gray-200 max-h-32 flex items-center justify-center bg-black/5">
                  {mediaType === "image" ? (
                    <img src={mediaUrl} alt="Preview" className="h-28 object-cover rounded" />
                  ) : (
                    <video src={mediaUrl} controls className="h-28 rounded" />
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition"
            >
              Тэмдэглэл хадгалах
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 md:col-span-2">
          <h2 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-3 flex justify-between items-center">
            <span>Ярилцлагын сан ({filteredInterviews.length})</span>
            <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
              {selectedFilterChild}
            </span>
          </h2>

          <div className="space-y-4">
            {filteredInterviews.length > 0 ? (
              filteredInterviews.map((item) => (
                <div key={item.id} className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-pink-600 text-sm block">{item.child}</span>
                      <span className="text-[11px] font-semibold text-gray-500">{item.type}</span>
                    </div>
                    <span className="text-gray-400 flex items-center gap-1 font-medium">
                      <Calendar size={13} /> {item.date}
                    </span>
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed">{item.note}</p>

                  {item.mediaUrl && (
                    <div className="pt-2">
                      <p className="text-[11px] font-semibold text-gray-500 mb-1.5 flex items-center gap-1">
                        {item.mediaType === "image" ? <ImageIcon size={14} /> : <Video size={14} />} Хавсаргасан медиа:
                      </p>
                      {item.mediaType === "image" ? (
                        <img
                          src={item.mediaUrl}
                          alt="Interview Media"
                          className="w-full max-h-64 object-cover rounded-xl border border-gray-200"
                        />
                      ) : (
                        <video
                          src={item.mediaUrl}
                          controls
                          className="w-full max-h-64 rounded-xl border border-gray-200"
                        />
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-center text-gray-400 py-10">
                Сонгосон хүүхдэд хамаарах ярилцлагын тэмдэглэл одоогоор байхгүй байна.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}