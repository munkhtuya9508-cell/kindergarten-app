"use client";

import React, { useState } from "react";
import { Plus, Calendar, User, Image as ImageIcon, Video, Trash2 } from "lucide-react";

interface Observation {
  id: string;
  childName: string;
  date: string;
  category: string;
  note: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
}

export default function ObservationsPage() {
  const [observations, setObservations] = useState<Observation[]>([
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
  const [mediaType, setMediaType] = useState<"image" | "video" | undefined>();

  // Зураг эсвэл бичлэг сонгох үед
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const url = URL.createObjectURL(file);
      setMediaPreview(url);
      setMediaType(file.type.startsWith("video/") ? "video" : "image");
    }
  };

  // Файл цэвэрлэх
  const removeMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    setMediaType(undefined);
  };

  // Шинэ ажиглалт хадгалах
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName || !note) return;

    const newObs: Observation = {
      id: Date.now().toString(),
      childName,
      date,
      category,
      note,
      mediaUrl: mediaPreview || undefined,
      mediaType: mediaType,
    };

    setObservations([newObs, ...observations]);

    // Форм цэвэрлэх
    setChildName("");
    setNote("");
    removeMedia();
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Хүүхдийн нэр */}
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-medium">
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

          {/* 2. Огноо сонгох */}
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-medium">
              Огноо сонгох
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white"
              required
            />
          </div>

          {/* 3. Хөгжлийн чиглэл */}
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-medium">
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

        {/* 4. Тэмдэглэл бичих хэсэг */}
        <div>
          <label className="block text-xs text-gray-500 mb-1 font-medium">
            Ажиглалтын тэмдэглэл
          </label>
          <textarea
            rows={3}
            placeholder="Ажиглагдсан ахиц, онцлогийг дэлгэрэнгүй бичнэ үү..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500"
            required
          ></textarea>
        </div>

        {/* 5. Зураг / Бичлэг оруулах хэсэг */}
        <div>
          <label className="block text-xs text-gray-500 mb-1 font-medium">
            Зураг эсвэл видео бичлэг хавсаргах
          </label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm text-gray-600 transition">
              <ImageIcon size={18} className="text-pink-500" />
              <Video size={18} className="text-pink-500" />
              <span>Зураг/Бичлэг сонгох</span>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaChange}
                className="hidden"
              />
            </label>

            {mediaPreview && (
              <div className="relative flex items-center gap-2 bg-pink-50 p-1.5 rounded-xl pr-3">
                {mediaType === "image" ? (
                  <img
                    src={mediaPreview}
                    alt="Preview"
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                ) : (
                  <video
                    src={mediaPreview}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                )}
                <span className="text-xs text-pink-600 truncate max-w-[120px]">
                  {mediaFile?.name}
                </span>
                <button
                  type="button"
                  onClick={removeMedia}
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Илгээх товч */}
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition"
        >
          <Plus size={18} /> Тэмдэглэл хадгалах
        </button>
      </form>

      {/* Жагсаалт харуулах */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-gray-800">
          Бүртгэгдсэн ажиглалтууд
        </h2>

        {observations.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3"
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-pink-600 flex items-center gap-1.5">
                  <User size={16} /> {item.childName}
                </span>
                <span className="bg-pink-50 text-pink-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
                  {item.category}
                </span>
              </div>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar size={14} /> {item.date}
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{item.note}</p>

            {/* Хавсаргасан файл байвал харуулах */}
            {item.mediaUrl && (
              <div className="pt-2">
                {item.mediaType === "image" ? (
                  <img
                    src={item.mediaUrl}
                    alt="Observation Attachment"
                    className="max-h-60 rounded-xl object-cover border border-gray-100"
                  />
                ) : (
                  <video
                    src