"use client";

import React, { useState } from "react";
import { Printer, FileText, Download } from "lucide-react";

export default function ReportsPage() {
  const childrenList = [
    "А. Болд (Бэлтгэл Б)",
    "Б. Болор (Бэлтгэл Б)",
    "Д. Бат (Бэлтгэл Б)",
  ];

  const [selectedChild, setSelectedChild] = useState(childrenList[0]);
  const [reportType, setReportType] = useState("Сар бүрийн ахицын тайлан");

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Тайлан & Хэвлэх 📄
        </h1>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <h2 className="text-sm font-semibold text-gray-700">
          Хүүхдийн ахиц хөгжлийн тайлан бэлтгэх, хэвлэх
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Хүүхэд сонгох:
            </label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white"
            >
              {childrenList.map((child) => (
                <option key={child} value={child}>
                  {child}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Тайлангийн төрөл:
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white"
            >
              <option>Сар бүрийн ахицын тайлан</option>
              <option>Хагас жилийн нэгдсэн тайлан</option>
              <option>Жилийн эцсийн хөгжлийн карт</option>
            </select>
          </div>
        </div>

        {/* Урьдчилан харах талбар */}
        <div className="p-6 border border-gray-100 rounded-xl bg-gray-50/50 space-y-3">
          <div className="flex items-center gap-2 text-pink-600 font-bold text-sm">
            <FileText size={18} /> {reportType}
          </div>
          <p className="text-xs text-gray-500">
            Сонгогдсон хүүхэд: <span className="font-semibold text-gray-800">{selectedChild}</span>
          </p>
          <p className="text-xs text-gray-400">
            Тайланд тухайн хүүхдийн ажиглалтын тэмдэглэлүүд, ярилцлагын тойм болон 5 чиглэлийн хөгжлийн онооны график багтана.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition"
          >
            <Printer size={18} /> Тайлан хэвлэх
          </button>
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-3 rounded-xl text-sm flex items-center gap-2 transition"
          >
            <Download size={18} /> PDF татах
          </button>
        </div>
      </div>
    </div>
  );
}