"use client";

import React, { useState } from "react";
import { Plus, Calendar, User, Image as ImageIcon, Video, Trash2 } from "lucide-react";

interface ObservationItem {
  id: string;
  childName: string;
  date: string;
  category: string;
  note: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
}

export default function ObservationsPage() {
  const [observations, setObservations] = useState<ObservationItem[]>([
    {
      id: "1",
      childName: "А. Болд",
      date: "2026-10-20",
      category: "Нийгэмшихүй",
      note: "Бусадтай тоглоомоо хуваалцаж, хамтран тоглох чадвар ажиглагдсан.",
    },
  ]);

  const [childName, setChildName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("Нийгэмшихүй");
  const [note, setNote] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);

  // Файл сонгох үед preview үүсгэх
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const url = URL.createObjectURL(file);
      setMediaPreview(url);
      if (file.type.startsWith("video/")) {
        setMediaType("video");
      } else {
        setMediaType("image");
      }
    }
  };

  const handleRemoveMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    setMediaType(null);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName || !note) return;

    const newObs: ObservationItem = {
      id: Date.now().toString(),
      childName,
      date,
      category,
      note,
      mediaUrl: mediaPreview || undefined,
      mediaType: mediaType || undefined,
    };

    setObservations([newObs, ...observations]);
    setChildName("");
    setNote("");
    setMediaFile(null);
    setMediaPreview(null);
    setMediaType(null);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Ажиглалтын Тэмдэглэл 👁️
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Хүүхдийн өдөр тутмын ахиц хөгжлийг огноо, зураг, бичлэгтэйгээр тэмдэглэх хэсэг
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Хүүхдийн нэр */}
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
              required
            />
          </div>

          {/* Огноо сонгох */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Ажиглалт хийсэн огноо
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white"
              required
            />
          </div>

          {/* Хөгжлийн чиглэл */}
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

        {/* Тэмдэглэл бичих талбар */}
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
            required
          ></textarea>
        </div>

        {/* Зураг / Бичлэг оруулах хэсэг */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Зураг эсвэл Бичлэг оруулах
          </label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-gray-50 hover:bg-pink-50 text-gray-600 hover:text-pink-600 border border-dashed border-gray-300 hover:border-pink-300 px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition">
              <ImageIcon size={18} />
              <Video size={18} />
              <span>Зураг/Бичлэг сонгох</span>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {mediaPreview && (