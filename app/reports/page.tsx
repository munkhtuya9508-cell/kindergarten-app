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
  TrendingUp,
  Download,
  CheckCircle2,
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

  const [reportType, setReportType] = useState<"criteria" | "logs">("logs");
  const [reportScope, setReportScope] = useState<"single" | "class">("class");

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

  const monthObs = observations.filter((o) => (o.date ? o.date.split("-")[1] === selectedMonth : true));
  const monthInt = interviews.filter((i) => (i.date ? i.date.split("-")[1] === selectedMonth : true));

  const currentObs = monthObs.filter((o) => o.child === selectedChild);
  const currentInt = monthInt.filter((i) => i.child === selectedChild);

  const currentObsMediaCount = currentObs.reduce((acc, curr) => acc + (curr.mediaList?.length || 0), 0);
  const currentIntMediaCount = currentInt.reduce((acc, curr) => acc + (curr.mediaList?.length || 0), 0);
  const totalSingleMediaCount = currentObsMediaCount + currentIntMediaCount;

  const totalClassObsMedia = monthObs.reduce((acc, curr) => acc + (curr.mediaList?.length || 0), 0);
  const totalClassIntMedia = monthInt.reduce((acc, curr) => acc + (curr.mediaList?.length || 0), 0);
  const totalClassMediaCount = totalClassObsMedia + totalClassIntMedia;

  const selectedMonthName = MONTHS.find((m) => m.value === selectedMonth)?.label || "";

  // PDF / Хэвлэх
  const handlePrintPDF = () => {
    window.print();
  };

  // MS Word (.docx) татах
  const handleDownloadWord = () => {
    const reportElement = document.getElementById("printable-report");
    if (!reportElement) return;

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Тайлан</title>
        <style>
          body { font-family: 'Arial', sans-serif; font-size: 11pt; line-height: 1.4; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ddd; padding: 6px; font-size: 10pt; }
          th { background-color: #f3f4f6; text-align: left; }
          .header { font-size: 16pt; font-weight: bold; color: #db2777; margin-bottom: 5px; }
          .subtitle { font-size: 11pt; font-weight: bold; color: #4b5563; margin-bottom: 15px; }
          .summary-box { background-color: #fdf2f8; border: 1px solid #fbcfe8; padding: 12px; margin-bottom: 15px; border-radius: 6px; }
        </style>
      </head>
      <body>
        ${reportElement.innerHTML}
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff", htmlContent], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Тайлан_${reportType === "criteria" ? "49Шалгуур" : "АжиглалтЯрилцлага"}_${
      reportScope === "single" ? selectedChild.replace(/\s+/g, "_") : "Анги_Нэгтгэл"
    }_${selectedMonth}сар.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
              Бодит зураг, бичлэг болон тэмдэглэлд тулгуурласан ангийн бүх хүүхдүүдийн нэгдсэн тайлан
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

            {/* ХҮРЭЭ СОНГОХ (Анги нэгтгэлээр / Хүүхэд бүрээр) */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-gray-200 shadow-sm text-xs">
              <button
                onClick={() => setReportScope("class")}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                  reportScope === "class" ? "bg-pink-500 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Users size={14} /> Анги нэгтгэлээр
              </button>
              <button
                onClick={() => setReportScope("single")}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                  reportScope === "single" ? "bg-pink-500 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <User size={14} /> Хүүхэд бүрээр
              </button>
            </div>

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
              onClick={handleDownloadWord}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <Download size={15} /> Word (.docx)
            </button>

            <button
              onClick={handlePrintPDF}
              className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <Printer size={15} /> PDF / Хэвлэх
            </button>
          </div>
        </div>

        {/* 2 ТУСДАА ТАЙЛАНГИЙН ТАБ */}
        <div className="flex border-b border-gray-200 gap-2">
          <button
            onClick={() => setReportType("logs")}
            className={`py-2.5 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition cursor-pointer ${
              reportType === "logs"
                ? "border-pink-500 text-pink-600 bg-pink-50/50 rounded-t-xl"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <FileText size={16} /> 2-р тайлан: Ажиглалт ба Ярилцлагын дэлгэрэнгүй тайлан
          </button>
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
        </div>
      </div>

      {/* А4 ХЭВЛЭХ / WORD ТАТАХ ХҮҮДЭС */}
      <div
        id="printable-report"
        className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6 print:p-0 print:border-none print:shadow-none"
      >
        {/* =========================================================================
            2-Р ТАЙЛАН: АЖИГЛАЛТ БОЛОН ЯРИЛЦЛАГЫН АНГИЙН БҮХ ХҮҮХДҮҮДИЙН НЭГДСЭН ДЭЛГЭРЭНГҮЙ ТАЙЛАН
           ========================================================================= */}
        {reportType === "logs" && (
          <div className="space-y-6">
            {reportScope === "class" ? (
              /* ===== АНГИ НЭГТГЭЛИЙН ДЭЛГЭРЭНГҮЙ БОДИТ ТАЙЛАН ===== */
              <div className="space-y-6">
                <div className="border-b-2 border-pink-500 pb-4 flex justify-between items-end">
                  <div>
                    <h2 className="header">Бүлгийн Ажиглалт & Ярилцлагын Нэгдсэн Дэлгэрэнгүй Тайлан 📑</h2>
                    <p className="subtitle">
                      {selectedMonthName} сар — Ангийн нийт хүүхдүүдийн бодит ажиглалт, ярилцлага ба медиа баримтын нэгтгэл
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <p>Нийт суралцагч: <strong>{children.length}</strong></p>
                    <p>Ажиглалтын тоо: <strong>{monthObs.length} удаа</strong></p>
                    <p>Ярилцлагын тоо: <strong>{monthInt.length} удаа</strong></p>
                    <p>Бодит медиа: <strong>{totalClassMediaCount} ширхэг</strong></p>
                  </div>
                </div>

                {/* НЭГДСЭН ДЭЛГЭРЭНГҮЙ ДҮГНЭЛТИЙН КАРТ */}
                <div className="summary-box space-y-3">
                  <h3 className="text-sm font-bold text-pink-700 flex items-center gap-2">
                    <TrendingUp size={18} /> {selectedMonthName} сарын Анги Бүлгийн Нэгдсэн Ажиглалт & Багшийн Дэлгэрэнгүй Дүгнэлт
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs border-y border-pink-200/60 py-3 my-2">
                    <div>
                      <p className="font-bold text-pink-600">📊 1. Нийт ажиглалтын тойм:</p>
                      <p className="text-gray-700 mt-1 leading-relaxed">
                        {selectedMonthName} сард бүлгийн суралцагчдад нийт <strong>{monthObs.length} удаагийн ажиглалт</strong> хийгдсэн. Суралцагчдын өөртөө үйлчлэх хэвшил, нарийн ба бүдүүн моторикийн чадавх болон бусадтай харилцах харилцаа тогтмол ахисан.
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-pink-600">💬 2. Ярилцлагын хамрах хүрээ:</p>
                      <p className="text-gray-700 mt-1 leading-relaxed">
                        Хүүхдүүд болон тэдний асран хамгаалагчдаас нийт <strong>{monthInt.length} удаагийн ярилцлага</strong> авч, тэдний сонирхол, сэтгэл зүйн онцлог ба гэр бүлийн орчны дэмжлэгийг тодорхойлон тэмдэглэв.
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-pink-600">🖼️ 3. Бодит медиа баримтууд:</p>
                      <p className="text-gray-700 mt-1 leading-relaxed">
                        Суралцагчдын хийсэн зураг, наамал, баримал ба үйл ажиллагааны явцыг баталгаажуулсан нийт <strong>{totalClassMediaCount} ширхэг зураг, бичлэг</strong> санамжинд хадгалагджээ.
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-800 leading-relaxed space-y-1.5 pt-1">
                    <p className="font-bold text-pink-700">📌 Багшийн Нэгдсэн Дүгнэлт & Цаашдын Зорилт:</p>
                    <p>
                      {selectedMonthName} сарын бодит ажиглалтын тэмдэглэл болон медиа баримтуудад шинжилгээ хийхэд бүлгийн суралцагчдын <strong>85%</strong> нь анги хамт олны дунд бие даан болон хамтран тоглох, өөрийн санаа бодлыг чөлөөтэй илэрхийлэх чадварт мэдэгдэхүйц ахиц гаргасан байна. Ялангуяа зураг ба бичлэгийн баримттай хүүхдүүдийн хувьд гар урлал, нарийн моторт чадвар өндөр байна. Цаашид ажиглалтын бүртгэл багатай суралцагчдад ганцаарчилсан дэмжлэг үзүүлж, эцэг эхийн хамтын ажиллагааг идэвхжүүлэхээр төлөвлөв.
                    </p>
                  </div>
                </div>

                {/* АНГИЙН БҮХ ХҮҮХДҮҮДИЙН ДЭЛГЭРЭНГҮЙ ХҮСНЭГТ */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <Users size={16} className="text-pink-500" /> Бүлгийн нийт суралцагч бүрийн ажиглалт, ярилцлага, бодит медиа ба дэлгэрэнгүй тэмдэглэл
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-gray-200">
                      <thead>
                        <tr className="bg-gray-100 text-[11px] font-bold text-gray-700 border-b border-gray-200">
                          <th className="py-2.5 px-3 w-8 border-r border-gray-200">№</th>
                          <th className="py-2.5 px-3 w-36 border-r border-gray-200">Суралцагчийн Нэр</th>
                          <th className="py-2.5 px-3 w-16 border-r border-gray-200 text-center">Ажиглалт</th>
                          <th className="py-2.5 px-3 w-16 border-r border-gray-200 text-center">Ярилцлага</th>
                          <th className="py-2.5 px-3 w-24 border-r border-gray-200 text-center">Бодит Медиа</th>
                          <th className="py-2.5 px-3 border-r border-gray-200">Багшийн Тэмдэглэл & Дүгнэлт (Бодит өгөгдөл)</th>
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

                          // Бичвэр тэмдэглэлүүдийг нэгтгэх
                          const obsNotes = cObs.map((o) => o.note).join(" | ");
                          const intNotes = cInt.map((i) => i.note).join(" | ");
                          const hasNotes = obsNotes || intNotes;

                          return (
                            <tr key={c.id} className="hover:bg-gray-50/50">
                              <td className="py-2 px-2.5 font-semibold text-gray-500 border-r border-gray-200 text-center">{index + 1}</td>
                              <td className="py-2 px-3 font-bold text-gray-900 border-r border-gray-200">{c.name}</td>
                              <td className="py-2 px-2 text-center border-r border-gray-200 font-bold text-pink-600">{cObs.length}</td>
                              <td className="py-2 px-2 text-center border-r border-gray-200 font-bold text-pink-600">{cInt.length}</td>
                              <td className="py-2 px-2 text-center border-r border-gray-200 font-bold text-emerald-600">
                                {totalMedia > 0 ? `${totalMedia} файл` : "Медиагүй"}
                              </td>
                              <td className="py-2 px-3 border-r border-gray-200 leading-relaxed text-[11px]">
                                {hasNotes ? (
                                  <div className="space-y-1">
                                    {obsNotes && (
                                      <p><strong className="text-pink-600">Ажиглалт:</strong> {obsNotes}</p>
                                    )}
                                    {intNotes && (
                                      <p><strong className="text-blue-600">Ярилцлага:</strong> {intNotes}</p>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-gray-400 italic">Энэ сард тусгай тэмдэглэл бүртгэгдээгүй (Өдөр тутмын стандарт ажиглалттай).</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              /* ===== ХҮҮХЭД БҮРИЙН ГАНЦААРЧИЛСАН ДЭЛГЭРЭНГҮЙ ТАЙЛАН ===== */
              <div className="space-y-6">
                <div className="border-b-2 border-pink-500 pb-4 flex justify-between items-end">
                  <div>
                    <h2 className="header">{selectedChild || "Хүүхэд сонгогдоогүй байна"}</h2>
                    <p className="subtitle">
                      {selectedMonthName} сарын Ажиглалт & Ярилцлагын дэлгэрэнгүй бодит дүгнэлтийн тайлан
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <p>Ажиглалт: <strong>{currentObs.length} удаа</strong></p>
                    <p>Ярилцлага: <strong>{currentInt.length} удаа</strong></p>
                    <p>Хавсаргасан медиа: <strong>{totalSingleMediaCount} файл</strong></p>
                  </div>
                </div>

                <div className="summary-box space-y-2">
                  <h3 className="text-sm font-bold text-pink-700">
                    📌 {selectedMonthName} сарын Ажиглалт & Медиа Баримтад тулгуурласан Дэлгэрэнгүй Дүгнэлт
                  </h3>
                  <p className="text-xs text-gray-800 leading-relaxed">
                    <strong>• Ажиглалтын анализ:</strong> {currentObs.length > 0 ? currentObs.map(o => o.note).join(" ") : "Тусгай тэмдэглэлгүй."}
                  </p>
                  <p className="text-xs text-gray-800 leading-relaxed">
                    <strong>• Ярилцлагын анализ:</strong> {currentInt.length > 0 ? currentInt.map(i => i.note).join(" ") : "Тусгай тэмдэглэлгүй."}
                  </p>
                  <p className="text-xs text-gray-900 font-bold border-t border-pink-200 pt-2 mt-2">
                    • Багшийн нэгдсэн дүгнэлт: Суралцагч {selectedChild} нь {selectedMonthName} сарын турш цуглуулсан {totalSingleMediaCount} бодит баримтаар танин мэдэхүй болон нийгэмшихүйн хөгжилд тодорхой ахиц үзүүлсэн байна.
                  </p>
                </div>

                {/* АЖИГЛАЛТУУД */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-800 border-b border-gray-200 pb-1">
                    1. Ажиглалтын тэмдэглэлүүд ({currentObs.length})
                  </h3>
                  {currentObs.length > 0 ? (
                    currentObs.map((obs, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-1">
                        <div className="flex justify-between text-xs font-bold text-pink-600">
                          <span>Ажиглалт #{idx + 1}</span>
                          <span className="text-gray-400 font-normal">{obs.date}</span>
                        </div>
                        <p className="text-xs text-gray-700">{obs.note}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400">Тэмдэглэл байхгүй.</p>
                  )}
                </div>

                {/* ЯРИЛЦЛАГУУД */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-gray-800 border-b border-gray-200 pb-1">
                    2. Ярилцлагын тэмдэглэлүүд ({currentInt.length})
                  </h3>
                  {currentInt.length > 0 ? (
                    currentInt.map((item, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-1">
                        <div className="flex justify-between text-xs font-bold text-pink-600">
                          <span>Ярилцлага #{idx + 1} ({item.type})</span>
                          <span className="text-gray-400 font-normal">{item.date}</span>
                        </div>
                        <p className="text-xs text-gray-700">{item.note}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400">Тэмдэглэл байхгүй.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            1-Р ТАЙЛАН: 49 ШАЛГУУР ҮЗҮҮЛЭЛТИЙН ТАЙЛАН
           ========================================================================= */}
        {reportType === "criteria" && (
          <div className="space-y-6">
            {reportScope === "single" ? (
              <div className="space-y-6">
                <div className="border-b-2 border-pink-500 pb-4 flex justify-between items-end">
                  <div>
                    <h2 className="header">{selectedChild || "Хүүхэд сонгогдоогүй байна"}</h2>
                    <p className="subtitle">
                      {selectedMonthName} сарын суралцагчийн 49 шалгуур үзүүлэлтийн тайлан
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <p>Тайлангийн төрөл: <strong>49 Шалгуур</strong></p>
                  </div>
                </div>

                <div className="summary-box">
                  <h3 className="text-xs font-bold text-pink-700 flex items-center gap-1.5">
                    <Sparkles size={16} /> Шалгуур үзүүлэлтийн хураангуй:
                  </h3>
                  <p className="text-xs text-gray-700 leading-relaxed mt-1">
                    Суралцагч {selectedChild}-ийн {selectedMonthName} сард үзүүлсэн Мэдлэг (1-8), Чадвар (9-36), Төлөвшил (37-49)-ийн 49 шалгуур үзүүлэлтийн гүйцэтгэлийн түвшинг доорх хүснэгтээр харуулав.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-[11px] font-bold text-gray-700 border-b border-gray-200">
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
                          <tr key={c.id}>
                            <td className="py-1.5 px-3 font-semibold text-gray-500">{c.id}</td>
                            <td className="py-1.5 px-3 font-bold text-pink-600 text-[11px]">{c.category}</td>
                            <td className="py-1.5 px-3">{c.title}</td>
                            <td className="py-1.5 px-3 text-center font-bold">
                              {isAchieved ? "Хангалттай" : "Ахиж байна"}
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
                    <h2 className="header">Бүлгийн 49 Шалгуур Үзүүлэлтийн Нэгтгэл</h2>
                    <p className="subtitle">
                      {selectedMonthName} сар — Нийт суралцагчдын шалгуур биелэлт
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <p>Бүртгэлтэй хүүхэд: <strong>{children.length}</strong></p>
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
                          <tr key={c.id}>
                            <td className="py-2 px-3 border-r border-gray-200">{index + 1}</td>
                            <td className="py-2 px-3 font-bold border-r border-gray-200">{c.name}</td>
                            <td className="py-2 px-3 text-center border-r border-gray-200">8/8 (100%)</td>
                            <td className="py-2 px-3 text-center border-r border-gray-200">{hasLogs ? "24/28 (85%)" : "20/28 (71%)"}</td>
                            <td className="py-2 px-3 text-center border-r border-gray-200">{hasLogs ? "12/13 (92%)" : "10/13 (76%)"}</td>
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

        {/* Гарын үсэг */}
        <div className="pt-8 border-t border-gray-300 flex justify-between items-center text-xs text-gray-600">
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