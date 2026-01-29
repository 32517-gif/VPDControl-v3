
import React from 'react';
import { Cpu, Zap, CreditCard, PenLine } from 'lucide-react';

export const HardwareSetup: React.FC = () => {
  const parts = [
    { name: 'ESP32-C3', price: 150, role: 'MCU (WiFi สมอง)' },
    { name: 'DHT22', price: 100, role: 'ตา (วัด T/RH)' },
    { name: 'Soil Sensor', price: 50, role: 'วัดความชื้นดิน' },
    { name: 'พัดลม (DC Fan)', price: 200, role: 'มือ (ระบายอากาศ)' },
    { name: 'เครื่องพ่นไอ', price: 150, role: 'มือ (เพิ่มชื้น)' },
    { name: 'Relay Module', price: 80, role: 'สวิตช์ควบคุม' },
    { name: 'กล่อง/โครงสร้าง', price: 300, role: 'เคสป้องกัน' },
  ];

  const totalPrice = parts.reduce((acc, part) => acc + part.price, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Hardware & Connection</h1>
        <p className="text-slate-600">Pin mapping and Bill of Materials (BOM)</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bill of Materials */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-600" /> Bill of Materials
          </h2>
          <div className="space-y-3">
            {parts.map((part) => (
              <div key={part.name} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                <div>
                  <div className="font-bold text-slate-800">{part.name}</div>
                  <div className="text-xs text-slate-500">{part.role}</div>
                </div>
                <div className="font-mono text-emerald-700">{part.price}฿</div>
              </div>
            ))}
            <div className="pt-4 flex justify-between items-center font-black text-xl text-slate-900">
              <span>Total Cost</span>
              <span>{totalPrice}฿</span>
            </div>
          </div>
        </section>

        {/* Pinout Mapping */}
        <section className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" /> ESP32-C3 Pinout
          </h2>
          <div className="space-y-4">
            <PinRow pin="Pin 4" component="DHT22 Sensor" type="Input" color="bg-blue-500" />
            <PinRow pin="Pin 5" component="Soil Moisture" type="Input (Analog)" color="bg-indigo-500" />
            <PinRow pin="Pin 12" component="Exhaust Fan (Relay)" type="Output" color="bg-orange-500" />
            <PinRow pin="Pin 13" component="Mister (Relay)" type="Output" color="bg-emerald-500" />
          </div>

          <div className="mt-8 p-4 bg-slate-800 rounded-xl border border-slate-700">
            <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
              <PenLine className="w-4 h-4" /> Connection Notes
            </h3>
            <ul className="text-xs space-y-2 text-slate-400 list-disc list-inside">
              <li>Use 5V External Power Supply for Fan and Mister.</li>
              <li>Ensure DHT22 has a 10k pull-up resistor if needed.</li>
              <li>Connect all Ground (GND) pins together.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Enclosure */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-4">Greenhouse Enclosure</h2>
        <div className="grid grid-cols-3 gap-4 h-48">
          <div className="bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200">
            <span className="text-slate-400 font-bold">20cm (W)</span>
          </div>
          <div className="bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200">
            <span className="text-slate-400 font-bold">20cm (D)</span>
          </div>
          <div className="bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200">
            <span className="text-slate-400 font-bold">30cm (H)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

const PinRow: React.FC<{ pin: string, component: string, type: string, color: string }> = ({ pin, component, type, color }) => (
  <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
    <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center font-bold text-white shadow-lg`}>
      {pin.split(' ')[1]}
    </div>
    <div className="flex-1">
      <div className="font-bold text-sm">{component}</div>
      <div className="text-[10px] text-slate-400 uppercase tracking-widest">{type}</div>
    </div>
  </div>
);
