"use client";

import { use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, TrendingUp, Eye, MessageSquare, ArrowLeft, Calendar, FileBarChart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const childrenData: Record<string, any> = {
  "1": {
    name: "А. Болд",
    birthDate: "2021-05-12",
    group: "Бэлтгэл Б бүлэг",
    scores: [
      { period: '2026-09 сар', score: 45 },
      { period: '2026-10 сар', score: 58 },
      { period: '2026-11 сар', score: 65 },
      { period: '2026-12 сар', score: 72 },
      { period: '2027-01 сар', score: 78 },
      { period: '2027-02 сар', score: 82 },
      { period: '2027-03 сар', score: 85 },
    ],
    observations: [
      { date: "2026-10-15", text: "Сэдэвт тоглоомын үеэр бусадтайгаа дүр хувааж тоглож чадаж байна. Гар хурууны жижиг булчингийн хөгжил сайн.", score: 58 },
      { date: "2027-01-20", text: "Зураг дээрх үйл явдлыг дарааллын дагуу логик дараалалтай ярьж сурсан.", score: 78 },
    ],
    interviews: [
      { date: "2026-11-02", target: "Хүүхэдтэй хийсэн ярилцлага", text: "Өөрийн дуртай хичээл болон найзуудынхаа тухай бүрэн өгүүлбэрээр чөлөөтэй ярьсан." },
      { date: "2027-02-10", target: "Эцэг эхтэй хийсэн ярилцлага", text: "Гэртээ бие даан ном зааж унших чадвар дээшилсэн гэв." },
    ]
  },
  "2": {
    name: "Б. Болор",
    birthDate: "2021-08-20",
    group: "Бэлтгэл Б бүлэг",
    scores: [
      { period: '2026-09 сар', score: 40 },
      { period: '2026-10 сар', score: 48 },
      { period: '2026-11 сар', score: 55 },
      { period: '2026-12 сар', score: 62 },
    ],
    observations: [
      { date: "2026-09-18", text: "Бусадтайгаа тоглоход бага зэрэг ичимхий, багшийн дэмжлэг хэрэгтэй байна.", score: 40 },
    ],
    interviews: [
      { date: "2026-10-05", target: "Эцэг эхтэй хийсэн ярилцлага", text: "Гэртээ олон асуулт асуудаг, урлагийн үйл ажиллагаанд сонирхолтой." },
    ]
  }
};

export default function ChildDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const child = childrenData[id] || childrenData["1"];
  const currentScore = child.scores[child.scores.length - 1].score;

  const getStatus = (score: number) => {
    if (score >= 80) return { label: "Хангалттай эзэмшсэн", color: "text-green-600 bg-green-50 border-green-200" };
    if (score >= 50) return { label: "Ахиж байна", color: "text-yellow-600 bg-yellow-50 border-yellow-200" };
    return { label: "Хөгжиж байна", color: "text-blue-600 bg-blue-50 border-blue-200" };
  };

  const status = getStatus(currentScore);

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
        <Link href="/children">
          <Button variant="outline" className="gap-2 mb-2">
            <ArrowLeft size={16} /> Буцах
          </Button>
        </Link>

        <div className="bg-white p-6 rounded-xl border flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{child.name}</h2>
            <p className="text-slate-500 text-sm mt-1">Төрсөн огноо: {child.birthDate} | Бүлэг: {child.group}</p>
          </div>
          <div className={`px-4 py-2 border rounded-lg text-center ${status.color}`}>
            <p className="text-xs font-semibold">Одоогийн түвшин</p>
            <p className="text-lg font-bold">{currentScore} оноо - {status.label}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-slate-700">Хөгжлийн ахицын түвшин</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={child.scores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#ec4899" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-700 flex items-center gap-2">
                <Eye size={20} className="text-pink-500" /> Ажиглалтууд
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {child.observations.map((obs: any, idx: number) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {obs.date}</span>
                    <span className="font-bold text-pink-600">{obs.score} оноо</span>
                  </div>
                  <p className="text-sm text-slate-700">{obs.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-slate-700 flex items-center gap-2">
                <MessageSquare size={20} className="text-pink-500" /> Ярилцлагууд
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {child.interviews.map((int: any, idx: number) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {int.date}</span>
                    <span className="font-semibold text-slate-600">{int.target}</span>
                  </div>
                  <p className="text-sm text-slate-700">{int.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}