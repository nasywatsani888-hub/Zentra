export type MachineStatus = 'NORMAL' | 'WARNING' | 'CRITICAL';

export type BearingFaultType = 'Normal' | 'Inner Race Fault' | 'Outer Race Fault' | 'Ball Fault';

export interface Machine {
  id: string; // e.g., 'CNC-01'
  name: string; // e.g., 'CNC Milling Spindle A'
  location: string; // e.g., 'Lini Produksi 1 - Workshop A'
  bearingModel: string; // e.g., 'SKF 6205'
  status: MachineStatus;
  temperature: number; // in °C
  vibrationRms: number; // in mm/s
  rpm: number;
  faultPrediction: BearingFaultType;
  confidence: number; // 0 - 100%
  thresholdTemp: number; // e.g., 65°C
  thresholdVib: number; // e.g., 2.8 mm/s
  recommendation: string;
  lastUpdated: string;
  probabilities: {
    normal: number;
    innerRace: number;
    outerRace: number;
    ballFault: number;
  };
}

export interface TelemetryPoint {
  time: string;
  vibX: number;
  vibY: number;
  vibZ: number;
  temperature: number;
  rpm: number;
}
