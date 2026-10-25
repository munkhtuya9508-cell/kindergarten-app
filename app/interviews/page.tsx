"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, TrendingUp, Eye, MessageSquare, FileBarChart, Send, Image, Video } from "lucide-react";

export default function InterviewsPage() {
  const [selectedChild, setSelectedChild] = useState("А. Болд");
  const [target, setTarget] = useState("Хүүхэдтэй хийсэн ярилцлага");
  const [note, setNote] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${selectedChild} - ${target} ярилцлага болон медиа файл амжилттай хадгалагдлаа!`);
    setNote("");
    setFiles(null);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r p-6 space-y-6">
        <h1 className="text-xl font-bold text-pink-600">🌸 Хөгжлийн Хуудас</h1>
        <nav className="space-y-2 font-medium">
          <Link href="/" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-lg">
            <TrendingUp size={20} /> Нүүр
          </Link>
          <Link href="/children" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-lg">
            <Users size={20} /> Хүүхдүүд
          </Link>
          <Link href="/observations" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-lg">
            <Eye size={20} /> Ажиглалт
          </Link>
          <Link href="/interviews" className="flex items-center gap-3 p-3 bg-pink-50 text-pink-600 rounded-lg">
            <MessageSquare size={20} /> Ярилцлага
          </Link>
          <Link href="/reports" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-lg">
            <FileBarChart size={20} /> Тайлан & Хэвлэх
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <h2 className="text-2xl font-bold">Ярилцлага тэмдэглэх 💬</h2>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Ярилцлагын бүртгэл болон Медиа оруулах</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Хүүхэд сонгох:</label>
                <select 
                  value={selectedChild} 
                  onChange={(e) => setSelectedChild(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-white"
                >
                  <option value="А. Болд">А. Болд (Бэлтгэл Б)</option>
                  <option value="Б. Болор">Б. Болор (Бэлтгэл Б)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ярилцлагын төрөл:</label>
                <select 
                  value={target} 
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-white"
                >
                  <option value="Хүүхэдтэй хийсэн ярилцлага">Хүүхэдтэй хийсэн ярилцлага</option>
                  <option value="Эцэг эхтэй хийсэн ярилцлага">Эцэг эхтэй хийсэн ярилцлага</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ярилцлагын агуулга:</label>
                <textarea 
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ярилцсан асуулт, хариулт болон онцлох тэмдэглэлийг бичнэ үү..."
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Зураг эсвэл Бичлэг оруулах:</label>
                <div className="border-2 border-dashed border-slate-300 p-6 rounded-lg text-center bg-slate-50 hover:bg-slate-100 cursor-pointer relative">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*,video/*" 
                    onChange={(e) => setFiles(e.target.files)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex justify-center gap-2 text-slate-500 mb-2">
                    <Image size={24} />
                    <Video size={24} />
                  </div>
                  <p className="text-sm text-slate-600 font-medium">Ярилцлагын баримтжуулах зураг болон бичлэг энд чирч оруулна уу</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, MP4, MOV файлууд дэмжигдэнэ</p>
                </div>
                {files && files.length > 0 && (
                  <div className="mt-2 text-xs text-slate-600 font-medium">
                    Сонгосон файл: {files.length} файл
                  </div>
                )}
              </div>

              <Button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white w-full gap-2">
                <Send size={18} /> Ярилцлага хадгалах
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}