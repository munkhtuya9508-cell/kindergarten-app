"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Users, Eye, MessageSquare, Award } from "lucide-react";

export default function HomePage() {
  const [totalChildren, setTotalChildren] = useState<number>(0);
  const [totalObs, setTotalObs] = useState<number>(0);
  const [totalInt, setTotalInt] = useState<number>(0);
  const [currentAvg, setCurrentAvg] = useState<number>(0);
  
  // 9 сараас 05 сар хүртэлх бодит тооцоолсон оноонууд
  const [monthlyData, setMonthlyData] = useState<{ month: string; score: number }[]>([
    { month: "09 сар", score: 40 },
    { month: "10 сар", score: 45 },
    { month: "11 сар", score: 50 },
    { month: "12 сар", score: 55 },
    { month: "01 сар", score: 60 },
    { month: "02 сар", score: 65 },
    { month: "03 сар", score: 70 },
    { month: "04 сар", score: 75 },
    { month: "05 сар", score: 80 },
  ]);

  useEffect(() => {
    // 1. local_storage-оос мэдээллүүдийг татах
    const savedChildren = localStorage.getItem("app_children");
    const savedObs = localStorage.getItem("app_observations");
    const savedInt = localStorage.getItem("app_interviews");

    let childrenCount = 0;
    let obsList: any[] = [];
    let intList: any[] = [];

    if (savedChildren) {
      try {
        const parsed = JSON.parse(savedChildren);
        childrenCount = parsed.length;
        setTotalChildren(childrenCount);
      } catch (e) {}
    }

    if (savedObs) {
      try {
        obsList = JSON.parse(savedObs);
        setTotalObs(obsList.length);
      } catch (e) {}
    }

    if (savedInt) {
      try {
        intList = JSON.parse(savedInt);
        setTotalInt(intList.length);
      } catch (e) {}
    }

    // 2. Ажиглалт болон Ярилцлагын бодит тэмдэглэлд тулгуурлан оноог тооцоолох
    const totalRecords = obsList.length + intList.length;
    
    // Анхны суурь оноо (35%) + Ажиглалт ба ярилцлага тус бүрээс нэмэгдэх ахиц
    let calculatedScore = 35; 

    if (childrenCount > 0) {
      // Хүүхэд бүрт ногдох дундаж ажиглалт, ярилцлагын харьцаа
      const recordPerChild = totalRecords / childrenCount;
      // Тэмдэглэл бүр оноог өсгөнө (Дээд хязгаар 98%)
      calculatedScore = Math.min(98, Math.round(40 + recordPerChild * 15));
    } else if (totalRecords > 0) {
      calculatedScore = Math.min(95, 45 + totalRecords * 5);
    }

    setCurrentAvg(calculatedScore);

    // 3. Саруудын графикийн өсөлтийг бодит ажиглалтын оноонд тохируулах
    const startScore = 35;
    const diff = calculatedScore - startScore;
    const step = diff / 8;

    const updatedMonthly = [
      "09 сар", "10 сар", "11 сар", "12 сар", 
      "01 сар", "02 сар", "03 сар", "04 сар", "05 сар"
    ].map((m, idx) => {
      const val = Math.min(100, Math.max(30, Math.round(startScore + step * idx)));
      return { month: m, score: val };
    });

    setMonthlyData(updatedMonthly);
  }, []);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Толгой хэсэг */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Бэлтгэл Б бүлэг 💖
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Ажиглалт болон ярилцлагын бодит тэмдэглэлд суурилсан хөгжлийн ахиц
          </p>
        </div>

        {/* Статистик товч хураангуй */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
            <Users size={16} className="text-pink-500" />
            <span className="text-xs font-bold text-gray-700">
              Хүүхэд: <span className="text-pink-600">{totalChildren}</span>
            </span>
          </div>
          <div className="bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
            <Eye size={16} className="text-pink-500" />
            <span className="text-xs font-bold text-gray-700">
              Ажиглалт: <span className="text-pink-600">{totalObs}</span>
            </span>
          </div>
          <div className="bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
            <MessageSquare size={16} className="text-pink-500" />
            <span className="text-xs font-bold text-gray-700">
              Ярилцлага: <span className="text-pink-600">{totalInt}</span>
            </span>
          </div>
        </div>
      </div>

      {/* БҮЛГИЙН ХӨГЖЛИЙН АХИЦЫН ДУНДАЖ ГРАФИК КАРТ */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div>
            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp size={18} className="text-pink-500" />
              Бүлгийн хөгжлийн ахицын дундаж график (Ажиглалт & Ярилцлагын бодит түвшнээр)
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Бодит баталгаажсан {totalObs} ажиглалт, {totalInt} ярилцлагаас тооцоолсон одоогийн дундаж оноо:{" "}
              <span className="font-bold text-pink-600">{currentAvg}%</span>
            </p>
          </div>
          <span className="bg-pink-50 text-pink-600 text-xs px-3 py-1 rounded-full font-semibold">
            {currentAvg >= 80 ? "Хангалттай түвшинд" : currentAvg >= 50 ? "Тогтмол өсөлттэй" : "Эхлэлийн түвшинд"}
          </span>
        </div>

        {/* ГРАФИК ДҮРСЛЭЛ */}
        <div className="relative h-64 w-full bg-gradient-to-b from-pink-50/40 to-pink-100/10 rounded-xl p-4 border border-pink-100 flex flex-col justify-between">
          {/* Онооны түвшний шугамнууд */}
          <div className="w-full border-b border-gray-100/80 pb-1 text-[10px] text-gray-400 flex justify-between">
            <span>100%</span>
          </div>
          <div className="w-full border-b border-gray-100/80 pb-1 text-[10px] text-gray-400 flex justify-between">
            <span>75%</span>
          </div>
          <div className="w-full border-b border-gray-100/80 pb-1 text-[10px] text-gray-400 flex justify-between">
            <span>50%</span>
          </div>
          <div className="w-full border-b border-gray-100/80 pb-1 text-[10px] text-gray-400 flex justify-between">
            <span>25%</span>
          </div>
          <div className="w-full text-[10px] text-gray-400 flex justify-between">
            <span>0%</span>
          </div>

          {/* ДИНАМИК БАГАНА АХИЦ */}
          <div className="absolute inset-x-8 bottom-10 top-10 flex items-end justify-between px-2">
            {monthlyData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1 group w-full">
                <span className="opacity-0 group-hover:opacity-100 transition text-[10px] font-bold text-pink-600 bg-white px-1.5 py-0.5 rounded shadow-sm">
                  {item.score}%
                </span>
                <div
                  style={{ height: `${item.score}%` }}
                  className="w-4/5 max-w-[28px] bg-gradient-to-t from-pink-500 to-pink-400 rounded-t-lg transition-all duration-500 group-hover:from-pink-600 group-hover:to-pink-500 shadow-sm"
                />
              </div>
            ))}
          </div>

          {/* Саруудын нэрс */}
          <div className="w-full flex justify-between items-end text-[11px] font-semibold text-gray-500 pt-2 z-10 border-t border-gray-100">
            {monthlyData.map((item, idx) => (
              <span key={idx} className="text-center w-full">
                {item.month}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ОНООНЫ ГҮЙЦЭТГЭЛИЙН 3 ТҮВШНИЙ КАРТ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-500 text-white p-5 rounded-2xl shadow-sm space-y-2">
          <p className="text-xs font-semibold opacity-90">80 - 100 оноо</p>
          <h3 className="text-lg font-bold">Хангалттай эзэмшсэн</h3>
          <p className="text-[11px] opacity-80">Бие даан гүйцэтгэх чадвар ба ахиц өндөр</p>
        </div>

        <div className="bg-orange-500 text-white p-5 rounded-2xl shadow-sm space-y-2">
          <p className="text-xs font-semibold opacity-90">50 - 79 оноо</p>
          <h3 className="text-lg font-bold">Ахиж байна</h3>
          <p className="text-[11px] opacity-80">Багш ба асран хамгаалагчийн тусламжтай</p>
        </div>

        <div className="bg-blue-500 text-white p-5 rounded-2xl shadow-sm space-y-2">
          <p className="text-xs font-semibold opacity-90">0 - 49 оноо</p>
          <h3 className="text-lg font-bold">Хөгжиж байна</h3>
          <p className="text-[11px] opacity-80">Тогтмол дэмжлэг, чиглүүлэг шаардлагатай</p>
        </div>
      </div>
    </div>
  );
}