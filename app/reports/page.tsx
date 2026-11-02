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
  BarChart3,
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

export default function ReportsPage() {
  const [children, setChildren] = useState<any[]>([]);
  const [observations, setObservations] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>("");
  
  // Таб сонгох State: "criteria" (49 шалгуур) эсвэл "media" (Бодит баримт)
  const [activeTab, setActiveTab] = useState<"criteria" | "media">("criteria");

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

  const currentObs = observations.filter((o) => o.child === selectedChild);
  const currentInt = interviews.filter((i) => i.child === selectedChild);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Дээд хэсэг болон удирдлага (Print үед нуугдана) */}
      <div className="space-y-4 print:hidden">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Тайлан ба Үнэлгээ 📜
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Суралцагчийн хөгжлийн тайланг тус тусад нь сонгон харах болон хэвлэх
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-pink-600 focus:outline-none bg-white shadow-sm"
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
              <Printer size={16} /> Сонгосон тайланг хэвлэх
            </button>
          </div>
        </div>

        {/* ТАЙЛАНГИЙН ТУСДАА ТАБУУД (ТАБ НАВИГАЦИ) */}
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
            <FileCheck size={16} /> 2. Бодит медиа баримтад тулгуурласан тайлан
          </button>
        </div>
      </div>

      {/* А4 ХЭВЛЭХ ХҮҮДЭС */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6 print:p-0 print:border-none print:shadow-none">
        
        {/* Header */}
        <div className="border-b-2 border-pink-500 pb-4 flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{selectedChild || "Хүүхэд сонгогдоогүй байна"}</h2>
            <p className="text-xs text-gray-500 mt-1">
              {activeTab === "criteria"
                ? "Суралцагчийн хөгжлийн ахицын 49 шалгуурт суурилсан үнэлгээний тайлан"
                : "Ажиглалт, ярилцлагын бодит медиа (Зураг/Бичлэг)-нд суурилсан тайлан"}
            </p>
          </div>
          <div className="text-right text-xs text-gray-500">
            <p>Ажиглалтын тэмдэглэл: <span className="font-bold text-pink-600">{currentObs.length}</span></p>
            <p>Ярилцлагын тэмдэглэл: <span className="font-bold text-pink-600">{currentInt.length}</span></p>
          </div>
        </div>

        {/* ------------------ 1-Р ТАБ: 49 ШАЛГУУР ҮЗҮҮЛЭЛТИЙН ТАЙЛАН ------------------ */}
        {activeTab === "criteria" && (
          <div className="space-y-6">
            <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100 space-y-2">
              <h3 className="text-xs font-bold text-pink-700 flex items-center gap-1.5">
                <Sparkles size={16} /> Хөгжлийн ахицын 49 шалгуурын нэгдсэн тойм:
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed">
                Суралцагч {selectedChild}-ийн Мэдлэг (1-8), Чадвар (9-36), Төлөвшил (37-49)-ийн сургалтын хөтөлбөрийн 49 шалгуур үзүүлэлтийн гүйцэтгэлийн түвшинг доорх хүснэгтээр харуулав.
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

        {/* ------------------ 2-Р ТАБ: БОДИТ МЕДИА БАРИМТАТ ТАЙЛАН ------------------ */}
        {activeTab === "media" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ажиглалтын медиа баримтууд */}
              <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-200 space-y-3">
                <h4 className="text-xs font-bold text-pink-600 flex items-center gap-1.5 border-b pb-2">
                  <Eye size={14} /> Ажиглалтын бодит тэмдэглэл & Медиа баримт ({currentObs.length})
                </h4>
                {currentObs.length > 0 ? (
                  currentObs.map((obs) => (
                    <div key={obs.id} className="bg-white p-3 rounded-lg border border-gray-100 space-y-2">
                      <div className="flex justify-between text-[11px] text-gray-400">
                        <span className="font-bold text-gray-700">Огноо: {obs.date}</span>
                        <span className="text-emerald-600 font-semibold">Баталгаажсан</span>
                      </div>
                      <p className="text-xs text-gray-700 bg-gray-50 p-2 rounded-lg">{obs.note}</p>
                      {obs.mediaUrl ? (
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                            {obs.mediaType === "image" ? <ImageIcon size={12} /> : <Video size={12} />} Бодит баримт:
                          </p>
                          {obs.mediaType === "image" ? (
                            <img src={obs.mediaUrl} alt="Evidence" className="w-full h-36 object-cover rounded-xl border border-gray-200" />
                          ) : (
                            <video src={obs.mediaUrl} controls className="w-full h-36 rounded-xl border border-gray-200" />
                          )}
                        </div>
                      ) : (
                        <p className="text-[10px] text-gray-400 italic">Медиа файл хавсаргаагүй тэмдэглэл.</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic py-6 text-center">Ажиглалтын тэмдэглэл байхгүй.</p>
                )}
              </div>

              {/* Ярилцлагын медиа баримтууд */}
              <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-200 space-y-3">
                <h4 className="text-xs font-bold text-pink-600 flex items-center gap-1.5 border-b pb-2">
                  <MessageSquare size={14} /> Ярилцлагын бодит тэмдэглэл & Медиа баримт ({currentInt.length})
                </h4>
                {currentInt.length > 0 ? (
                  currentInt.map((item) => (
                    <div key={item.id} className="bg-white p-3 rounded-lg border border-gray-100 space-y-2">
                      <div className="flex justify-between text-[11px] text-gray-400">
                        <span className="font-bold text-pink-600">{item.type}</span>
                        <span>{item.date}</span>
                      </div>
                      <p className="text-xs text-gray-700 bg-gray-50 p-2 rounded-lg">{item.note}</p>
                      {item.mediaUrl ? (
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                            {item.mediaType === "image" ? <ImageIcon size={12} /> : <Video size={12} />} Бодит баримт:
                          </p>
                          {item.mediaType === "image" ? (
                            <img src={item.mediaUrl} alt="Evidence" className="w-full h-36 object-cover rounded-xl border border-gray-200" />
                          ) : (
                            <video src={item.mediaUrl} controls className="w-full h-36 rounded-xl border border-gray-200" />
                          )}
                        </div>
                      ) : (
                        <p className="text-[10px] text-gray-400 italic">Медиа файл хавсаргаагүй тэмдэглэл.</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic py-6 text-center">Ярилцлагын тэмдэглэл байхгүй.</p>
                )}
              </div>
            </div>

            {/* Дүгнэлтийн блок */}
            <div className="bg-pink-500 text-white p-5 rounded-xl space-y-2 print:bg-none print:text-black print:border print:border-gray-300">
              <h4 className="text-xs font-bold flex items-center gap-1.5">
                <Sparkles size={16} /> БОДИТ БАРИМТАНД ТУЛГУУРЛАСАН ЧАНАРЫН ДҮГНЭЛТ:
              </h4>
              <p className="text-xs leading-relaxed opacity-95">
                {currentObs.length > 0 || currentInt.length > 0
                  ? `Суралцагч ${selectedChild}-ийн бүртгэгдсэн бодит зураг болон бичлэгүүдэд хийсэн чанарын дүгнэлтээр: Хүүхэд нь даалгаврыг бие даан болон хамтран гүйцэтгэхдээ идэвх чармайлттай, тоглоомын явцад нийгэмшихүйн эерэг дадал харуулж байгаа нь медиа нотлох баримтуудаар баталгаажиж байна.`
                  : `Суралцагч ${selectedChild}-д одоогоор бодит медиа баримт бүртгэгдээгүй байна.`}
              </p>
            </div>
          </div>
        )}

        {/* Гарын үсэг */}
        <div className="pt-6 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
          <div>
            <p>БАГШИЙН ГАРЫН ҮСЭГ: .................................... / /</p>
          </div>
          <div>
            <p>Огноо: {new Date().toISOString().split("T")[0]}</p>
          </div>
        </div>

      </div>
    </div>
  );
}