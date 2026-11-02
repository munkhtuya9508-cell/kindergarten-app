"use client";

import React, { useState, useEffect } from "react";
import { Eye, Plus, Calendar, Image as ImageIcon, Video } from "lucide-react";

interface Observation {
  id: number;
  child: string;
  date: string;
  note: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
}

export default function ObservationsPage() {
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
  const [note, setNote] = useState("");
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  const [observations, setObservations] = useState<Observation[]>([
    {
      id: 1,
      child: "А. Болд (Бэлтгэл Б)",
      date: "2026-10-10",
      note: "Найзуудтайгаа тоглоомоо хуваалцаж, хамтран бүтээлч тоглоом тоглож байна.",
      mediaUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&q=80",
      mediaType: "image",
    },
    {
      id: 2,
      child: "Б. Болор (Бэлтгэл Б)",
      date: "2026-10-18",
      note: "Уран зургаар дүрслэн зурахдаа өнгөний сонголт болон анхаарал төвлөрөл маш сайн байв.",
      mediaUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&q=80",
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

  const handleAddObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    const newObs: Observation = {
      id: Date.now(),
      child: selectedFormChild || childrenList[0],
      date: new Date().toISOString().split("T")[0],
      note,
      mediaUrl: mediaUrl || undefined,
      mediaType,
    };

    setObservations([newObs, ...observations]);
    setNote("");
    setMediaUrl("");
  };

  const filteredObservations =
    selectedFilterChild === "Бүх хүүхэд"
      ? observations
      : observations.filter((obs) => obs.child === selectedFilterChild);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Ажиглалтын тэмдэглэл 👁️
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Хүүхэд бүрээр ажиглалтын тэмдэглэл, зураг болон бичлэг харах
          </p>
        </div>

        {/* Хүүхдээр шүүх сонголт */}
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
        {/* Шинэ ажиглалт оруулах форм */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 md:col-span-1">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Plus className="text-pink-500" size={18} /> Шинэ ажиглалт бичих
          </h2>
          <form onSubmit={handleAddObservation} className="space-y-3">
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
              <label className="block text-xs font-medium text-gray-600 mb-1">Ажиглалтын тэмдэглэл:</label>
              <textarea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ажигласан ахиц, үйлдлийг бичнэ үү..."
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-500 bg-white"
                required
              />
            </div>

            {/* Зураг / Бичлэг хавсаргах */}
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

        {/* Тэмдэглэлүүдийн жагсаалт (Зураг/Бичлэгтэй) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 md:col-span-2">
          <h2 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-3 flex justify-between items-center">
            <span>Ажиглалтын сан ({filteredObservations.length})</span>
            <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
              {selectedFilterChild}
            </span>
          </h2>

          <div className="space-y-4">
            {filteredObservations.length > 0 ? (
              filteredObservations.map((obs) => (
                <div key={obs.id} className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-pink-600 text-sm">{obs.child}</span>
                    <span className="text-gray-400 flex items-center gap-1 font-medium">
                      <Calendar size={13} /> {obs.date}
                    </span>
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed">{obs.note}</p>

                  {/* Хавсаргасан Медиа харуулах хэсэг */}
                  {obs.mediaUrl && (
                    <div className="pt-2">
                      <p className="text-[11px] font-semibold text-gray-500 mb-1.5 flex items-center gap-1">
                        {obs.mediaType === "image" ? <ImageIcon size={14} /> : <Video size={14} />} Хавсаргасан медиа:
                      </p>
                      {obs.mediaType === "image" ? (
                        <img
                          src={obs.mediaUrl}
                          alt="Observation Media"
                          className="w-full max-h-64 object-cover rounded-xl border border-gray-200"
                        />
                      ) : (
                        <video
                          src={obs.mediaUrl}
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
                Сонгосон хүүхдэд хамаарах ажиглалтын тэмдэглэл одоогоор байхгүй байна.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}