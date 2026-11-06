"use client";

import React, { useState, useEffect } from "react";
import { Plus, Calendar, Image as ImageIcon, Video, Trash2 } from "lucide-react";

interface Observation {
  id: number;
  child: string;
  date: string;
  note: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
}

export default function ObservationsPage() {
  const [childrenList, setChildrenList] = useState<string[]>([]);
  const [observations, setObservations] = useState<Observation[]>([]);

  const loadChildren = () => {
    const saved = localStorage.getItem("app_children");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const names = parsed.map((c: any) => `${c.name} (${c.group})`);
        setChildrenList(names);
      } catch (e) {
        console.error(e);
      }
    } else {
      setChildrenList(["А. Болд (Бэлтгэл Б)", "Б. Болор (Бэлтгэл Б)", "Д. Бат (Бэлтгэл Б)"]);
    }
  };

  useEffect(() => {
    loadChildren();

    const savedObs = localStorage.getItem("app_observations");
    if (savedObs) {
      try {
        setObservations(JSON.parse(savedObs));
      } catch (e) {
        console.error(e);
      }
    }

    window.addEventListener("storage", loadChildren);
    return () => window.removeEventListener("storage", loadChildren);
  }, []);

  const [selectedFilterChild, setSelectedFilterChild] = useState<string>("Бүх хүүхэд");
  const [selectedFormChild, setSelectedFormChild] = useState<string>("");
  // Өнөөдрийн огноог анхны утга болгож өгнө (засах боломжтой)
  const [obsDate, setObsDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  useEffect(() => {
    if (childrenList.length > 0 && !childrenList.includes(selectedFormChild)) {
      setSelectedFormChild(childrenList[0]);
    }
  }, [childrenList]);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaUrl(reader.result as string);
        setMediaType(file.type.startsWith("video") ? "video" : "image");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    const newObs: Observation = {
      id: Date.now(),
      child: selectedFormChild || childrenList[0],
      date: obsDate || new Date().toISOString().split("T")[0],
      note,
      mediaUrl: mediaUrl || undefined,
      mediaType,
    };

    const updated = [newObs, ...observations];
    setObservations(updated);
    localStorage.setItem("app_observations", JSON.stringify(updated));

    setNote("");
    setMediaUrl("");
  };

  const handleDeleteObs = (id: number) => {
    if (confirm("Энэ ажиглалтыг устгахдаа итгэлтэй байна уу?")) {
      const updated = observations.filter((item) => item.id !== id);
      setObservations(updated);
      localStorage.setItem("app_observations", JSON.stringify(updated));
    }
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
            Ажиглалт хийсэн огноогоо өөрөө сонгон оруулах боломжтой
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
            <Plus className="text-pink-500" size={18} /> Шинэ ажиглалт бичих
          </h2>
          <form onSubmit={handleAddObservation} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Хүүхэд сонгох:</label>
              <select
                value={selectedFormChild}
                onChange={(e) => setSelectedFormChild(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white font-medium text-gray-800"
              >
                {childrenList.map((child) => (
                  <option key={child} value={child}>
                    {child}
                  </option>
                ))}
              </select>
            </div>

            {/* Огноо сонгох хэсэг */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Ажиглалт хийсэн огноо:</label>
              <input
                type="date"
                value={obsDate}
                onChange={(e) => setObsDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:border-pink-500 bg-white"
                required
              />
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
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
            >
              Тэмдэглэл хадгалах
            </button>
          </form>
        </div>

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
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 flex items-center gap-1 font-medium">
                        <Calendar size={13} /> {obs.date}
                      </span>
                      <button
                        onClick={() => handleDeleteObs(obs.id)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed">{obs.note}</p>

                  {obs.mediaUrl && (
                    <div className="pt-2">
                      <p className="text-[11px] font-semibold text-gray-500 mb-1.5 flex items-center gap-1">
                        {obs.mediaType === "image" ? <ImageIcon size={14} /> : <Video size={14} />} Хавсаргасан медиа:
                      </p>
                      {obs.mediaType === "image" ? (
                        <img
                          src={obs.mediaUrl}
                          alt="Media"
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
                Сонгосон хүүхдэд хамаарах ажиглалтын тэмдэглэл байхгүй байна.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}