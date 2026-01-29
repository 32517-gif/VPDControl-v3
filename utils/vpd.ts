
import { VPDInfo, PlantStage, VPDRange } from '../types';

/**
 * Calculates Vapor Pressure Deficit (VPD) in kPa
 */
export const calculateVPD = (temp: number, rh: number): number => {
  const vpSat = 0.61078 * Math.exp((17.27 * temp) / (temp + 237.3));
  const vpAir = vpSat * (rh / 100);
  const vpd = vpSat - vpAir;
  return parseFloat(vpd.toFixed(2));
};

export const getTargetRange = (stage: PlantStage): VPDRange => {
  switch (stage) {
    case PlantStage.SEEDLING: return { min: 0.4, max: 0.8 };
    case PlantStage.EARLY_VEG: return { min: 0.8, max: 1.0 };
    case PlantStage.LATE_VEG: return { min: 1.0, max: 1.2 };
    case PlantStage.FLOWERING: return { min: 1.2, max: 1.5 };
    case PlantStage.LATE_FLOWER: return { min: 1.4, max: 1.6 };
    default: return { min: 0.8, max: 1.2 };
  }
};

export const getVPDStatus = (vpd: number, stage: PlantStage): VPDInfo => {
  const range = getTargetRange(stage);
  
  if (vpd < range.min) {
    return {
      status: 'low',
      label: 'Too Low (High Humidity)',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      advice: 'VPD is below target for this stage. Increase air circulation or temperature.',
      targetRange: range
    };
  } else if (vpd >= range.min && vpd <= range.max) {
    return {
      status: 'ideal',
      label: 'Optimal Growth',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      advice: 'VPD is in the perfect range for current plant stage.',
      targetRange: range
    };
  } else if (vpd > range.max && vpd <= range.max + 0.3) {
    return {
      status: 'high',
      label: 'Stress Warning',
      color: 'text-orange-600 bg-orange-50 border-orange-200',
      advice: 'VPD is getting high. Consider misting or reducing temperature.',
      targetRange: range
    };
  } else {
    return {
      status: 'danger',
      label: 'Critical High',
      color: 'text-red-600 bg-red-50 border-red-200',
      advice: 'VPD is too high. Plants are transpiring excessively. Action required.',
      targetRange: range
    };
  }
};
