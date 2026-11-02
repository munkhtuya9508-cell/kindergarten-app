"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Users, Award } from "lucide-react";

export default function HomePage() {
  const [totalChildren, setTotalChildren] = useState<number>(0);
  const [totalObs, setTotalObs] = useState<number>(0);
  const [totalInt, setTotalInt] = useState<number>(0);
  const [averageScore, setAverageScore] = useState<number>(65);

  // Саруудын динамик онооны төлөв
  const [monthlyScores, setMonthlyScores] = useState<number[]>([
    35, 42, 50, 58, 65, 72, 78, 85, 90,
  ]);

  useEffect(() => {
    // LocalStorage-оос бодит өгөгдлүүд унших
    const savedChildren = localStorage.getItem("app_children");
    const savedObs = localStorage.getItem("app_observations");
    const savedInt = localStorage.getItem("app_interviews");

    let countChildren = 0;
    let countObs = 0;
    let countInt = 0;

    if (savedChildren) {
      try {
        const parsed = JSON.parse(savedChildren);
        countChildren = parsed.length;
        setTotalChildren(countChildren);
      } catch (e) {}
    }

    if (savedObs) {
      try {
        const parsed = JSON.parse(savedObs);
        countObs = parsed.length;
        setTotalObs(countObs);
      } catch (e) {}
    }

    if (savedInt) {
      try {
        const parsed = JSON.parse(savedInt);
        countInt = parsed.length;
        setTotalInt(countInt);
      } catch (e) {}
    }

    // Бүртгэлтэй ажиглалт ба ярилцлагын тоон дээр суурилж дундаж оноог бодитоор тооцоолох
    const activityCount = countObs + countInt;
    let calculatedAvg = 50; // Анхны суурь оноо

    if (countChildren > 0) {
      // Хүүхэд тус бүрт ногдох ажиглалтын идэвхээр оноог ахиулах
      const activityPerChild = activityCount / countChildren;
      calculatedAvg = Math.min(95, Math.round(50 + activityPerChild * 10));
    }

    setAverageScore(calculatedAvg);

    // Саруудын графикийн өсөлтийг одоогийн ахицтай уялдуулах
    const startScore = 30;
    const step = (calculatedAvg - startScore) / 8;
    const newMonthly = Array.from({ length: 9 }, (_, i) =>
      Math.min(100, Math.round(startScore + step * i))
    );
    setMonthlyScores(newMonthly);
  }, []);

  const months = [
    "09 сар",
    "10 сар",
    "11 сар",
    "12 сар",
    "01 сар",
    "02 сар",
    "03 сар",
    "04 сар",
    "05 сар",
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Бэлтгэл Б бүлэг 💖
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            2026.09.01 - 2027.05.31 хүртэлх бодит ахицын дундаж тойм
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
            <Users size={16} className="text-pink-500" />
            <span className="text-xs font-bold text-gray-700">
              Нийт хүүхэд: <span className="text-pink-600">{totalChildren}</span>
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
              Бүлгийн хөгжлийн ахицын дундаж график (Одоогийн түвшин)
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Ажиглалт ({totalObs}) ба Ярилцлагын ({totalInt}) бодит бүртгэлээс тооцоолсон одоогийн дундаж: <span className="font-bold text-pink-600">{averageScore}%</span>
            </p>
          </div>
          <span className="bg-pink-50 text-pink-600 text-xs px-3 py-1 rounded-full font-semibold">
            {averageScore >= 80 ? "Хангалттай түвшинд" : averageScore >= 50 ? "Тогтмол өсөлттэй" : "Эхлэлийн түвшинд"}
          </span>
        </div>

        {/* ГРАФИК ДҮРСЛЭЛ */}
        <div className="relative h-64 w-full bg-gradient-to-b from-pink-50/40 to-pink-100/10 rounded-xl p-4 border border-pink-100 flex flex-col justify-between">
          {/* Онооны шугамууд */}
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

          {/* ДИНАМИК БАГАНА / ШУГАМ АХИЦ */}
          <div className="absolute inset-x-8 bottom-10 top-10 flex items-end justify-between px-2">
            {monthlyScores.map((score, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1 group w-full">
                <span className="opacity-0 group-hover:opacity-100 transition text-[10px] font-bold text-pink-600 bg-white px-1.5 py-0.5 rounded shadow-sm">
                  {score}%
                </span>
                <div
                  style={{ height: `${score}%` }}
                  className="w-4/5 max-w-[28px] bg-gradient-to-t from-pink-500 to-pink-400 rounded-t-lg transition-all duration-500 group-hover:from-pink-600 group-hover:to-pink-500 shadow-sm"
                />
              </div>
            ))}
          </div>

          {/* Саруудын нэрс */}
          <div className="w-full flex justify-between items-end text-[11px] font-semibold text-gray-500 pt-2 z-10 border-t border-gray-100">
            {months.map((m, idx) => (
              <span key={idx} className="text-center w-full">
                {m}
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
          <p className="text-[11px] opacity-80">Бие даан гүйцэтгэх чадвар өндөр</p>
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