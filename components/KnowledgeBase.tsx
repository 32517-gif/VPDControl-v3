
import React from 'react';
import { Book, CheckCircle, Info, Beaker, Layers } from 'lucide-react';

export const KnowledgeBase: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Project Knowledge Base</h1>
        <p className="text-lg text-slate-600">Complete documentation for the Smart Greenhouse Control System using VPD principles.</p>
      </header>

      {/* Chapter 1 */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Info className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">บทที่ 1: บทนำ</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-2">1.1 ที่มาและความสำคัญ</h3>
            <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-slate-700">
              <p>• อากาศร้อนแห้ง → VPD สูง → ใบเหี่ยว (คายน้ำเร็วเกินไป)</p>
              <p>• อากาศชื้น → VPD ต่ำ → เชื้อรา (คายน้ำไม่ได้)</p>
              <p className="font-bold text-emerald-600">VPD ดี = 0.8-1.2 kPa → พืชโตเร็ว</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">1.2 วัตถุประสงค์</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>สร้างระบบวัดอุณหภูมิ ความชื้น คำนวณ VPD ได้ถูกต้อง</li>
              <li>ทำระบบควบคุมพัดลม + พ่นไออัตโนมัติ</li>
              <li>สร้างเว็บดูข้อมูล + Google Sheets</li>
              <li>ทดสอบว่าระบบเสถียรแค่ไหน (&gt;80%)</li>
              <li>เปรียบเทียบ 3 แบบ (ไม่ควบคุม/แมนนวล/อัตโนมัติ)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Chapter 2 */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-emerald-600 p-2 rounded-lg text-white">
            <Beaker className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">บทที่ 2: ความรู้พื้นฐาน</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" /> VPD คืออะไร
            </h3>
            <p className="text-slate-600 mb-4">VPD = แรงดึงน้ำจากใบพืช เป็นค่าที่แม่นยำกว่าการดูแค่ความชื้นสัมพัทธ์ (RH)</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-1"><span>VPD สูง</span><span className="text-orange-600 font-medium">ใบแห้ง/ไหม้</span></div>
              <div className="flex justify-between border-b pb-1"><span>VPD ต่ำ</span><span className="text-blue-600 font-medium">เชื้อรา/ต้นเน่า</span></div>
              <div className="flex justify-between font-bold"><span>VPD 0.8-1.2</span><span className="text-emerald-600">★พืชโตดีที่สุด★</span></div>
            </div>
          </div>

          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
            <h3 className="font-bold mb-3 text-emerald-800">สูตรการคำนวณ</h3>
            <div className="bg-white p-4 rounded-xl font-mono text-sm text-slate-700">
              VPD = f(อุณหภูมิ, ความชื้น)<br/>
              ใช้สมการ Tetens เพื่อหา VPsat
            </div>
          </div>
        </div>
      </section>

      {/* Control Logic */}
      <section className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-emerald-400" /> ระบบทำงานอัตโนมัติ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-slate-700 p-4 rounded-xl">
            <div className="text-emerald-400 font-bold mb-1">VPD &lt; 0.8</div>
            <p className="text-sm text-slate-400">ชื้นเกินไป</p>
            <p className="font-bold mt-2">เปิดพัดลม 5 นาที</p>
          </div>
          <div className="bg-emerald-900/40 border border-emerald-500/50 p-4 rounded-xl">
            <div className="text-emerald-400 font-bold mb-1">0.8 - 1.2</div>
            <p className="text-sm text-slate-400">ปกติ</p>
            <p className="font-bold mt-2">ประคองสถานะ</p>
          </div>
          <div className="border border-slate-700 p-4 rounded-xl">
            <div className="text-orange-400 font-bold mb-1">VPD &gt; 1.2</div>
            <p className="text-sm text-slate-400">ร้อนแห้งเกินไป</p>
            <p className="font-bold mt-2">พ่นไอหมอก 5 นาที</p>
          </div>
        </div>
      </section>
    </div>
  );
};
