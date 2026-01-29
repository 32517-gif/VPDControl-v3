
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { SensorData } from '../types';

interface Props {
  data: SensorData[];
}

export const VPDChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-[300px] bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
      <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">VPD History (kPa)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorVpd" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="timestamp" 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 10, fill: '#94a3b8'}}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 10, fill: '#94a3b8'}}
            domain={[0, 2]}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <ReferenceLine y={0.8} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'right', value: 'Ideal Start', fill: '#10b981', fontSize: 10 }} />
          <ReferenceLine y={1.2} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'right', value: 'Ideal End', fill: '#10b981', fontSize: 10 }} />
          <Area 
            type="monotone" 
            dataKey="vpd" 
            stroke="#10b981" 
            fillOpacity={1} 
            fill="url(#colorVpd)" 
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
