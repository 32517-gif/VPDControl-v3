
import React, { useState, useEffect } from 'react';
import { 
  Thermometer, Droplets, Wind, Sparkles, AlertTriangle, 
  Zap, BrainCircuit, RefreshCw, ChevronRight, Settings2,
  Activity, Play, Square
} from 'lucide-react';
import { calculateVPD, getVPDStatus, getTargetRange } from '../utils/vpd';
import { SensorData, ControlMode, DeviceStatus, GreenhouseState, PlantStage } from '../types';
import { VPDChart } from './VPDChart';
import { getAIPlantAnalysis } from '../services/geminiService';

export const Dashboard: React.FC = () => {
  const [currentData, setCurrentData] = useState<SensorData>({
    temperature: 26.5,
    humidity: 65,
    soilMoisture: 52,
    vpd: 0.98,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  const [history, setHistory] = useState<SensorData[]>([]);
  const [state, setState] = useState<GreenhouseState>({
    fan: DeviceStatus.OFF,
    mister: DeviceStatus.OFF,
    mode: ControlMode.AUTO,
    stage: PlantStage.EARLY_VEG
  });

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Controller Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData(prev => {
        const target = getTargetRange(state.stage);
        
        // Environment Drift simulation
        let driftT = (Math.random() - 0.5) * 0.2;
        let driftH = (Math.random() - 0.5) * 0.4;

        // Apply device effects
        if (state.fan === DeviceStatus.ON) {
          driftT -= 0.15;
          driftH -= 0.3;
        }
        if (state.mister === DeviceStatus.ON) {
          driftT -= 0.05;
          driftH += 0.5;
        }

        const nextTemp = prev.temperature + driftT;
        const nextHum = Math.min(95, Math.max(20, prev.humidity + driftH));
        const vpd = calculateVPD(nextTemp, nextHum);
        
        const newData = {
          temperature: parseFloat(nextTemp.toFixed(1)),
          humidity: parseFloat(nextHum.toFixed(1)),
          soilMoisture: parseFloat((prev.soilMoisture + (Math.random() - 0.5) * 0.1).toFixed(1)),
          vpd: vpd,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // Automate devices based on current STAGE target
        if (state.mode === ControlMode.AUTO) {
          if (vpd > target.max) {
            setState(s => ({ ...s, fan: DeviceStatus.ON, mister: DeviceStatus.ON }));
          } else if (vpd < target.min) {
            setState(s => ({ ...s, fan: DeviceStatus.ON, mister: DeviceStatus.OFF }));
          } else {
            setState(s => ({ ...s, fan: DeviceStatus.OFF, mister: DeviceStatus.OFF }));
          }
        }

        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [state.mode, state.stage, state.fan, state.mister]);

  useEffect(() => {
    setHistory(prev => [...prev, currentData].slice(-30));
  }, [currentData]);

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await getAIPlantAnalysis(currentData);
    setAiAnalysis(result || "No response");
    setIsAnalyzing(false);
  };

  const vpdInfo = getVPDStatus(currentData.vpd, state.stage);

  return (
    <div className="space-y-6">
      {/* Top Operation Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plant Growth Stage</label>
            <select 
              value={state.stage}
              onChange={(e) => setState(s => ({ ...s, stage: e.target.value as PlantStage }))}
              className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer text-lg"
            >
              {Object.values(PlantStage).map(stage => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target VPD Range</label>
            <span className="font-bold text-emerald-600 text-lg">
              {vpdInfo.targetRange.min} - {vpdInfo.targetRange.max} kPa
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setState(s => ({ ...s, mode: ControlMode.AUTO }))}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${state.mode === ControlMode.AUTO ? 'bg-white shadow text-emerald-600' : 'text-slate-500'}`}
            >
              AUTO
            </button>
            <button 
              onClick={() => setState(s => ({ ...s, mode: ControlMode.MANUAL }))}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${state.mode === ControlMode.MANUAL ? 'bg-white shadow text-orange-600' : 'text-slate-500'}`}
            >
              MANUAL
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Metrics & Chart */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Status Banner */}
          <div className={`p-6 rounded-2xl border-2 ${vpdInfo.color} flex items-center justify-between transition-colors duration-500 shadow-sm`}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-5 h-5" />
                <h2 className="text-xl font-black uppercase tracking-tight">{vpdInfo.label}</h2>
              </div>
              <p className="text-sm font-medium opacity-80 max-w-md">{vpdInfo.advice}</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-black tabular-nums">{currentData.vpd.toFixed(2)}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Real-time kPa</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricBox icon={<Thermometer />} label="Temperature" value={`${currentData.temperature}°C`} />
            <MetricBox icon={<Droplets />} label="Humidity" value={`${currentData.humidity}%`} />
            <MetricBox icon={<Sparkles />} label="Soil Water" value={`${currentData.soilMoisture}%`} />
          </div>

          <VPDChart data={history} />
        </div>

        {/* Right Column: Controls & AI */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Actuator Controls */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase text-sm tracking-wider">
                <Settings2 className="w-4 h-4 text-slate-400" /> Actuators
              </h3>
              {state.mode === ControlMode.AUTO && (
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">SYSTEM CONTROLLED</span>
              )}
            </div>
            
            <div className="space-y-4">
              <ActuatorButton 
                label="Exhaust Fan" 
                status={state.fan} 
                disabled={state.mode === ControlMode.AUTO}
                onToggle={() => setState(s => ({ ...s, fan: s.fan === DeviceStatus.ON ? DeviceStatus.OFF : DeviceStatus.ON }))}
              />
              <ActuatorButton 
                label="Misting System" 
                status={state.mister} 
                disabled={state.mode === ControlMode.AUTO}
                onToggle={() => setState(s => ({ ...s, mister: s.mister === DeviceStatus.ON ? DeviceStatus.OFF : DeviceStatus.ON }))}
              />
            </div>
          </div>

          {/* AI Agronomist */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-500/20 p-2 rounded-lg">
                <BrainCircuit className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-bold text-lg">AI Agronomist</h3>
            </div>
            
            <div className="min-h-[120px] relative">
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-3">
                  <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                  <p className="text-xs font-bold text-slate-400 animate-pulse uppercase tracking-widest">Processing Data...</p>
                </div>
              ) : aiAnalysis ? (
                <div className="text-sm text-slate-300 leading-relaxed bg-slate-800/50 p-4 rounded-xl border border-slate-700 mb-4">
                  {aiAnalysis}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic mb-6">Click below to generate a professional crop report based on current sensor readings.</p>
              )}
              
              <button 
                onClick={handleAIAnalysis}
                disabled={isAnalyzing}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-3 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2"
              >
                {aiAnalysis ? <><RefreshCw className="w-4 h-4" /> RE-ANALYZE CROP</> : <><Activity className="w-4 h-4" /> GENERATE REPORT</>}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const MetricBox: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col items-center text-center">
    <div className="text-slate-400 mb-2">{icon}</div>
    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</div>
    <div className="text-2xl font-black text-slate-800">{value}</div>
  </div>
);

const ActuatorButton: React.FC<{ label: string, status: DeviceStatus, disabled: boolean, onToggle: () => void }> = ({ label, status, disabled, onToggle }) => (
  <button
    onClick={onToggle}
    disabled={disabled}
    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
      status === DeviceStatus.ON 
        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-inner' 
        : 'bg-slate-50 border-slate-100 text-slate-400 grayscale'
    } ${disabled ? 'cursor-default' : 'hover:border-emerald-200 active:scale-[0.98]'}`}
  >
    <div className="flex items-center gap-3">
      {status === DeviceStatus.ON ? <Play className="w-4 h-4 fill-current" /> : <Square className="w-4 h-4 fill-current" />}
      <span className="font-bold text-sm uppercase tracking-wider">{label}</span>
    </div>
    <span className={`text-[10px] font-black px-2 py-1 rounded-md ${status === DeviceStatus.ON ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-white'}`}>
      {status}
    </span>
  </button>
);
