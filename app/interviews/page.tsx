"use client";

import React, { useState } from "react";
import { ImageIcon, Video, Trash2, Send } from "lucide-react";

interface InterviewItem {
  id: string;
  childName: string;
  type: string;
  date: string;
  note: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
}

export default function InterviewsPage() {
  const childrenList = [
    "А. Болд (Бэлтгэл Б)",
    "Б. Болор (Бэлтгэл Б)",
    "Д. Бат (Бэлтгэл Б)",
  ];

  const [interviews, setInterviews] = useState<InterviewItem[]>([]);
  const [selectedChild, setSelectedChild] = useState(childrenList[0]);
  const [type, setType] = useState("Хүүхдэдтэй хийсэн ярилцлага");
  const [note, setNote] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaPreview(url);
      setMediaType(file.type.startsWith("video/") ? "video" : "image");
    }
  };

  const handleRemoveMedia = () => {
    setMediaPreview(null);
    setMediaType(null);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note) return;

    const newInterview: InterviewItem = {
      id: Date.now().toString(),
      childName: selectedChild,
      type,
      date: new Date().toISOString().split("T")[0],
      note,
      mediaUrl: mediaPreview || undefined,
      mediaType: mediaType || undefined,
    };

    setInterviews([newInterview, ...interviews]);
    setNote("");
    setMediaPreview(null);
    setMediaType(null);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Ярилцлага тэмдэглэх 💬
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Форм хэсэг */}
        <form
          onSubmit={handleAdd}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4"
        >
          <div>
            <h2 className="text-sm font-semibold text-gray-700">
              Ярилцлагын бүртгэл болон Медиа оруулж ирэх
            </h2>
          </div>

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
              Ярилцлагын төрөл:
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white"
            >
              <option>Хүүхдэдтэй хийсэн ярилцлага</option>
              <option>Эцэг эхтэй хийсэн ярилцлага</option>
              <option>Бусад асран хамгаалагчтай хийсэн ярилцлага</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Ярилцлагын агуулга:
            </label>
            <textarea
              rows={4}
              placeholder="Ярилцсан асуулт, хариулт болон онцлох тэмдэглэлийг бичнэ үү..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Зураг эсвэл Бичлэг оруулна уу:
            </label>
            <label className="cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-dashed border-pink-200 rounded-2xl bg-pink-50/20 hover:bg-pink-50/50 transition text-center">
              <div className="flex gap-2 text-pink-400 mb-2">
                <ImageIcon size={24} />
                <Video size={24} />
              </div>
              <p className="text-xs text-gray-500">
                Ярилцлагын баримтжуулах зураг болон бичлэг энд чирч оруулна уу
              </p>
              <p className="text-[10px] text-gray-400 mt-1">
                PNG, JPG, MP4, MOV файлууд дэмжигдэнэ
              </p>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {mediaPreview && (
              <div className="mt-3 relative flex items-center gap-2 bg-gray-50 p-2 rounded-xl">
                {mediaType === "image" ? (
                  <img
                    src={mediaPreview}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                ) : (
                  <video
                    src={mediaPreview}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <button
                  type="button"
                  onClick={handleRemoveMedia}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition"
          >
            <Send size={18} /> Ярилцлага хадгалах
          </button>
        </form>

        {/* Бүртгэгдсэн жагсаалт */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-800">Бүртгэгдсэн ярилцлагууд</h2>
          {interviews.length === 0 ? (
            <p className="text-xs text-gray-400">Одоогоор ярилцлага бүртгэгдээгүй байна.</p>
          ) : (
            interviews.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-2"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-pink-600">{item.childName}</span>
                  <span className="text-gray-400">{item.date}</span>
                </div>
                <span className="inline-block bg-pink-50 text-pink-600 text-[10px] px-2 py-0.5 rounded-full font-medium">
                  {item.type}
                </span>
                <p className="text-xs text-gray-600 leading-relaxed">{item.note}</p>
                {item.mediaUrl && (
                  <div className="pt-1">
                    {item.mediaType === "image" ? (
                      <img
                        src={item.mediaUrl}
                        alt="Media"
                        className="max-h-40 rounded-xl object-cover"
                      />
                    ) : (
                      <video
                        src={item.mediaUrl}
                        controls
                        className="max-h-40 rounded-xl"
                      />
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}