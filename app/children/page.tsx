"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, TrendingUp, Eye, MessageSquare, Plus, ChevronRight, UserPlus, FileBarChart } from "lucide-react";

export default function ChildrenPage() {
  const [childrenList, setChildrenList] = useState([
    { id: "1", name: "А. Болд", birthDate: "2021-05-12", group: "Бэлтгэл Б бүлэг" },
    { id: "2", name: "Б. Болор", birthDate: "2021-08-20", group: "Бэлтгэл Б бүлэг" },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newBirthDate, setNewBirthDate] = useState("");

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newChild = {
      id: Date.now().toString(),
      name: newName,
      birthDate: newBirthDate || "2021-01-01",
      group: "Бэлтгэл Б бүлэг",
    };

    setChildrenList([...childrenList, newChild]);
    setNewName("");
    setNewBirthDate("");
    setIsAdding(false);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r p-6 space-y-6">
        <h1 className="text-xl font-bold text-pink-600">🌸 Хөгжлийн Хуудас</h1>
        <nav className="space-y-2 font-medium">
          <Link href="/" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-lg">
            <TrendingUp size={20} /> Нүүр
          </Link>
          <Link href="/children" className="flex items-center gap-3 p-3 bg-pink-50 text-pink-600 rounded-lg">
            <Users size={20} /> Хүүхдүүд
          </Link>
          <Link href="/observations" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-lg">
            <Eye size={20} /> Ажиглалт
          </Link>
          <Link href="/interviews" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-lg">
            <MessageSquare size={20} /> Ярилцлага
          </Link>
          <Link href="/reports" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-lg">
            <FileBarChart size={20} /> Тайлан & Хэвлэх
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Бэлтгэл Б бүлгийн хүүхдүүд 👶</h2>
            <p className="text-slate-500">Хүүхдийн нэр дээр дарж дэлгэрэнгүй ахиц, ажиглалт, ярилцлагыг харна уу</p>
          </div>
          <Button onClick={() => setIsAdding(!isAdding)} className="bg-pink-500 hover:bg-pink-600 text-white gap-2">
            <UserPlus size={18} /> + Шинэ хүүхэд нэмэх
          </Button>
        </div>

        {/* Шинэ хүүхэд нэмэх маягт */}
        {isAdding && (
          <form onSubmit={handleAddChild} className="bg-white p-6 rounded-xl border border-pink-200 space-y-4">
            <h3 className="font-bold text-lg text-slate-700">Шинэ хүүхдийн мэдээлэл бүртгэх</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Овог, Нэр:</label>
                <input
                  type="text"
                  required
                  placeholder="ж: Д. Анар"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2 border rounded-lg outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Төрсөн огноо:</label>
                <input
                  type="date"
                  value={newBirthDate}
                  onChange={(e) => setNewBirthDate(e.target.value)}
                  className="w-full p-2 border rounded-lg outline-none focus:border-pink-500"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Болих</Button>
              <Button type="submit" className="bg-pink-500 text-white">Хадгалах</Button>
            </div>
          </form>
        )}

        {/* Хүүхдүүдийн карт жагсаалт */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {childrenList.map((child) => (
            <Link key={child.id} href={`/children/${child.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-200 hover:border-pink-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-pink-600 text-lg">{child.name}</CardTitle>
                  <ChevronRight size={20} className="text-slate-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 text-sm">Төрсөн огноо: {child.birthDate}</p>
                  <p className="text-slate-400 text-xs mt-1">{child.group}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}