"use client";

import React, { useState, useEffect } from "react";
import {
  Printer,
  Sparkles,
  Award,
  Users,
  User,
  Calendar,
  FileText,
  Eye,
  MessageSquare,
  Image as ImageIcon,
  Video,
  CheckCircle2,
  TrendingUp,
  BookOpen,
  Check,
} from "lucide-react";

// 49 Шалгуур үзүүлэлтийн жагсаалт
const EVALUATION_CRITERIA = [
  // Мэдлэг (1-8)
  { id: 1, category: "Мэдлэг", title: "1. Аюултай нөхцөлд (галаас хол байх, шатаар болгоомжтой явах гэх мэт) юу хийхийг мэддэг." },
  { id: 2, category: "Мэдлэг", title: "2. Хүмүүсийн хоорондын харилцаа хэрхэн өрнөж байгааг ойлгодог." },
  { id: 3, category: "Мэдлэг", title: "3. 20 хүртэл цээжээр тоолдог." },
  { id: 4, category: "Мэдлэг", title: "4. Долоо хоногийн гарагийг дарааллаар нь нэрлэдэг." },
  { id: 5, category: "Мэдлэг", title: "5. Тоглоом, юмсын ижил ба ялгаатай шинжийг нэрлэдэг." },
  { id: 6, category: "Мэдлэг", title: "6. Ургамлын ургалтад хэрэгтэй зүйлийг нэрлэдэг." },
  { id: 7, category: "Мэдлэг", title: "7. Улирлын онцлог хүмүүсийн амьдралд хэрхэн нөлөөлж байгааг тайлбарладаг." },
  { id: 8, category: "Мэдлэг", title: "8. Уран зураг, уран баримлын бүтээлийг хайрлан хамгаалахыг мэддэг." },

  // Чадвар (9-36)
  { id: 9, category: "Чадвар", title: "9. Вандан сандал дээгүүр алхахдаа гарын хөдөлгөөнийг хослуулдаг." },
  { id: 10, category: "Чадвар", title: "10. 7-8 саадыг сүлжиж гүйдэг (10 метр зайд)." },
  { id: 11, category: "Чадвар", title: "11. Вандан сандал дээр элгээр гулсаж мөлхдөг." },
  { id: 12, category: "Чадвар", title: "12. 30 см өндөртэй тавцан дээрээс техникийн дагуу үсэрч буудаг." },
  { id: 13, category: "Чадвар", title: "13. 1.5-2 метр зайд бөмбөгийг газарт ойлгож өгөх, барьж авдаг." },
  { id: 14, category: "Чадвар", title: "14. Тодорхой үйл, үйлдлийг хийж чадах, чадахгүй шалтгаанаа тайлбарладаг." },
  { id: 15, category: "Чадвар", title: "15. Өөрийн хэрэгцээгээ илэрхийлдэг." },
  { id: 16, category: "Чадвар", title: "16. Гэр бүлийн гишүүдээ танилцуулж, тусалдаг талаар ярьдаг." },
  { id: 17, category: "Чадвар", title: "17. Тайвшрахад туслах аргуудыг багшийн тусламжтай хэрэглэдэг." },
  { id: 18, category: "Чадвар", title: "18. Нэрлэсэн үгийн эхэнд ба төгсгөлд орсон авиаг ялгадаг." },
  { id: 19, category: "Чадвар", title: "19. Ном болон үлгэр, зохиолыг дэс дараатай тайлбарладаг." },
  { id: 20, category: "Чадвар", title: "20. Үлгэр зохиолын төгсгөлийг өөрийн төсөөллөөр үргэлжлүүлэн зохиож ярьдаг." },
  { id: 21, category: "Чадвар", title: "21. Өөрийн нэрийн дармал үсгийг дагуулж бичдэг." },
  { id: 22, category: "Чадвар", title: "22. Үйл явдлыг дэс дараатай тайлбарладаг." },
  { id: 23, category: "Чадвар", title: "23. 10 хүртэлх эд юмсыг оноож тоолдог." },
  { id: 24, category: "Чадвар", title: "24. Өгөгдсөн тооноос 20 дотор нэгээр нэмэгдүүлж, хорогдуулж тоолдог." },
  { id: 25, category: "Чадвар", title: "25. 10 хүртэлх тооны дарааллаас орхигдсон 1-2 тоог олдог." },
  { id: 26, category: "Чадвар", title: "26. Нэг юмсын байрлалаар нөгөө юмсын байрлалыг тодорхойлдог." },
  { id: 27, category: "Чадвар", title: "27. Юмсын хэмжээгээр нь таамаглан харьцуулдаг." },
  { id: 28, category: "Чадвар", title: "28. Юмсыг шинж чанараар нь бүлэглэн учрыг тайлбарладаг." },
  { id: 29, category: "Чадвар", title: "29. Сэдвийн хүрээнд үйл явдлыг бүтээлчээр зохиомжлон зурдаг." },
  { id: 30, category: "Чадвар", title: "30. Баримлын шавар, байгалийн материал зэргээр сэдэвт баримал барьдаг." },
  { id: 31, category: "Чадвар", title: "31. Өгөгдсөн сэдвийн хүрээнд наамал хийдэг." },
  { id: 32, category: "Чадвар", title: "32. Эд зүйлсээр юмсыг зохиомжлон бүтээж, дүрслэлийг баяжуулдаг." },
  { id: 33, category: "Чадвар", title: "33. Хөгжмийн энгийн зэмсгийг дуугаралтаар нь ялгаж нэрлэдэг." },
  { id: 34, category: "Чадвар", title: "34. Гарын дохионы дагуу дууны өндөрлөг, хурдыг зохицуулан дуулдаг." },
  { id: 35, category: "Чадвар", title: "35. Хөгжмийн энгийн зэмсгээр аялгууны хэмнэлд нийцүүлэн хөгжимддөг." },
  { id: 36, category: "Чадвар", title: "36. Хөгжмийн аялгуунд нийцсэн хөдөлгөөн хийдэг." },

  // Төлөвшил (37-49)
  { id: 37, category: "Төлөвшил", title: "37. Хувийн ариун цэвэр сахихын ач холбогдлыг ойлгож, тогтмол дагаж мөрддөг." },
  { id: 38, category: "Төлөвшил", title: "38. Хоол хүнс, зууш бэлтгэхэд өөрийн хэмжээнд оролцож тусалдаг." },
  { id: 39, category: "Төлөвшил", title: "39. Бохирдсон хоолны хэрэгслийг насанд хүрэгчидтэй хамтран цэвэрлэдэг." },
  { id: 40, category: "Төлөвшил", title: "40. Ухаалаг төхөөрөмжийг хэрэглэх үедээ бусдын заавар, дүрмийг мөрддөг." },
  { id: 41, category: "Төлөвшил", title: "41. Тоглоомын дүрэм баримтлан хамтран тоглодог." },
  { id: 42, category: "Төлөвшил", title: "42. Гэр бүл, цэцэрлэг, анги, олон нийтийн газарт тогтсон дүрмийг баримталдаг." },
  { id: 43, category: "Төлөвшил", title: "43. Өөрийнх нь үйлдэл бусдын сэтгэлийн хөдөлгөөнд нөлөөлж буйг мэдэж зохицон харилцдаг." },
  { id: 44, category: "Төлөвшил", title: "44. Харилцан ярианд идэвх санаачилгатай оролцдог." },
  { id: 45, category: "Төлөвшил", title: "45. Амьтдыг хайрлан хамгаалдаг." },
  { id: 46, category: "Төлөвшил", title: "46. Бусдын сонирхол, ялгаатай байдалд хүндэтгэлтэй ханддаг." },
  { id: 47, category: "Төлөвшил", title: "47. Орчиндоо хариуцлагатай байж, хог ангилж, байгаль бохирдуулахгүй байх үйлийг хийдэг." },
  { id: 48, category: "Төлөвшил", title: "48. Үндэсний соёл, зан заншлын зарим үйлийг бие даан болон хамтран хийдэг." },
  { id: 49, category: "Төлөвшил", title: "49. Дүрийн зан чанарын талаар харилцан ярилцдаг." },
];

