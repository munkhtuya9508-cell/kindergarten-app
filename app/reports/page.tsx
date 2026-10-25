"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, TrendingUp, Eye, MessageSquare, Printer, FileBarChart, UserCheck, BarChart2 } from "lucide-react";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const childrenProgressData: Record<string, any> = {
  "1": {
    name: "А. Болд",
    scores: [
      { period: '09 сар', score: 45 },
      { period: '10 сар', score: 58 },
      { period: '11 сар', score: 65 },
      { period: '12 сар', score: 72 },
      { period: '01 сар', score: 78 },
      { period: '02 сар', score: 82 },
      { period: '03 сар', score: 85 },
    ],
    summary: "Бие даах чадвар болон нийгэмшихүйн хөгжилд өндөр ахиц гарсан."
  },
  "2": {
    name: "Б. Болор",
    scores: [
      { period: '09 сар', score: 40 },
      { period: '10 сар', score: 48 },
      { period: '11 сар', score: 55 },
      { period: '12 сар', score: 62 },
      { period: '01 сар', score: 68 },
      { period: '02 сар', score: 75 },
      { period: '03 сар', score: 80 },
    ],
    summary: "Урлаг, дүрслэх урлагийн даалгавруудыг сайн гүйцэтгэдэг."
  }
};

const classClassAverageData = [
  { period: '09 сар', classAvg: 42.5 },
  { period: '10 сар', classAvg: 53.0 },
  { period: '11 сар', classAvg: 60.0 },
  { period: '12 сар', classAvg: 67.0 },
  { period: '01 сар', classAvg: 73.0 },
  { period: '02 сар', classAvg: 78.5 },
  { period: '03 сар', classAvg: 82.5 },
];

export default function ReportPage() {
  const [reportType, setReportType] = useState<"class" | "individual">("class");
  const [selectedChildId, setSelectedChildId] = useState("1");

  const currentChild = childrenProgressData[selectedChildId];

  return (
    <div className="flex h-screen bg-slate-50 print:bg-white print:h-auto">
      <aside className="w-64 bg-white border-r p-6 space-y-6 print:hidden">
        <h1 className="text-xl font-bold text-pink-600">🌸 Хөгжлийн Хуудас</h1>
        <nav className="space-y-2 font-medium">
          <Link href="/" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-xl">
            <TrendingUp size={20} /> Нүүр
          </Link>
          <Link href="/children" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-xl">
            <Users size={20} /> Хүүхдүүд
          </Link>
          <Link href="/observations" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-xl">
            <Eye size={20} /> Ажиглалт
          </Link>
          <Link href="/interviews" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-xl">
            <MessageSquare size={20} /> Ярилцлага
          </Link>
          <Link href="/reports" className="flex items-center gap-3 p-3 bg-pink-50 text-pink-600 rounded-xl">
            <FileBarChart size={20} /> Тайлан & Хэвлэх
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 space-y-6 overflow-y-auto print:p-0 print:overflow-visible">
        <div className="flex flex-wrap justify-between items-center gap-4 print:hidden">
          <div className="flex gap-2 bg-slate-200/60 p-1 rounded-xl">
            <Button 
              variant={reportType === "class" ? "default" : "ghost"}
              onClick={() => setReportType("class")}
              className={reportType === "class" ? "bg-white text-slate-800 shadow-sm" : "text-slate-600"}
            >
              <BarChart2 size={18} className="mr-2 text-indigo-500" /> Ангийн нэгдсэн тайлан
            </Button>
            <Button 
              variant={reportType === "individual" ? "default" : "ghost"}
              onClick={() => setReportType("individual")}
              className={reportType === "individual" ? "bg-white text-slate-800 shadow-sm" : "text-slate-600"}
            >
              <UserCheck size={18} className="mr-2 text-pink-500" /> Хүүхэд тус бүрийн тайлан
            </Button>
          </div>

          {reportType === "individual" && (
            <select 
              value={selectedChildId}
              onChange={(e) => setSelectedChildId(e.target.value)}
              className="p-2 border rounded-xl bg-white shadow-sm"
            >
              <option value="1">А. Болд</option>
              <option value="2">Б. Болор</option>
            </select>
          )}

          <Button onClick={() => window.print()} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white gap-2 rounded-xl shadow-md">
            <Printer size={18} /> Хэвлэх / PDF
          </Button>
        </div>

        {/* АНГИЙН НЭГДСЭН БАГАНОН ГРАФИК */}
        {reportType === "class" && (
          <div className="bg-white p-8 rounded-2xl border print:border-none print:p-0 space-y-6 shadow-sm">
            <div className="border-b pb-4 text-center">
              <h1 className="text-xl font-bold text-slate-800">БЭЛТГЭЛ Б БҮЛГИЙН НЭГДСЭН ХӨГЖЛИЙН АХИЦЫН ТАЙЛАН</h1>
              <p className="text-sm text-slate-500 mt-1">2026 - 2027 Хичээлийн жил | Нийт хүүхэд: 24</p>
            </div>

            <div>
              <h3 className="font-bold text-slate-700 mb-3">Ангийн дундаж хөгжлийн ахиц (Баганаар):</h3>
              <div className="h-[300px] w-full border rounded-2xl p-4 bg-slate-50/50">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classClassAverageData}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1"/>
                        <stop offset="100%" stopColor="#a855f7"/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="period" stroke="#64748b" />
                    <YAxis domain={[0, 100]} stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff' }}
                      formatter={(val: any) => [`${val} оноо`, 'Дундаж']}
                    />
                    <Bar dataKey="classAvg" fill="url(#barGradient)" radius={[8, 8, 0, 0]} barSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="border p-4 rounded-xl bg-indigo-50/40 border-indigo-100 text-sm space-y-1">
              <h4 className="font-bold text-indigo-950">Ангийн нэгдсэн дүгнэлт:</h4>
              <p className="text-indigo-900">
                Суралцагчдын хөгжлийн ахиц 09 сараас 03 сарын хооронд дунджаар 42.5 онооноос 82.5 оноо хүрч <strong>40.0 оноогоор дээшилсэн</strong> байна.
              </p>
            </div>
          </div>
        )}

        {/* ХҮҮХЭД ТУС БҮРИЙН ӨНГӨЛӨГ AREA ГРАФИК */}
        {reportType === "individual" && (
          <div className="bg-white p-8 rounded-2xl border print:border-none print:p-0 space-y-6 shadow-sm">
            <div className="border-b pb-4 flex justify-between items-end">
              <div>
                <h1 className="text-xl font-bold text-slate-800">СУРАЛЦАГЧИЙН ХӨГЖЛИЙН АХИЦЫН ТАЙЛАН</h1>
                <p className="text-sm text-slate-600 mt-1">
                  <strong>Суралцагчийн нэр:</strong> {currentChild.name} | <strong>Бүлэг:</strong> Бэлтгэл Б
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-700 mb-3">Хүүхдийн сар сарын ахиц:</h3>
              <div className="h-[280px] w-full border rounded-2xl p-4 bg-slate-50/50">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentChild.scores}>
                    <defs>
                      <linearGradient id="childGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="period" stroke="#64748b" />
                    <YAxis domain={[0, 100]} stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff' }} />
                    <Area type="monotone" dataKey="score" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#childGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="border p-4 rounded-xl bg-pink-50/50 border-pink-100 text-sm space-y-1">
              <h4 className="font-bold text-pink-950">Ажиглалт ба Ярилцлагад үндэслэсэн Дүгнэлт:</h4>
              <p className="text-pink-900">{currentChild.summary}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}