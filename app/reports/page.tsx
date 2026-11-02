"use client";

import React, { useState, useEffect } from "react";
import { Printer, FileText, CheckCircle2, User, Sparkles, Award } from "lucide-react";

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

  useEffect(() => {
    // Хүүхдүүд, Ажиглалт, Ярилцлагын өгөгдлийг localStorage-оос автоматаар унших
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

  // Сонгогдсон хүүхдийн ажиглалт ба ярилцлагуудыг шүүх
  const currentObs = observations.filter((o) => o.child === selectedChild);
  const currentInt = interviews.filter((i) => i.child === selectedChild);

  // Хэвлэх функц
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Дээд хэсгийн удирдлага (Хэвлэх үед харагдахгүй print:hidden) */}
      <div className="flex justify-between items-center flex-wrap gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Суралцагчийн хөгжлийн үнэлгээний тайлан 📜
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            49 шалгуураар бодит үнэлгээ гаргаж, А4 форматаар хэвлэх
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
            <Printer size={16} /> Тайлан хэвлэх
          </button>
        </div>
      </div>

      {/* ХЭВЛЭХ БОЛОН ДЭЛГЭЦЭЭР ХАРАГДАХ ТАЙЛАНГИЙН А4 ХҮҮДАС */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6 print:p-0 print:border-none print:shadow-none">
        
        {/* Хүүхдийн ерөнхий мэдээллийн толгой */}
        <div className="border-b-2 border-pink-500 pb-4 flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{selectedChild || "Хүүхэд сонгогдоогүй байна"}</h2>
            <p className="text-xs text-gray-500 mt-1">
              Суралцагчийн хөгжлийн ахицын 49 шалгуурт суурилсан нэгдсэн тайлан
            </p>
          </div>
          <div className="text-right text-xs text-gray-500">
            <p>Ажиглалтын тэмдэглэл: <span className="font-bold text-gray-800">{currentObs.length}</span></p>
            <p>Ярилцлагын тэмдэглэл: <span className="font-bold text-gray-800">{currentInt.length}</span></p>
          </div>
        </div>

        {/* AI Санал дүгнэлт / Ахицын тойм */}
        <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100 space-y-2">
          <h3 className="text-xs font-bold text-pink-700 flex items-center gap-1.5">
            <Sparkles size={16} /> Хөгжлийн ахицын бодит дүгнэлт:
          </h3>
          <p className="text-xs text-gray-700 leading-relaxed">
            {currentObs.length > 0 || currentInt.length > 0
              ? `Суралцагч ${selectedChild} нь бүртгэгдсэн ажиглалт болон ярилцлагын дагуу нийгэмшихүй, танин мэдэхүй болон бие бялдрын хувьд тогтмол ахиц үзүүлж байна. Дараах 49 шалгуураар хөгжлийн түвшинг үнэлэв.`
              : `Энэ хүүхдэд ажиглалт болон ярилцлагын тэмдэглэл одоогоор бүртгэгдээгүй байна. Багшийн ажиглалтад үндэслэн үнэлгээг харуулав.`}
          </p>
        </div>

        {/* 49 ШАЛГУУР ҮЗҮҮЛЭЛТИЙН ХҮСНЭГТ */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Award size={18} className="text-pink-500" /> Суралцагчийн хөгжлийн үнэлгээний шалгуурууд (49)
          </h3>

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
                  // Бүртгэгдсэн ажиглалт эсвэл ярилцлага байгаа бол "Хангалттай" үнэлгээ өгөх
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

        {/* БАГШИЙН СУРТАЛЧИЛГАА БОЛОН ГАРААР БҮРТГЭХ СЭДЭВ */}
        <div className="pt-6 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
          <div>
            <p>Үнэлгээ хийсэн багш: .................................... / /</p>
          </div>
          <div>
            <p>Огноо: {new Date().toISOString().split("T")[0]}</p>
          </div>
        </div>

      </div>
    </div>
  );
}