"use client";

import React, { useState } from "react";
import {
  Printer,
  Download,
  FileText,
  Eye,
  MessageSquare,
  Sparkles,
  Users,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

export default function ReportsPage() {
  const childrenList = [
    "Ангийн нэгдсэн тайлан (Бэлтгэл Б)",
    "А. Болд (Бэлтгэл Б)",
    "Б. Болор (Бэлтгэл Б)",
    "Д. Бат (Бэлтгэл Б)",
  ];

  const [selectedTarget, setSelectedTarget] = useState(childrenList[1]); // Default: А. Болд
  const [reportType, setReportType] = useState("Сар бүрийн ахицын тайлан");
  const [isGenerating, setIsGenerating] = useState(false);

  const isClassReport = selectedTarget === "Ангийн нэгдсэн тайлан (Бэлтгэл Б)";

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Тайлан & Хэвлэх 📄
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Хиймэл оюун ухаан (AI) ашиглан ажиглалт болон ярилцлагад үндэслэн автоматаар дүгнэлт боловсруулах
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* ТОХИРГООНЫ ФОРМ */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 md:col-span-1">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Sparkles className="text-pink-500" size={16} /> Тайлангийн тохиргоо
          </h2>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Тайлан гаргах хүүхэд / Анги:
            </label>
            <select
              value={selectedTarget}
              onChange={(e) => {
                setSelectedTarget(e.target.value);
                handleGenerateAI();
              }}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 bg-white font-medium text-gray-800"
            >
              {childrenList.map((target) => (
                <option key={target} value={target}>
                  {target}
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

          <button
            onClick={handleGenerateAI}
            className="w-full bg-pink-50 text-pink-600 border border-pink-200 hover:bg-pink-100 font-medium py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition"
          >
            <Sparkles size={16} /> AI Дүгнэлтийг дахин уншуулах
          </button>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => window.print()}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition"
            >
              <Printer size={18} /> Тайлан хэвлэх
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition">
              <Download size={18} /> PDF татах
            </button>
          </div>
        </div>

        {/* ТАЙЛАН УРЬДЧИЛАН ХАРАХ ХЭСЭГ */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 md:col-span-2">
          <div className="border-b border-gray-100 pb-4 flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <FileText className="text-pink-500" size={20} />
                {reportType}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {isClassReport ? "Бүх хүүхдүүдийн нэгдсэн тойм" : "Ганцаарчилсан хөгжлийн дүгнэлт"}
              </p>
            </div>
            <span className="bg-pink-50 text-pink-600 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
              {isClassReport ? <Users size={14} /> : <UserCheck size={14} />}
              {selectedTarget}
            </span>
          </div>

          {isGenerating ? (
            <div className="py-12 text-center space-y-3">
              <Sparkles className="animate-spin text-pink-500 mx-auto" size={32} />
              <p className="text-xs text-gray-500">AI тэмдэглэлүүдэд нэгтгэн шинжилгээ хийж байна...</p>
            </div>
          ) : isClassReport ? (
            /* 5. АНГИЙН НЭГДСЭН ДҮГНЭЛТ ТАЙЛАН */
            <div className="space-y-6">
              <div className="bg-pink-50/40 p-5 rounded-2xl border border-pink-100 space-y-3">
                <div className="flex items-center gap-2 text-pink-600 font-bold text-sm">
                  <Sparkles size={18} />
                  <span>Ангийн АИ Нэгдсэн Дүгнэлт (Бэлтгэл Б бүлэг)</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Бүлгийн нийт хүүхдүүдийн 85% нь Нийгэмшихүй болон Танин мэдэхүйн чадамжид өндөр ахицтай байна. Хүүхдүүдийн дунд хамтран тоглох болон баг бүлгээрээ даалгавар биелүүлэх чадвар жигд хөгжиж байна.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Ажиглалт ба Ярилцлагын ангийн ерөнхий статистика
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-gray-400">Нийт ажиглалт:</p>
                    <p className="text-lg font-bold text-pink-600 mt-1">24 удаа</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-gray-400">Нийт ярилцлага:</p>
                    <p className="text-lg font-bold text-pink-600 mt-1">12 удаа</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* 1, 2, 3, 4. ХҮҮХЭД БҮРИЙН АЖИГЛАЛТ, ЯРИЛЦЛАГА, AI ДҮГНЭЛТҮҮД */
            <div className="space-y-6">
              {/* 1. АЖИГЛАЛТЫГ АИ АШИГЛАН НЭГТГЭЖ ДҮГНЭХ */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                  <Eye className="text-pink-500" size={18} />
                  <span>1. Ажиглалтын тэмдэглэл & АИ Дүгнэлт</span>
                </div>
                <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 space-y-3">
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>• <span className="font-semibold text-gray-500">2026-10-10:</span> Найзуудтайгаа тоглоомоо хуваалцсан.</p>
                    <p>• <span className="font-semibold text-gray-500">2026-10-18:</span> Уран зургаар анхааралтай хичээллэсэн.</p>
                  </div>
                  <div className="pt-2 border-t border-gray-200/60 bg-white p-3 rounded-lg border border-pink-100">
                    <p className="text-xs font-bold text-pink-600 flex items-center gap-1">
                      <Sparkles size={14} /> АИ Ажиглалтын Дүгнэлт:
                    </p>
                    <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                      Хүүхэд нийгэмшихүй болон анхаарал төвлөрлийн чадвартай. Тоглоомын орчинд бусадтайгаа эелдэг харилцдаг.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. ЯРИЛЦЛАГЫГ АИ АШИГЛАН НЭГТГЭЖ ДҮГНЭХ */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                  <MessageSquare className="text-pink-500" size={18} />
                  <span>2. Ярилцлагын тэмдэглэл & АИ Дүгнэлт</span>
                </div>
                <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 space-y-3">
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>• <span className="font-semibold text-gray-500">Эцэг эх:</span> Гэрийн орчинд ном уншиж өгдөг.</p>
                    <p>• <span className="font-semibold text-gray-500">Хүүхэд:</span> Зураг зурах дуртайгаа хэлсэн.</p>
                  </div>
                  <div className="pt-2 border-t border-gray-200/60 bg-white p-3 rounded-lg border border-pink-100">
                    <p className="text-xs font-bold text-pink-600 flex items-center gap-1">
                      <Sparkles size={14} /> АИ Ярилцлагын Дүгнэлт:
                    </p>
                    <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                      Эцэг эхийн дэмжлэг сайн, хүүхэд өөрийн сонирхлоо чөлөөтэй илэрхийлэх чадвартай байна.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. АЖИГЛАЛТ БА ЯРИЛЦЛАГЫГ НЭГТГЭСЭН АИ ЭЦСИЙН ДҮГНЭЛТ */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <CheckCircle2 className="text-emerald-500" size={18} />
                  <span>3. Ажиглалт + Ярилцлагын АИ Нэгдсэн Эцсийн Дүгнэлт</span>
                </div>
                <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100 space-y-2">
                  <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                    Ажиглалт болон ярилцлагын дүн шинжилгээнээс үзэхэд <span className="font-bold">{selectedTarget}</span> нь бүтээлч сэтгэлгээ болон харилцааны өндөр чадамжтай байна. Гэр болон цэцэрлэгийн орчны хамтын ажиллагаа сайн хангагдсан тул цаашид бие даах байдлыг илүү дэмжих боломжтой.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}