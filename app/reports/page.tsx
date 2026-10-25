"use client";

import React, { useState } from "react";
import { Printer, Download, FileText } from "lucide-react";

export default function ReportsPage() {
  const childrenList = [
    "А. Болд (Бэлтгэл Б)",
    "Б. Болор (Бэлтгэл Б)",
    "Д. Бат (Бэлтгэл Б)",
  ];

  const [selectedChild, setSelectedChild] = useState(childrenList[0]);
  const [reportType, setReportType] = useState("Сар бүрийн ахицын тайлан");

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Тайлан & Хэвлэх 📄
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Сонголт ба тохиргооны форм */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-700">
              Тайлан сонгох болон Хэвлэх тохиргоо
            </h2>
          </div>

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

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => window.print()}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition"
            >
              <Printer size={18} /> Тайлан хэвлэх
            </button>
            <button
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition"
            >
              <Download size={18} /> PDF татах
            </button>
          </div>
        </div>

        {/* Урьдчилан харах талбар */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-gray-800">Тайлан урьдчилан харах</h2>
          <div className="p-5 border border-pink-100 rounded-xl bg-pink-50/20 space-y-3">
            <div className="flex items-center gap-2 text-pink-600 font-bold text-sm">
              <FileText size={18} /> {reportType}
            </div>
            <p className="text-xs text-gray-600">
              Сонгосон хүүхэд: <span className="font-bold text-gray-900">{selectedChild}</span>
            </p>
            <hr className="border-gray-200" />
            <p className="text-xs text-gray-500 leading-relaxed">
              Энэхүү тайланд тухайн хүүхдийн хийсэн бүх ажиглалтын тэмдэглэлүүд, ярилцлагын товчоо болон 5 чиглэлийн хөгжлийн ахицын үзүүлэлтүүд багтан хэвлэгдэнэ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}