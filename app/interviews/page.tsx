"use client";

import React, { useState, useEffect } from "react";
import { Plus, Calendar, Image as ImageIcon, Video, Trash2, X } from "lucide-react";

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

  const handleMultipleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newMediaItems: MediaItem[] = [];
    let processedCount = 0;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newMediaItems.push({
          url: reader.result as string,
          type: file.type.startsWith("video") ? "video" : "image",
        });
        processedCount++;

        if (processedCount === files.length) {
          setMediaList((prev) => [...prev, ...newMediaItems]);
        }
      };
      reader.readAsDataURL(file);
    });

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
    setInterviews(updated);
    localStorage.setItem("app_interviews", JSON.stringify(updated));

    setNote("");
    setMediaList([]);
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
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Ярилцлагын бүртгэл 💬
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Ярилцлагын тэмдэглэлд олон зураг болон бичлэг зэрэг хавсаргах
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
                Зураг / Бичлэг хавсаргах (Олноор сонгож болно):
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
                        title="Устгах"
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
                        <ImageIcon size={14} /> Хавсаргасан медиа сан ({item.mediaList.length}):
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {item.mediaList.map((m, idx) => (
                          <div key={idx} className="rounded-xl overflow-hidden border border-gray-200 aspect-video bg-black/5">
                            {m.type === "image" ? (
                              <img src={m.url} alt={`int-media-${idx}`} className="w-full h-full object-cover" />
                            ) : (
                              <video src={m.url} controls className="w-full h-full object-cover" />
                            )}
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
    </div>
  );
}