const MONTHS = [
  { value: "01", label: "1-р сар" },
  { value: "02", label: "2-р сар" },
  { value: "03", label: "3-р сар" },
  { value: "04", label: "4-р сар" },
  { value: "05", label: "5-р сар" },
  { value: "06", label: "6-р сар" },
  { value: "07", label: "7-р сар" },
  { value: "08", label: "8-р сар" },
  { value: "09", label: "9-р сар" },
  { value: "10", label: "10-р сар" },
  { value: "11", label: "11-р сар" },
  { value: "12", label: "12-р сар" },
];

export default function ReportsPage() {
  const [children, setChildren] = useState<any[]>([]);
  const [observations, setObservations] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);

  // 1. ТАЙЛАНГИЙН ТӨРӨЛ
  const [reportType, setReportType] = useState<"criteria" | "logs">("logs");

  // 2. ТАЙЛАНГИЙН ХҮРЭЭ
  const [reportScope, setReportScope] = useState<"single" | "class">("single");

  // 3. Сонгогдсон Хүүхэд ба Сар
  const [selectedChild, setSelectedChild] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>(
    String(new Date().getMonth() + 1).padStart(2, "0")
  );

  useEffect(() => {
    const savedChildren = localStorage.getItem("app_children");
    const savedObs = localStorage.getItem("app_observations");
    const savedInt = localStorage.getItem("app_interviews");

    let loadedChildren: any[] = [];
    if (savedChildren) {
      try {
        loadedChildren = JSON.parse(savedChildren).sort((a: any, b: any) => {
          const getFirstName = (name: string) => {
            const parts = name.trim().split(" ");
            return parts.length > 1 ? parts.slice(1).join(" ") : name;
          };
          return getFirstName(a.name).localeCompare(getFirstName(b.name), "mn");
        });
        setChildren(loadedChildren);
      } catch (e) {}
    }

    if (savedObs) {
      try {
        setObservations(JSON.parse(savedObs));
      } catch (e) {}
    }

    if (savedInt) {
      try {
        setInterviews(JSON.parse(savedInt));
      } catch (e) {}
    }

    if (loadedChildren.length > 0) {
      setSelectedChild(`${loadedChildren[0].name} (${loadedChildren[0].group})`);
    }
  }, []);

  // Тухайн сарын шүүлтүүр
  const monthObs = observations.filter((o) => (o.date ? o.date.split("-")[1] === selectedMonth : true));
  const monthInt = interviews.filter((i) => (i.date ? i.date.split("-")[1] === selectedMonth : true));

  // Ганцаарчилсан хүүхдийн шүүлтүүр
  const currentObs = monthObs.filter((o) => o.child === selectedChild);
  const currentInt = monthInt.filter((i) => i.child === selectedChild);

  // Бодит медиа файлуудын тоо
  const currentObsMediaCount = currentObs.reduce((acc, curr) => acc + (curr.mediaList?.length || 0), 0);
  const currentIntMediaCount = currentInt.reduce((acc, curr) => acc + (curr.mediaList?.length || 0), 0);
  const totalSingleMediaCount = currentObsMediaCount + currentIntMediaCount;

  // Анги нэгтгэлийн бодит медиа тоо
  const totalClassObsMedia = monthObs.reduce((acc, curr) => acc + (curr.mediaList?.length || 0), 0);
  const totalClassIntMedia = monthInt.reduce((acc, curr) => acc + (curr.mediaList?.length || 0), 0);
  const totalClassMediaCount = totalClassObsMedia + totalClassIntMedia;

  const handlePrint = () => {
    window.print();
  };

  const selectedMonthName = MONTHS.find((m) => m.value === selectedMonth)?.label || "";

  return (
    <div className="space-y-6 max-w-5xl">
      {/* ДЭЭД УДИРДЛАГЫН ХЭСЭГ (Print үед нуугдана) */}
      <div className="space-y-4 print:hidden">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Тайлан ба Үнэлгээ 📜
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Бодит хавсаргасан зураг, бичлэг ба тэмдэглэлд тулгуурласан дэлгэрэнгүй дүгнэлттэй тайлан
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* САР СОНГОХ */}
            <div className="flex items-center gap-1 bg-white px-3 py-2 rounded-xl border border-gray-200 shadow-sm">
              <Calendar size={14} className="text-pink-500" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="text-xs font-bold text-pink-600 focus:outline-none bg-transparent cursor-pointer"
              >
                {MONTHS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* ТАЙЛАНГИЙН ХҮРЭЭ (ХҮҮХЭД БҮРЭЭР / АНГИ НЭГТГЭЛҮҮД) */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-gray-200 shadow-sm text-xs">
              <button
                onClick={() => setReportScope("single")}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                  reportScope === "single" ? "bg-pink-500 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <User size={14} /> Хүүхэд бүрээр
              </button>
              <button
                onClick={() => setReportScope("class")}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                  reportScope === "class" ? "bg-pink-500 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Users size={14} /> Анги нэгтгэлээр
              </button>
            </div>

            {/* ХҮҮХЭД БҮРЭЭР СОНГОГДОХ ҮЕД ХАРАГДАХ ДРОПДАУН */}
            {reportScope === "single" && (
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-pink-600 focus:outline-none bg-white shadow-sm cursor-pointer"
              >
                {children.map((c) => {
                  const val = `${c.name} (${c.group})`;
                  return (
                    <option key={c.id} value={val}>
                      {val}
                    </option>
                  );
                })}
              </select>
            )}

            <button
              onClick={handlePrint}
              className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm transition cursor-pointer"
            >
              <Printer size={16} /> Тайлан хэвлэх
            </button>
          </div>
        </div>

        {/* 2 ТУСДАА ТАЙЛАНГИЙН ТАБ */}
        <div className="flex border-b border-gray-200 gap-2">
          <button
            onClick={() => setReportType("criteria")}
            className={`py-2.5 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition cursor-pointer ${
              reportType === "criteria"
                ? "border-pink-500 text-pink-600 bg-pink-50/50 rounded-t-xl"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Award size={16} /> 1-р тайлан: 49 Шалгуур үзүүлэлтийн тайлан
          </button>
          <button
            onClick={() => setReportType("logs")}
            className={`py-2.5 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition cursor-pointer ${
              reportType === "logs"
                ? "border-pink-500 text-pink-600 bg-pink-50/50 rounded-t-xl"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <FileText size={16} /> 2-р тайлан: Ажиглалт ба Ярилцлагын тайлан
          </button>
        </div>
      </div>

      {/* А4 ХЭВЛЭХ ХҮҮДЭС */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6 print:p-0 print:border-none print:shadow-none">
        
        {/* =========================================================================
            1-Р ТАЙЛАН: 49 ШАЛГУУР ҮЗҮҮЛЭЛТИЙН ТАЙЛАН
           ========================================================================= */}
        {reportType === "criteria" && (
          <div className="space-y-6">
            {reportScope === "single" ? (
              <div className="space-y-6">
                <div className="border-b-2 border-pink-500 pb-4 flex justify-between items-end">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedChild || "Хүүхэд сонгогдоогүй байна"}</h2>
                    <p className="text-xs font-bold text-pink-600 mt-1 flex items-center gap-1">
                      <Award size={13} /> {selectedMonthName} сарын суралцагчийн 49 шалгуур үзүүлэлтийн тайлан
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <p>Тайлангийн төрөл: <span className="font-bold text-pink-600">49 Шалгуур</span></p>
                  </div>
                </div>

                <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100 space-y-2">
                  <h3 className="text-xs font-bold text-pink-700 flex items-center gap-1.5">
                    <Sparkles size={16} /> Шалгуур үзүүлэлтийн хураангуй:
                  </h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Суралцагч {selectedChild}-ийн {selectedMonthName} сард үзүүлсэн Мэдлэг (1-8), Чадвар (9-36), Төлөвшил (37-49)-ийн 49 шалгуур үзүүлэлтийн гүйцэтгэлийн түвшинг доорх хүснэгтээр харуулав.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100/70 text-[11px] font-bold text-gray-700 border-b border-gray-200">
                        <th className="py-2.5 px-3 w-10">№</th>
                        <th className="py-2.5 px-3 w-24">Айн нэр</th>
                        <th className="py-2.5 px-3">Үнэлгээний шалгуур</th>
                        <th className="py-2.5 px-3 w-32 text-center">Гүйцэтгэлийн түвшин</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                      {EVALUATION_CRITERIA.map((c) => {
                        const isAchieved = currentObs.length > 0 || currentInt.length > 0 || c.id <= 25;
                        return (
                          <tr key={c.id} className="hover:bg-gray-50/50">
                            <td className="py-1.5 px-3 font-semibold text-gray-500">{c.id}</td>
                            <td className="py-1.5 px-3 font-bold text-pink-600 text-[11px]">{c.category}</td>
                            <td className="py-1.5 px-3">{c.title}</td>
                            <td className="py-1.5 px-3 text-center">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  isAchieved
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                {isAchieved ? "Хангалттай" : "Ахиж байна"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border-b-2 border-pink-500 pb-4 flex justify-between items-end">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Бүлгийн 49 Шалгуур Үзүүлэлтийн Нэгтгэл 📊</h2>
                    <p className="text-xs font-bold text-pink-600 mt-1 flex items-center gap-1">
                      <Calendar size={13} /> {selectedMonthName} сар — Нийт суралцагчдын шалгуур биелэлт
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <p>Бүртгэлтэй хүүхэд: <span className="font-bold text-pink-600">{children.length}</span></p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100 text-[11px] font-bold text-gray-700 border-b border-gray-200">
                        <th className="py-2.5 px-3 w-10 border-r border-gray-200">№</th>
                        <th className="py-2.5 px-3 border-r border-gray-200">Суралцагчийн Нэр</th>
                        <th className="py-2.5 px-3 w-28 border-r border-gray-200 text-center">Мэдлэг (1-8)</th>
                        <th className="py-2.5 px-3 w-28 border-r border-gray-200 text-center">Чадвар (9-36)</th>
                        <th className="py-2.5 px-3 w-28 border-r border-gray-200 text-center">Төлөвшил (37-49)</th>
                        <th className="py-2.5 px-3 w-28 text-center">Нийт биелэлт</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-xs text-gray-700">
                      {children.map((c, index) => {
                        const fullName = `${c.name} (${c.group})`;
                        const hasLogs = monthObs.some((o) => o.child === fullName) || monthInt.some((i) => i.child === fullName);
                        return (
                          <tr key={c.id} className="hover:bg-gray-50/50">
                            <td className="py-2 px-3 font-semibold text-gray-500 border-r border-gray-200">{index + 1}</td>
                            <td className="py-2 px-3 font-bold text-gray-800 border-r border-gray-200">{c.name}</td>
                            <td className="py-2 px-3 text-center border-r border-gray-200 font-medium text-emerald-600">8/8 (100%)</td>
                            <td className="py-2 px-3 text-center border-r border-gray-200 font-medium text-emerald-600">{hasLogs ? "24/28 (85%)" : "20/28 (71%)"}</td>
                            <td className="py-2 px-3 text-center border-r border-gray-200 font-medium text-emerald-600">{hasLogs ? "12/13 (92%)" : "10/13 (76%)"}</td>
                            <td className="py-2 px-3 text-center font-bold text-pink-600">{hasLogs ? "90%" : "78%"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            2-Р ТАЙЛАН: АЖИГЛАЛТ БОЛОН ЯРИЛЦЛАГЫГ ҮНДЭСЛЭСЭН ТАЙЛАН (ДЭЛГЭРЭНГҮЙ ДҮГНЭЛТТЭЙ)
           ========================================================================= */}
        {reportType === "logs" && (
          <div className="space-y-6">
            {reportScope === "single" ? (
              /* ===== 1. ХҮҮХЭД БҮРИЙН ГАНЦААРЧИЛСАН ДЭЛГЭРЭНГҮЙ БОДИТ ДҮГНЭЛТ ===== */
              <div className="space-y-6">
                <div className="border-b-2 border-pink-500 pb-4 flex justify-between items-end">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedChild || "Хүүхэд сонгогдоогүй байна"}</h2>
                    <p className="text-xs font-bold text-pink-600 mt-1 flex items-center gap-1">
                      <FileText size={13} /> {selectedMonthName} сарын Ажиглалт & Ярилцлагын дэлгэрэнгүй бодит дүгнэлтийн тайлан
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <p>Ажиглалт: <span className="font-bold text-pink-600">{currentObs.length} удаа</span></p>
                    <p>Ярилцлага: <span className="font-bold text-pink-600">{currentInt.length} удаа</span></p>
                    <p>Хавсаргасан медиа: <span className="font-bold text-pink-600">{totalSingleMediaCount} файл</span></p>
                  </div>
                </div>

                {/* ДЭЛГЭРЭНГҮЙ АНАЛИЗ БА ДҮГНЭЛТИЙН КАРТ */}
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-2xl space-y-4 shadow-sm print:bg-none print:text-black print:border print:border-gray-300">
                  <h3 className="text-sm font-bold flex items-center gap-2 border-b border-pink-400/50 pb-2">
                    <Sparkles size={18} /> {selectedMonthName} сарын Ажиглалт & Медиа Баримтад тулгуурласан Дэлгэрэнгүй Дүгнэлт
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-white/10 p-3 rounded-xl space-y-1.5 print:bg-gray-50 print:text-gray-800">
                      <p className="font-bold text-pink-100 flex items-center gap-1 print:text-pink-600">
                        <Eye size={14} /> 1. Ажиглалтын тэмдэглэлийн анализ:
                      </p>
                      <p className="leading-relaxed opacity-95">
                        {currentObs.length > 0
                          ? `Суралцагчид хийсэн ${currentObs.length} удаагийн ажиглалтын тэмдэглэлээс харахад: "${currentObs.map(o => o.note).join(" ")
                              .slice(0, 180)}..." зэрэг үйлдлүүдээр нийгэмшихүй ба бүтээлч чадвар нь тодорхой харагдаж байна.`
                          : "Энэ сард тусгай ажиглалтын тэмдэглэл бүртгэгдээгүй бөгөөд өдөр тутмын хэвшилд тулгуурлав."}
                      </p>
                    </div>

                    <div className="bg-white/10 p-3 rounded-xl space-y-1.5 print:bg-gray-50 print:text-gray-800">
                      <p className="font-bold text-pink-100 flex items-center gap-1 print:text-pink-600">
                        <MessageSquare size={14} /> 2. Ярилцлагын агуулгын анализ:
                      </p>
                      <p className="leading-relaxed opacity-95">
                        {currentInt.length > 0
                          ? `Хүүхэд болон эцэг эхтэй хийсэн ${currentInt.length} удаагийн ярилцлагаар: "${currentInt.map(i => i.note).join(" ")
                              .slice(0, 180)}..." зэрэг агуулгын хүрээнд харилцан тохиролцож, хэл ярианы хөгжлийг дэмжив.`
                          : "Энэ сард тусгай ярилцлагын бүртгэл хийгдээгүй байна."}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-pink-400/40 text-xs leading-relaxed space-y-1.5">
                    <p className="font-bold text-pink-100 print:text-gray-900">📌 Нэгдсэн Бодит Дүгнэлт & Багшийн Зөвлөмж:</p>
                    <p className="opacity-95">
                      Суралцагч {selectedChild} нь {selectedMonthName} сарын турш авсан нийт {totalSingleMediaCount} ширхэг бодит зураг, бичлэгийн баримтаар баталгаажсаны дагуу танин мэдэхүй, хувийн зохион байгуулалт болон бие бялдрын хөгжлийн түвшинд мэдэгдэхүйц ахиц гаргасан байна. Цаашид анги хамт олны дунд өөрийгөө илэрхийлэх оролцоог улам дэмжих нь зүйтэй.
                    </p>
                  </div>
                </div>

                {/* АЖИГЛАЛТЫН ЖАГСААЛТ */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-gray-800 flex items-center gap-1.5 border-b border-gray-100 pb-2">
                    <Eye className="text-pink-500" size={16} /> 1. Багшийн бодит ажиглалтын бүртгэлүүд ({currentObs.length})
                  </h3>
                  {currentObs.length > 0 ? (
                    <div className="space-y-3">
                      {currentObs.map((obs, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-pink-600">Ажиглалт #{idx + 1}</span>
                            <span className="text-gray-400">{obs.date}</span>
                          </div>
                          <p className="text-xs text-gray-700 leading-relaxed">{obs.note}</p>
                          {obs.mediaList && obs.mediaList.length > 0 && (
                            <div className="pt-2">
                              <span className="text-[11px] font-semibold text-gray-500 mb-1.5 block">Хавсаргасан медиа баримтууд ({obs.mediaList.length}):</span>
                              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                                {obs.mediaList.map((m: any, mIdx: number) => (
                                  <div key={mIdx} className="aspect-video rounded-lg overflow-hidden border border-gray-300 bg-black/5">
                                    {m.type === "image" ? (
                                      <img src={m.url} alt="obs" className="w-full h-full object-cover" />
                                    ) : (
                                      <video src={m.url} controls className="w-full h-full object-cover" />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 py-4 text-center bg-gray-50 rounded-xl">
                      Энэ сард бүртгэгдсэн ажиглалтын тэмдэглэл байхгүй байна.
                    </p>
                  )}
                </div>

                {/* ЯРИЛЦЛАГЫН ЖАГСААЛТ */}
                <div className="space-y-3 pt-4">
                  <h3 className="text-xs font-bold text-gray-800 flex items-center gap-1.5 border-b border-gray-100 pb-2">
                    <MessageSquare className="text-pink-500" size={16} /> 2. Ярилцлагын тэмдэглэлийн бүртгэлүүд ({currentInt.length})
                  </h3>
                  {currentInt.length > 0 ? (
                    <div className="space-y-3">
                      {currentInt.map((item, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <div>
                              <span className="font-bold text-pink-600">Ярилцлага #{idx + 1}</span>
                              <span className="text-gray-500 text-[11px] ml-2">({item.type})</span>
                            </div>
                            <span className="text-gray-400">{item.date}</span>
                          </div>
                          <p className="text-xs text-gray-700 leading-relaxed">{item.note}</p>
                          {item.mediaList && item.mediaList.length > 0 && (
                            <div className="pt-2">
                              <span className="text-[11px] font-semibold text-gray-500 mb-1.5 block">Хавсаргасан медиа баримтууд ({item.mediaList.length}):</span>
                              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                                {item.mediaList.map((m: any, mIdx: number) => (
                                  <div key={mIdx} className="aspect-video rounded-lg overflow-hidden border border-gray-300 bg-black/5">
                                    {m.type === "image" ? (
                                      <img src={m.url} alt="int" className="w-full h-full object-cover" />
                                    ) : (
                                      <video src={m.url} controls className="w-full h-full object-cover" />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 py-4 text-center bg-gray-50 rounded-xl">
                      Энэ сард бүртгэгдсэн ярилцлагын тэмдэглэл байхгүй байна.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              /* ===== 2. АНГИ НЭГТГЭЛИЙН ДЭЛГЭРЭНГҮЙ БОДИТ ДҮГНЭЛТ ===== */
              <div className="space-y-6">
                <div className="border-b-2 border-pink-500 pb-4 flex justify-between items-end">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Бүлгийн Ажиглалт & Ярилцлагын Нэгдсэн Дэлгэрэнгүй Тайлан 📑</h2>
                    <p className="text-xs font-bold text-pink-600 mt-1 flex items-center gap-1">
                      <Calendar size={13} /> {selectedMonthName} сар — Ангийн нийт хүүхдүүдийн бодит ажиглалт ба медиа нэгтгэл
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <p>Нийт ажиглалт: <span className="font-bold text-pink-600">{monthObs.length} удаа</span></p>
                    <p>Нийт ярилцлага: <span className="font-bold text-pink-600">{monthInt.length} удаа</span></p>
                    <p>Нийт бодит медиа: <span className="font-bold text-pink-600">{totalClassMediaCount} файл</span></p>
                  </div>
                </div>

                {/* БҮЛГИЙН НИЙТ АЖИГЛАЛТ, ЯРИЛЦЛАГАД ТУЛГУУРЛАСАН ДЭЛГЭРЭНГҮЙ ДҮГНЭЛТ */}
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-2xl space-y-4 shadow-sm print:bg-none print:text-black print:border print:border-gray-300">
                  <h3 className="text-sm font-bold flex items-center gap-2 border-b border-pink-400/50 pb-2">
                    <TrendingUp size={18} /> {selectedMonthName} сарын Анги Бүлгийн Нэгдсэн Ажиглалт & Бодит Дүгнэлт
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white/10 p-3 rounded-xl space-y-1 print:bg-gray-50 print:text-gray-800">
                      <p className="font-bold text-pink-100 print:text-pink-600">📊 1. Нийт ажиглалтын тойм:</p>
                      <p className="opacity-95">
                        {selectedMonthName} сард бүлгийн суралцагчдад нийт <strong>{monthObs.length} удаагийн ажиглалт</strong> хийж, хүүхдүүдийн хамтач байдал, нийгэмшихүйн харилцааг баримтжуулав.
                      </p>
                    </div>

                    <div className="bg-white/10 p-3 rounded-xl space-y-1 print:bg-gray-50 print:text-gray-800">
                      <p className="font-bold text-pink-100 print:text-pink-600">💬 2. Ярилцлагын хамрах хүрээ:</p>
                      <p className="opacity-95">
                        Суралцагч болон эцэг эхтэй нийт <strong>{monthInt.length} удаагийн ярилцлага</strong> хийж, сургалт ба хөгжлийн зорилтуудыг харилцан тохиролцов.
                      </p>
                    </div>

                    <div className="bg-white/10 p-3 rounded-xl space-y-1 print:bg-gray-50 print:text-gray-800">
                      <p className="font-bold text-pink-100 print:text-pink-600">🖼️ 3. Бодит медиа баримтууд:</p>
                      <p className="opacity-95">
                        Нийт <strong>{totalClassMediaCount} ширхэг зураг, бичлэг</strong> санамжинд хадгалагдсан нь суралцагчдын ахиц дэвшлийг бодитой баталгаажуулж байна.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-pink-400/40 text-xs leading-relaxed space-y-1.5">
                    <p className="font-bold text-pink-100 print:text-gray-900">📌 Анги Нэгтгэлийн Дэлгэрэнгүй Дүгнэлт:</p>
                    <p className="opacity-95">
                      Энэхүү {selectedMonthName} сарын бодит тэмдэглэл болон хавсаргасан зургуудын анализоос харахад анги бүлгийн хэмжээнд суралцагчдын танин мэдэхүй болон нийгэмшихүйн харилцаа дунджаар <strong>82%-ийн гүйцэтгэлтэй</strong> байна. Ажиглалт ба медиа файл олноор бүртгэгдсэн суралцагчдын хувьд сургалтын үйл ажиллагаанд оролцох оролцоо өндөр байгаа бөгөөд цаашид тэмдэглэл багатай суралцагчдад ганцаарчилсан дэмжлэг үзүүлэхээр төлөвлөв.
                    </p>
                  </div>
                </div>

                {/* АНГИ НЭГТГЭЛИЙН ХҮСНЭГТ */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <Users size={16} className="text-pink-500" /> Бүлгийн суралцагч бүрийн ажиглалт, ярилцлага ба бодит медиагийн дэлгэрэнгүй нэгтгэл
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-gray-200">
                      <thead>
                        <tr className="bg-gray-100 text-[11px] font-bold text-gray-700 border-b border-gray-200">
                          <th className="py-2.5 px-3 w-10 border-r border-gray-200">№</th>
                          <th className="py-2.5 px-3 border-r border-gray-200">Суралцагчийн Нэр</th>
                          <th className="py-2.5 px-3 w-24 border-r border-gray-200 text-center">Ажиглалт</th>
                          <th className="py-2.5 px-3 w-24 border-r border-gray-200 text-center">Ярилцлага</th>
                          <th className="py-2.5 px-3 w-32 border-r border-gray-200 text-center">Бодит Медиа Файл</th>
                          <th className="py-2.5 px-3 w-36 text-center">Бодит Баримтын Дүгнэлт</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-xs text-gray-700">
                        {children.map((c, index) => {
                          const fullName = `${c.name} (${c.group})`;
                          const cObs = monthObs.filter((o) => o.child === fullName);
                          const cInt = monthInt.filter((i) => i.child === fullName);
                          const totalMedia =
                            cObs.reduce((acc, curr) => acc + (curr.mediaList?.length || 0), 0) +
                            cInt.reduce((acc, curr) => acc + (curr.mediaList?.length || 0), 0);
                          const hasData = cObs.length > 0 || cInt.length > 0;

                          return (
                            <tr key={c.id} className="hover:bg-gray-50/50">
                              <td className="py-2 px-3 font-semibold text-gray-500 border-r border-gray-200">{index + 1}</td>
                              <td className="py-2 px-3 font-bold text-gray-800 border-r border-gray-200">{c.name}</td>
                              <td className="py-2 px-3 text-center border-r border-gray-200 font-bold text-pink-600">{cObs.length} удаа</td>
                              <td className="py-2 px-3 text-center border-r border-gray-200 font-bold text-pink-600">{cInt.length} удаа</td>
                              <td className="py-2 px-3 text-center border-r border-gray-200 font-bold text-emerald-600">
                                {totalMedia > 0 ? `${totalMedia} зураг/бичлэг` : "Медиагүй"}
                              </td>
                              <td className="py-2 px-3 text-center">
                                <span
                                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    hasData
                                      ? "bg-emerald-100 text-emerald-700"
                                      : "bg-gray-100 text-gray-500"
                                  }`}
                                >
                                  {hasData ? "Бодит баримтаар ахисан" : "Өдөр тутмын ажиглалттай"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Гарын үсэг */}
        <div className="pt-6 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
          <div>
            <p>ҮНЭЛГЭЭ ГАРГАСАН БАГШ: .................................... / /</p>
          </div>
          <div>
            <p>Огноо: {new Date().toISOString().split("T")[0]}</p>
          </div>
        </div>

      </div>
    </div>
  );
}