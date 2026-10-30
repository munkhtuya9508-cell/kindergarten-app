"use client";

import React from "react";
import { TrendingUp, Users, Eye, MessageSquare } from "lucide-react";

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

      {/* Ахицын график ба үзүүлэлт */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-gray-800">
            Бүлгийн хөгжлийн ахицын дундаж график
          </h2>
          <span className="bg-pink-50 text-pink-600 text-xs px-3 py-1 rounded-full font-semibold">
            Тогтмол өсөлттэй
          </span>
        </div>
        <div className="h-48 bg-gradient-to-t from-pink-100/50 to-pink-500/80 rounded-2xl flex items-end p-4">
          <div className="w-full text-white text-xs font-bold flex justify-between">
            <span>09 сар</span>
            <span>11 сар</span>
            <span>01 сар</span>
            <span>03 сар</span>
            <span>05 сар</span>
          </div>
        </div>
      </div>

      {/* Статистик кардууд */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-500 text-white p-5 rounded-2xl shadow-sm space-y-1">
          <p className="text-xs opacity-90">80 - 100 оноо</p>
          <h3 className="text-base font-bold">Хангалттай эзэмшсэн</h3>
        </div>
        <div className="bg-orange-500 text-white p-5 rounded-2xl shadow-sm space-y-1">
          <p className="text-xs opacity-90">50 - 79 оноо</p>
          <h3 className="text-base font-bold">Ахиж байна</h3>
        </div>
        <div className="bg-blue-500 text-white p-5 rounded-2xl shadow-sm space-y-1">
          <p className="text-xs opacity-90">0 - 49 оноо</p>
          <h3 className="text-base font-bold">Хөгжиж байна</h3>
        </div>
      </div>
    </div>
  );
}