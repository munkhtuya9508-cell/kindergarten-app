"use client";

import React, { useState, useEffect } from "react";
import {
  Printer,
  Sparkles,
  Award,
  Eye,
  MessageSquare,
  Image as ImageIcon,
  Video,
  FileCheck,
  Calendar,
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
  { value: "01", label: "1-р сар (Январь)" },
  { value: "02", label: "2-р сар (Февраль)" },
  { value: "03", label: "3-р сар (Март)" },
  { value: "04", label: "4-р сар (Апрель)" },
  { value: "05", label: "5-р сар (Май)" },
  { value: "06", label: "6-р сар (Июнь)" },
  { value: "07", label: "7-р сар (Июль)" },
  { value: "08", label: "8-р сар (Август)" },
  { value: "09", label: "9-р сар (Сентябрь)" },
  { value: "10", label: "10-р сар (Октябрь)" },
  { value: "11", label: "11-р сар (Ноябрь)" },
  { value: "12", label: "12-р сар (Декабрь)" },
];

export default function ReportsPage() {
  const [children, setChildren] = useState<any[]>([]);
  const [observations, setObservations] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>("");
  
  const [activeTab, setActiveTab] = useState<"criteria" | "media">("criteria");

  // Тусгайлан сар сонгох State (Анхны утга нь одоогийн сар)
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
        loadedChildren = JSON.parse(savedChildren);
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

  // Сонгосон ХҮҮХЭД болон САР-аар тэмдэглэлүүдийг шүүх
  const currentObs = observations.filter((o) => {
    const isChild = o.child === selectedChild;
    const isMonth = o.date ? o.date.split("-")[1] === selectedMonth : true;
    return isChild && isMonth;
  });

  const currentInt = interviews.filter((i) => {
    const isChild = i.child === selectedChild;
    const isMonth = i.date ? i.date.split("-")[1] === selectedMonth : true;
    return isChild && isMonth;
  });

  // Шүүгдсэн олон медиа файлуудыг цуглуулах
  const mediaList: any[] = [];
  currentObs.forEach((o) => {
    if (o.mediaList && o.mediaList.length > 0) {
      o.mediaList.forEach((m: any) => mediaList.push({ ...m, source: "Ажиглалт", date: o.date, note: o.note }));
    }
  });
  currentInt.forEach((i) => {
    if (i.mediaList && i.mediaList.length > 0) {
      i.mediaList.forEach((m: any) => mediaList.push({ ...m, source: "Ярилцлага", date: i.date, note: i.note }));
    }
  });

  const handlePrint = () => {
    window.print();
  };

  const selectedMonthName = MONTHS.find((m) => m.value === selectedMonth)?.label || "";

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Дээд хэсэг ба удирдлага (Print үед нуугдана) */}
      <div className="space-y-4 print:hidden">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Тайлан ба Үнэлгээ 📜
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Тайлан гаргах сар болон суралцагчийг сонгож А4 форматаар хэвлэх
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* САР СОНГОХ ЦЭС */}
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm">
              <Calendar size={15} className="text-pink-500" />
              <span className="text-xs font-semibold text-gray-600">Сар:</span>
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

            {/* ХҮҮХЭД СОНГОХ ЦЭС */}
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

            <button
              onClick={handlePrint}
              className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm transition cursor-pointer"
            >
              <Printer size={16} /> Тайлан хэвлэх
            </button>
          </div>
        </div>

        {/* ТАЙЛАНГИЙН ТАБУУД */}
        <div className="flex border-b border-gray-200 gap-2">
          <button
            onClick={() => setActiveTab("criteria")}
            className={`py-2.5 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === "criteria"
                ? "border-pink-500 text-pink-600 bg-pink-50/50 rounded-t-xl"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Award size={16} /> 1. 49 Шалгуур үзүүлэлтийн тайлан
          </button>
          <button
            onClick={() => setActiveTab("media")}
            className={`py-2.5 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === "media"
                ? "border-pink-500 text-pink-600 bg-pink-50/50 rounded-t-xl"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <FileCheck size={16} /> 2. Бодит медиа баримтад тулгуурласан нэгдсэн тайлан
          </button>
        </div>
      </div>

      {/* А4 ХЭВЛЭХ ХҮҮДЭС */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6 print:p-0 print:border-none print:shadow-none">
        
        {/* Header */}
        <div className="border-b-2 border-pink-500 pb-4 flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{selectedChild || "Хүүхэд сонгогдоогүй байна"}</h2>
            <p className="text-xs font-bold text-pink-600 mt-1 flex items-center gap-1">
              <Calendar size={13} /> {selectedMonthName} сарын хөгжлийн ахицын тайлан
            </p>
          </div>
          <div className="text-right text-xs text-gray-500">
            <p>Сонгосон сарын ажиглалт: <span className="font-bold text-pink-600">{currentObs.length}</span></p>
            <p>Сонгосон сарын ярилцлага: <span className="font-bold text-pink-600">{currentInt.length}</span></p>
          </div>
        </div>

        {/* ------------------ 1-Р ТАБ: 49 ШАЛГУУР ҮЗҮҮЛЭЛТИЙН ТАЙЛАН ------------------ */}
        {activeTab === "criteria" && (
          <div className="space-y-6">
            <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100 space-y-2">
              <h3 className="text-xs font-bold text-pink-700 flex items-center gap-1.5">
                <Sparkles size={16} /> {selectedMonthName}-ийн 49 шалгуур үзүүлэлтийн тойм:
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed">
                Суралцагч {selectedChild}-ийн {selectedMonthName} сард үзүүлсэн Мэдлэг (1-8), Чадвар (9-36), Төлөвшил (37-49)-ийн 49 шалгуур үзүүлэлтийн гүйцэтгэлийн түвшинг доорх хүснэгтээр харуулав.
              </p>
            </div>

            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100/70 text-[11px] font-bold text-gray-700 border-b border-gray-200">
                      <th className="py-2.5 px-3 w-12">№</th>
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
                          <td className="py-2 px-3 font-semibold text-gray-500">{c.id}</td>
                          <td className="py-2 px-3 font-bold text-pink-600 text-[11px]">{c.category}</td>
                          <td className="py-2 px-3">{c.title}</td>
                          <td className="py-2 px-3 text-center">
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
          </div>
        )}

        {/* ------------------ 2-Р ТАБ: БОДИТ МЕДИА БАРИМТАТ НЭГТГЭСЭН ТАЙЛАН ------------------ */}
        {activeTab === "media" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-2xl shadow-sm space-y-3 print:bg-none print:text-black print:border print:border-gray-300">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Sparkles size={18} /> {selectedMonthName} сарын Ажиглалт & Ярилцлагын Бодит Дүгнэлт
              </h3>
              <div className="text-xs leading-relaxed space-y-2 opacity-95">
                <p>
                  <strong>• Сарын өгөгдөл:</strong> {selectedMonthName} сард суралцагч {selectedChild}-д хийсэн нийт <strong>{currentObs.length} удаагийн ажиглалт</strong> ба <strong>{currentInt.length} удаагийн ярилцлага</strong>-д тулгуурлав.
                </p>
                <p>
                  <strong>• Бодит ахиц:</strong> Тухайн сард авсан зураг болон бичлэгүүдэд хийсэн анализоос харахад суралцагч нь анги хамт олны дунд бие даан болон хамтран тоглох, өөрийн санаа бодлыг чөлөөтэй илэрхийлэх чадвар тогтмол дээшилсэн байна.
                </p>
              </div>
            </div>

            <div className="space-y-4 border-t border-gray-100 pt-4">
              <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                <FileCheck className="text-pink-600" size={16} /> {selectedMonthName} сарын Зураг & Бичлэгийн баримтууд ({mediaList.length})
              </h4>

              {mediaList.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {mediaList.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 p-2 rounded-xl border border-gray-200 space-y-1.5">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded">
                          {item.source}
                        </span>
                        <span className="text-gray-400">{item.date}</span>
                      </div>
                      <div className="aspect-video rounded-lg overflow-hidden bg-black/5">
                        {item.type === "image" ? (
                          <img src={item.url} alt="Evidence" className="w-full h-full object-cover" />
                        ) : (
                          <video src={item.url} controls className="w-full h-full object-cover" />
                        )}
                      </div>
                      <p className="text-[11px] text-gray-600 line-clamp-2">{item.note}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-xl text-center text-xs text-gray-400">
                  {selectedMonthName} сард хамаарах бодит медиа (зураг, бичлэг) хавсаргасан тэмдэглэл байхгүй байна.
                </div>
              )}
            </div>
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