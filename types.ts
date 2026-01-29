
export enum PlantStage {
  SEEDLING = 'Seedling/Clone',
  EARLY_VEG = 'Early Veg',
  LATE_VEG = 'Late Veg',
  FLOWERING = 'Flowering',
  LATE_FLOWER = 'Late Flower'
}

export interface VPDRange {
  min: number;
  max: number;
}

export interface SensorData {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  vpd: number;
  timestamp: string;
}

export enum ControlMode {
  AUTO = 'Automatic',
  MANUAL = 'Manual'
}

export enum DeviceStatus {
  OFF = 'OFF',
  ON = 'ON'
}

export interface GreenhouseState {
  fan: DeviceStatus;
  mister: DeviceStatus;
  mode: ControlMode;
  stage: PlantStage;
}

export interface VPDInfo {
  status: 'low' | 'ideal' | 'high' | 'danger';
  label: string;
  color: string;
  advice: string;
  targetRange: VPDRange;
}
