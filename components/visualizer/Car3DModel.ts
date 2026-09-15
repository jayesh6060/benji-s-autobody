import * as THREE from 'three';
import { CAR_PANELS, PaintFinish } from '@/types/visualizer';

export function createCarModel(): {
  group: THREE.Group;
  panelMeshes: Map<string, THREE.Mesh>;
  updatePanelMaterial: (panelId: string, colorHex: string, finish: PaintFinish) => void;
  resetAllMaterials: (baseColor: string) => void;
} {
  const carGroup = new THREE.Group();
  const panelMeshes = new Map<string, THREE.Mesh>();

  // Base metallic paint material generator
  const createPaintMaterial = (colorHex = '#1A2A5E', finish: PaintFinish = 'metallic') => {
    let roughness = 0.2;
    let metalness = 0.8;
    let clearcoat = 0.8;
    let clearcoatRoughness = 0.1;

    switch (finish) {
      case 'gloss':
        roughness = 0.05;
        metalness = 0.2;
        clearcoat = 1.0;
        break;
      case 'metallic':
        roughness = 0.2;
        metalness = 0.85;
        clearcoat = 0.9;
        break;
      case 'pearl':
        roughness = 0.15;
        metalness = 0.5;
        clearcoat = 1.0;
        break;
      case 'matte':
        roughness = 0.7;
        metalness = 0.1;
        clearcoat = 0.0;
        break;
    }

    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(colorHex),
      metalness,
      roughness,
      clearcoat,
      clearcoatRoughness,
      reflectivity: 0.9,
    });
  };

  const defaultBaseColor = '#1e293b'; // Sleek dark slate navy
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0f172a,
    metalness: 0.1,
    roughness: 0.1,
    transmission: 0.6,
    transparent: true,
    opacity: 0.7,
  });

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.95,
    roughness: 0.1,
  });

  const tireMaterial = new THREE.MeshStandardMaterial({
    color: 0x111827,
    roughness: 0.9,
    metalness: 0.1,
  });

  const headlightGlass = new THREE.MeshPhysicalMaterial({
    color: 0xe0f2fe,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.6,
    roughness: 0.1,
    transparent: true,
    opacity: 0.8,
  });

  const taillightGlass = new THREE.MeshPhysicalMaterial({
    color: 0xfef2f2,
    emissive: 0xef4444,
    emissiveIntensity: 0.7,
    roughness: 0.1,
    transparent: true,
    opacity: 0.85,
  });

  // Helper to register panel mesh
  const addPanelMesh = (
    panelId: string,
    panelName: string,
    geometry: THREE.BufferGeometry,
    position: [number, number, number],
    rotation: [number, number, number] = [0, 0, 0],
    scale: [number, number, number] = [1, 1, 1],
    customMat?: THREE.Material
  ) => {
    const mat = customMat || createPaintMaterial(defaultBaseColor, 'metallic');
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    mesh.scale.set(...scale);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    mesh.userData = {
      isPanel: true,
      panelId,
      panelName,
      originalMaterial: mat,
    };

    carGroup.add(mesh);
    panelMeshes.set(panelId, mesh);
    return mesh;
  };

  // 1. HOOD
  const hoodShape = new THREE.BoxGeometry(1.7, 0.12, 1.2);
  addPanelMesh('hood', 'Hood', hoodShape, [0, 0.75, 1.15], [0.1, 0, 0]);

  // 2. ROOF
  const roofShape = new THREE.BoxGeometry(1.5, 0.1, 1.4);
  addPanelMesh('roof', 'Roof', roofShape, [0, 1.25, -0.2]);

  // 3. FRONT BUMPER
  const frontBumperShape = new THREE.BoxGeometry(1.85, 0.45, 0.4);
  addPanelMesh('front_bumper', 'Front Bumper', frontBumperShape, [0, 0.35, 1.9]);

  // 4. REAR BUMPER
  const rearBumperShape = new THREE.BoxGeometry(1.85, 0.45, 0.4);
  addPanelMesh('rear_bumper', 'Rear Bumper', rearBumperShape, [0, 0.38, -1.9]);

  // 5. TRUNK
  const trunkShape = new THREE.BoxGeometry(1.65, 0.15, 0.9);
  addPanelMesh('trunk', 'Trunk / Tailgate', trunkShape, [0, 0.85, -1.35], [-0.05, 0, 0]);

  // 6. FRONT LEFT DOOR
  const doorFL = new THREE.BoxGeometry(0.1, 0.65, 0.95);
  addPanelMesh('door_fl', 'Front Left Door', doorFL, [-0.85, 0.65, 0.45]);

  // 7. FRONT RIGHT DOOR
  const doorFR = new THREE.BoxGeometry(0.1, 0.65, 0.95);
  addPanelMesh('door_fr', 'Front Right Door', doorFR, [0.85, 0.65, 0.45]);

  // 8. REAR LEFT DOOR
  const doorRL = new THREE.BoxGeometry(0.1, 0.65, 0.9);
  addPanelMesh('door_rl', 'Rear Left Door', doorRL, [-0.85, 0.65, -0.45]);

  // 9. REAR RIGHT DOOR
  const doorRR = new THREE.BoxGeometry(0.1, 0.65, 0.9);
  addPanelMesh('door_rr', 'Rear Right Door', doorRR, [0.85, 0.65, -0.45]);

  // 10. LEFT FRONT FENDER
  const fenderFL = new THREE.BoxGeometry(0.15, 0.55, 0.8);
  addPanelMesh('fender_fl', 'Left Front Fender', fenderFL, [-0.85, 0.6, 1.35]);

  // 11. RIGHT FRONT FENDER
  const fenderFR = new THREE.BoxGeometry(0.15, 0.55, 0.8);
  addPanelMesh('fender_fr', 'Right Front Fender', fenderFR, [0.85, 0.6, 1.35]);

  // 12. LEFT REAR QUARTER PANEL
  const quarterRL = new THREE.BoxGeometry(0.15, 0.6, 0.85);
  addPanelMesh('quarter_rl', 'Left Rear Quarter Panel', quarterRL, [-0.83, 0.65, -1.35]);

  // 13. RIGHT REAR QUARTER PANEL
  const quarterRR = new THREE.BoxGeometry(0.15, 0.6, 0.85);
  addPanelMesh('quarter_rr', 'Right Rear Quarter Panel', quarterRR, [0.83, 0.65, -1.35]);

  // 14. SIDE MIRRORS
  const mirrorGeom = new THREE.BoxGeometry(0.25, 0.15, 0.2);
  addPanelMesh('side_mirror_l', 'Left Side Mirror', mirrorGeom, [-0.98, 0.9, 0.8]);
  addPanelMesh('side_mirror_r', 'Right Side Mirror', mirrorGeom, [0.98, 0.9, 0.8]);

  // 15. HEADLIGHTS & TAILLIGHTS
  const lightGeom = new THREE.BoxGeometry(0.35, 0.18, 0.15);
  addPanelMesh('headlight_l', 'Left Headlight', lightGeom, [-0.65, 0.58, 1.82], [0, 0, 0], [1, 1, 1], headlightGlass);
  addPanelMesh('headlight_r', 'Right Headlight', lightGeom, [0.65, 0.58, 1.82], [0, 0, 0], [1, 1, 1], headlightGlass);
  addPanelMesh('taillight_l', 'Left Taillight', lightGeom, [-0.65, 0.62, -1.82], [0, 0, 0], [1, 1, 1], taillightGlass);
  addPanelMesh('taillight_r', 'Right Taillight', lightGeom, [0.65, 0.62, -1.82], [0, 0, 0], [1, 1, 1], taillightGlass);

  // NON-PANEL VEHICLE DETAILS (Windows, Wheels, Underbody Chassis)
  // Windshield
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.6, 0.7), glassMaterial);
  windshield.position.set(0, 1.0, 0.55);
  windshield.rotation.set(-0.55, 0, 0);
  carGroup.add(windshield);

  // Rear Window
  const rearWindow = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.55, 0.65), glassMaterial);
  rearWindow.position.set(0, 1.02, -0.92);
  rearWindow.rotation.set(0.55, 0, 0);
  carGroup.add(rearWindow);

  // Side Windows
  const sideWindowL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.45, 1.6), glassMaterial);
  sideWindowL.position.set(-0.78, 1.05, -0.15);
  carGroup.add(sideWindowL);

  const sideWindowR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.45, 1.6), glassMaterial);
  sideWindowR.position.set(0.78, 1.05, -0.15);
  carGroup.add(sideWindowR);

  // Chassis floor
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.2, 3.8), tireMaterial);
  chassis.position.set(0, 0.22, 0);
  carGroup.add(chassis);

  // Wheels (4)
  const wheelGeom = new THREE.CylinderGeometry(0.36, 0.36, 0.25, 24);
  const rimGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.26, 12);
  const wheelPositions: [number, number, number][] = [
    [-0.85, 0.36, 1.25],  // FL
    [0.85, 0.36, 1.25],   // FR
    [-0.85, 0.36, -1.25], // RL
    [0.85, 0.36, -1.25],  // RR
  ];

  wheelPositions.forEach((pos) => {
    const wheelMesh = new THREE.Mesh(wheelGeom, tireMaterial);
    wheelMesh.rotation.z = Math.PI / 2;
    wheelMesh.position.set(...pos);

    const rimMesh = new THREE.Mesh(rimGeom, chromeMaterial);
    wheelMesh.add(rimMesh);

    carGroup.add(wheelMesh);
  });

  // Material updater
  const updatePanelMaterial = (panelId: string, colorHex: string, finish: PaintFinish) => {
    const mesh = panelMeshes.get(panelId);
    if (!mesh) return;

    const newMat = createPaintMaterial(colorHex, finish);
    mesh.material = newMat;
    mesh.userData.originalMaterial = newMat;
  };

  const resetAllMaterials = (baseColor: string) => {
    panelMeshes.forEach((mesh) => {
      const newMat = createPaintMaterial(baseColor, 'metallic');
      mesh.material = newMat;
      mesh.userData.originalMaterial = newMat;
    });
  };

  return {
    group: carGroup,
    panelMeshes,
    updatePanelMaterial,
    resetAllMaterials,
  };
}
