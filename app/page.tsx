"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Бэлтгэл Б бүлэг ✨
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          2026.09.01 - 2027.05.31 хүртэлх ахицын тойм
        </p>
      </div>

      {/* График карт */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-gray-800">
            Бүлгийн хөгжлийн ахицын дундаж график
          </h2>
          <span className="bg-pink-50 text-pink-600 text-xs px-3 py-1 rounded-full font-semibold">
            Тогтмол өсөлттэй
          </span>
        </div>

        <div className="relative h-64 w-full bg-gradient-to-b from-pink-50/30 to-pink-100/20 rounded-xl p-4 border border-pink-50 flex flex-col justify-between">
          {/* Графикийн онооны шугамнуудын утга */}
          <div className="w-full flex justify-between text-[11px] text-gray-400 border-b border-gray-100 pb-1">
            <span>100</span>
          </div>
          <div className="w-full flex justify-between text-[11px] text-gray-400 border-b border-gray-100 pb-1">
            <span>75</span>
          </div>
          <div className="w-full flex justify-between text-[11px] text-gray-400 border-b border-gray-100 pb-1">
            <span>50</span>
          </div>
          <div className="w-full flex justify-between text-[11px] text-gray-400 border-b border-gray-100 pb-1">
            <span>25</span>
          </div>
          <div className="w-full flex justify-between text-[11px] text-gray-400">
            <span>0</span>
          </div>

          {/* Ягаан ахицын дүүргэлт */}
          <div className="absolute inset-x-4 bottom-8 top-16 bg-gradient-to-t from-pink-500/80 to-pink-400 clip-path-graph rounded-lg opacity-85 pointer-events-none"></div>

          {/* Саруудын нэрс */}
          <div className="w-full flex justify-between items-end text-[11px] text-gray-400 pt-2 z-10">
            <span>09 сар</span>
            <span>10 сар</span>
            <span>11 сар</span>
            <span>12 сар</span>
            <span>01 сар</span>
            <span>02 сар</span>
            <span>03 сар</span>
            <span>04 сар</span>
            <span>05 сар</span>
          </div>
        </div>
      </div>

      {/* Ононгийн гурван өнгөт карт */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-500 text-white p-6 rounded-2xl shadow-sm space-y-2">
          <p className="text-xs font-semibold">80 - 100 оноо</p>
          <h3 className="text-xl font-bold">Хангалттай эзэмшсэн</h3>
        </div>

        <div className="bg-orange-500 text-white p-6 rounded-2xl shadow-sm space-y-2">
          <p className="text-xs font-semibold">50 - 79 оноо</p>
          <h3 className="text-xl font-bold">Ахиж байна</h3>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-sm space-y-2">
          <p className="text-xs font-semibold">0 - 49 оноо</p>
          <h3 className="text-xl font-bold">Хөгжиж байна</h3>
        </div>
      </div>
    </div>
  );
}