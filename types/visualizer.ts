export type DamageType =
  | 'Dent'
  | 'Scratch'
  | 'Paint Damage'
  | 'Crack'
  | 'Collision Damage'
  | 'Rust'
  | 'Other';

export type DamageSeverity = 'Minor' | 'Moderate' | 'Severe';

export type PaintFinish = 'gloss' | 'metallic' | 'pearl' | 'matte';

export interface DamageMarker {
  id: string;
  panelId: string;
  panelName: string;
  position: [number, number, number];
  normal?: [number, number, number];
  type: DamageType;
  severity: DamageSeverity;
  notes?: string;
}

export interface PanelPaint {
  panelId: string;
  color: string;
  finish: PaintFinish;
}

export interface CarPanel {
  id: string;
  name: string;
  category: 'front' | 'rear' | 'sides' | 'top';
}

export interface UploadedPhoto {
  id: string;
  url: string;
  label: string;
  name: string;
}

export type VisualizerMode = 'damage' | 'paint';

export const CAR_PANELS: CarPanel[] = [
  { id: 'front_bumper', name: 'Front Bumper', category: 'front' },
  { id: 'hood', name: 'Hood', category: 'front' },
  { id: 'roof', name: 'Roof', category: 'top' },
  { id: 'rear_bumper', name: 'Rear Bumper', category: 'rear' },
  { id: 'trunk', name: 'Trunk / Tailgate', category: 'rear' },
  { id: 'door_fl', name: 'Front Left Door', category: 'sides' },
  { id: 'door_fr', name: 'Front Right Door', category: 'sides' },
  { id: 'door_rl', name: 'Rear Left Door', category: 'sides' },
  { id: 'door_rr', name: 'Rear Right Door', category: 'sides' },
  { id: 'fender_fl', name: 'Left Front Fender', category: 'sides' },
  { id: 'fender_fr', name: 'Right Front Fender', category: 'sides' },
  { id: 'quarter_rl', name: 'Left Rear Quarter Panel', category: 'sides' },
  { id: 'quarter_rr', name: 'Right Rear Quarter Panel', category: 'sides' },
  { id: 'side_mirror_l', name: 'Left Side Mirror', category: 'sides' },
  { id: 'side_mirror_r', name: 'Right Side Mirror', category: 'sides' },
  { id: 'headlight_l', name: 'Left Headlight', category: 'front' },
  { id: 'headlight_r', name: 'Right Headlight', category: 'front' },
  { id: 'taillight_l', name: 'Left Taillight', category: 'rear' },
  { id: 'taillight_r', name: 'Right Taillight', category: 'rear' },
];

export const PRESET_COLORS = [
  { name: 'Midnight Black', hex: '#0B0D10' },
  { name: 'Pearl White', hex: '#F0F2F5' },
  { name: 'Apex Silver', hex: '#94A3B8' },
  { name: 'Gunmetal Gray', hex: '#475569' },
  { name: 'Crimson Red', hex: '#DC2626' },
  { name: 'Velocity Blue', hex: '#2563EB' },
  { name: 'Racing Green', hex: '#059669' },
  { name: 'Sunburst Yellow', hex: '#EAB308' },
];
