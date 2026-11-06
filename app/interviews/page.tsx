"use client";

import React, { useState, useEffect } from "react";
import { Plus, Calendar, Image as ImageIcon, Video, Trash2, X, Maximize2 } from "lucide-react";

interface MediaItem {
  url: string;
  type: "image" | "video";
}

interface Interview {
  id: number;
  child: string;
  type: string;
  date: string;
  note: string;
  mediaList?: MediaItem[];
}

export default function InterviewsPage() {
  const [childrenList, setChildrenList] = useState<string[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  const loadChildren = () => {
    const saved = localStorage.getItem("app_children");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const sorted = parsed.sort((a: any, b: any) => {
          const getFirstName = (name: string) => {
            const parts = name.trim().split(" ");
            return parts.length > 1 ? parts.slice(1).join(" ") : name;
          };
          return getFirstName(a.name).localeCompare(getFirstName(b.name), "mn");
        });
        const names = sorted.map((c: any) => `${c.name} (${c.group})`);
        setChildrenList(names);
      } catch (e) {
        console.error(e);
      }
    } else {
      setChildrenList(["А. Болд (Бэлтгэл Б)", "Д. Бат (Бэлтгэл Б)", "Б. Болор (Бэлтгэл Б)"]);
    }
  };

  useEffect(() => {
    loadChildren();

    const savedInt = localStorage.getItem("app_interviews");
    if (savedInt) {
      try {
        setInterviews(JSON.parse(savedInt));
      } catch (e) {
        console.error(e);
      }
    }

    window.addEventListener("storage", loadChildren);
    return () => window.removeEventListener("storage", loadChildren);
  }, []);

  const [selectedFilterChild, setSelectedFilterChild] = useState<string>("Бүх хүүхэд");
  const [selectedFormChild, setSelectedFormChild] = useState<string>("");
  const [interviewType, setInterviewType] = useState("Хүүхэдтэй хийсэн ярилцлага");
  const [interviewDate, setInterviewDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);

  useEffect(() => {
    if (childrenList.length > 0 && !childrenList.includes(selectedFormChild)) {
      setSelectedFormChild(childrenList[0]);
    }
  }, [childrenList]);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleMultipleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newMediaItems: MediaItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image")) {
        const compressedUrl = await compressImage(file);
        newMediaItems.push({ url: compressedUrl, type: "image" });
      } else {
        const reader = new FileReader();
        const videoUrl = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        newMediaItems.push({ url: videoUrl, type: "video" });
      }
    }

    setMediaList((prev) => [...prev, ...newMediaItems]);
    e.target.value = "";
  };

  const removeMediaItem = (index: number) => {
    setMediaList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    const newInterview: Interview = {
      id: Date.now(),
      child: selectedFormChild || childrenList[0],
      type: interviewType,
      date: interviewDate || new Date().toISOString().split("T")[0],
      note,
      mediaList: mediaList.length > 0 ? mediaList : undefined,
    };

    const updated = [newInterview, ...interviews];
    try {
      localStorage.setItem("app_interviews", JSON.stringify(updated));
      setInterviews(updated);
      setNote("");
      setMediaList([]);
    } catch (error) {
      alert("Санамж дүүрсэн байна! Цөөн эсвэл бага хэмжээтэй зураг хавсаргана уу.");
    }
  };

  const handleDeleteInterview = (id: number) => {
    if (confirm("Энэ ярилцлагыг устгахдаа итгэлтэй байна уу?")) {
      const updated = interviews.filter((item) => item.id !== id);
      setInterviews(updated);
      localStorage.setItem("app_interviews", JSON.stringify(updated));
    }
  };

  const filteredInterviews =
    selectedFilterChild === "Бүх хүүхэд"
      ? interviews
      : interviews.filter((item) => item.child === selectedFilterChild);

  return (
    <div className="space-y-6 max-w-5xl relative">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Ярилцлагын бүртгэл 💬
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Зураг болон бичлэг дээр дарж бүтэн дэлгэцээр томруулан үзэх боломжтой
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
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white font-medium text-gray-800"
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
              <label className="block text-xs font-medium text-gray-600 mb-1">Ярилцлага хийсэн огноо:</label>
              <input
                type="date"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:border-pink-500 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Ярилцлагын агуулга:</label>
              <textarea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Тохиролцсон зүйлсийг бичнэ үү..."
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-pink-500 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Зураг / Бичлэг хавсаргах:
              </label>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleMultipleMediaUpload}
                className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100 cursor-pointer"
              />

              {mediaList.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2 border border-gray-100 p-2 rounded-xl bg-gray-50 max-h-48 overflow-y-auto">
                  {mediaList.map((item, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square bg-black/10">
                      {item.type === "image" ? (
                        <img src={item.url} alt={`preview-${index}`} className="w-full h-full object-cover" />
                      ) : (
                        <video src={item.url} className="w-full h-full object-cover" />
                      )}
                      <button
                        type="button"
                        onClick={() => removeMediaItem(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
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
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 flex items-center gap-1 font-medium">
                        <Calendar size={13} /> {item.date}
                      </span>
                      <button
                        onClick={() => handleDeleteInterview(item.id)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed">{item.note}</p>

                  {item.mediaList && item.mediaList.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[11px] font-semibold text-gray-500 mb-1.5 flex items-center gap-1">
                        <ImageIcon size={14} /> Хавсаргасан медиа ({item.mediaList.length}) - Дарж бүтэн үзэх:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {item.mediaList.map((m, idx) => (
                          <div
                            key={idx}
                            onClick={() => setActiveMedia(m)}
                            className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-video bg-gray-900 cursor-pointer hover:opacity-90 transition"
                          >
                            {m.type === "image" ? (
                              <img src={m.url} alt={`int-media-${idx}`} className="w-full h-full object-cover" />
                            ) : (
                              <video src={m.url} className="w-full h-full object-cover pointer-events-none" />
                            )}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white gap-1 text-xs font-bold">
                              <Maximize2 size={16} /> Бүтэн үзэх
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-center text-gray-400 py-10">
                Сонгосон хүүхдэд хамаарах ярилцлагын тэмдэглэл байхгүй байна.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* БҮТЭН ДЭЛГЭЦЭЭР ХАРУУЛАХ MODAL LIGHTBOX */}
      {activeMedia && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setActiveMedia(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute -top-10 right-0 text-white bg-white/20 hover:bg-white/40 p-2 rounded-full transition cursor-pointer"
            >
              <X size={20} />
            </button>

            {activeMedia.type === "image" ? (
              <img
                src={activeMedia.url}
                alt="Full preview"
                className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />
            ) : (
              <video
                src={activeMedia.url}
                controls
                autoPlay
                className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}