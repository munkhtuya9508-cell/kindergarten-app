"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Users, TrendingUp, MessageSquare, Eye, FileBarChart, Sparkles } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const academicYearData = [
  { period: '09 сар', score: 42 },
  { period: '10 сар', score: 52 },
  { period: '11 сар', score: 60 },
  { period: '12 сар', score: 68 },
  { period: '01 сар', score: 74 },
  { period: '02 сар', score: 79 },
  { period: '03 сар', score: 83 },
  { period: '04 сар', score: 88 },
  { period: '05 сар', score: 94 },
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r p-6 space-y-6">
        <h1 className="text-xl font-bold text-pink-600 flex items-center gap-2">
          🌸 Хөгжлийн Хуудас
        </h1>
        <nav className="space-y-2 font-medium">
          <Link href="/" className="flex items-center gap-3 p-3 bg-pink-50 text-pink-600 rounded-xl font-semibold shadow-sm">
            <TrendingUp size={20} /> Нүүр
          </Link>
          <Link href="/children" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
            <Users size={20} /> Хүүхдүүд
          </Link>
          <Link href="/observations" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
            <Eye size={20} /> Ажиглалт
          </Link>
          <Link href="/interviews" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
            <MessageSquare size={20} /> Ярилцлага
          </Link>
          <Link href="/reports" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
            <FileBarChart size={20} /> Тайлан & Хэвлэх
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              Бэлтгэл Б бүлэг <Sparkles className="text-amber-400 fill-amber-400" size={24} />
            </h2>
            <p className="text-slate-500 text-sm mt-1">2026.09.01 - 2027.05.31 хүртэлх ахицын тойм</p>
          </div>
        </div>

        {/* Өнгөлөг График Карт */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-white via-pink-50/30 to-purple-50/50 rounded-2xl overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-800 font-bold text-lg flex items-center justify-between">
              <span>Бүлгийн хөгжлийн ахицын дундаж график</span>
              <span className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-semibold">
                📈 Тогтмол өсөлттэй
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={academicYearData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="period" stroke="#94a3b8" tickLine={false} />
                  <YAxis domain={[0, 100]} stroke="#94a3b8" tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      borderRadius: '12px', 
                      color: '#fff',
                      border: 'none',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value: any) => [`${value} оноо`, 'Ахиц']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#ec4899" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Өнгөлөг Заагуур Картууд */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl shadow-md">
            <p className="text-xs font-medium opacity-90">80 - 100 оноо</p>
            <p className="text-xl font-bold mt-1">Хангалттай эзэмшсэн</p>
          </div>
          <div className="p-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl shadow-md">
            <p className="text-xs font-medium opacity-90">50 - 79 оноо</p>
            <p className="text-xl font-bold mt-1">Ахиж байна</p>
          </div>
          <div className="p-5 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-2xl shadow-md">
            <p className="text-xs font-medium opacity-90">0 - 49 оноо</p>
            <p className="text-xl font-bold mt-1">Хөгжиж байна</p>
          </div>
        </div>
      </main>
    </div>
  );
}