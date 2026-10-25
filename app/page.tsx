"use client";

import React from "react";

export default function HomePage() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Гарчиг хэсэг */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Бэлтгэл Б бүлэг <span className="text-yellow-400">✨</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          2026.09.01 - 2027.05.31 хүртэлх ахицын тойм
        </p>
      </div>

      {/* График хэсэг */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-bold text-gray-800">
            Бүлгийн хөгжлийн ахицын дундаж график
          </h2>
          <span className="bg-pink-50 text-pink-500 text-xs font-semibold px-3 py-1 rounded-full">
            Тогтмол өсөлттэй
          </span>
        </div>

        <div className="relative h-64 w-full flex">
          <div className="flex flex-col justify-between text-xs text-gray-400 pr-4 pb-6">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>

          <div className="flex-1 relative flex flex-col justify-between border-b border-gray-100 pb-6">
            <div className="w-full border-b border-gray-50 h-0"></div>
            <div className="w-full border-b border-gray-50 h-0"></div>
            <div className="w-full border-b border-gray-50 h-0"></div>
            <div className="w-full border-b border-gray-50 h-0"></div>

            <svg
              className="absolute inset-0 h-full w-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#fbcfe8" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <polygon
                points="0,60 100,10 100,100 0,100"
                fill="url(#gradient)"
              />
              <polyline
                fill="none"
                stroke="#ec4899"
                strokeWidth="3"
                points="0,60 100,10"
              />
            </svg>

            <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-400 px-2">
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
      </div>

      {/* Онооны картнууд */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="bg-emerald-500 text-white rounded-2xl p-5 shadow-sm">
          <div className="text-xs opacity-90 font-medium">80 - 100 оноо</div>
          <div className="text-lg font-bold mt-1">Хангалттай эзэмшсэн</div>
        </div>

        <div className="bg-orange-500 text-white rounded-2xl p-5 shadow-sm">
          <div className="text-xs opacity-90 font-medium">50 - 79 оноо</div>
          <div className="text-lg font-bold mt-1">Ахиж байна</div>
        </div>

        <div className="bg-blue-500 text-white rounded-2xl p-5 shadow-sm">
          <div className="text-xs opacity-90 font-medium">0 - 49 оноо</div>
          <div className="text-lg font-bold mt-1">Хөгжиж байна</div>
        </div>
      </div>
    </div>
  );
}