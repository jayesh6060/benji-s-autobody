'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createCarModel } from './Car3DModel';
import { DamageMarker, PanelPaint, VisualizerMode, CAR_PANELS } from '@/types/visualizer';
import { RotateCcw, Maximize2, Minimize2, AlertTriangle, Layers, Info } from 'lucide-react';

interface Canvas3DViewerProps {
  mode: VisualizerMode;
  selectedPanelId: string | null;
  onSelectPanel: (panelId: string, panelName: string, intersectionPoint?: [number, number, number]) => void;
  damageMarkers: DamageMarker[];
  panelPaints: Record<string, PanelPaint>;
  activeColor: string;
}

export default function Canvas3DViewer({
  mode,
  selectedPanelId,
  onSelectPanel,
  damageMarkers,
  panelPaints,
  activeColor,
}: Canvas3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const carModelRef = useRef<ReturnType<typeof createCarModel> | null>(null);
  const markersGroupRef = useRef<THREE.Group | null>(null);

  const [hoveredPanelName, setHoveredPanelName] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [webglError, setWebglError] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const hoveredMeshRef = useRef<THREE.Mesh | null>(null);
  const selectedMeshRef = useRef<THREE.Mesh | null>(null);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;

    try {
      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      // 1. Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#0b132b');
      scene.fog = new THREE.FogExp2('#0b132b', 0.04);
      sceneRef.current = scene;

      // 2. Camera
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(4, 2.5, 4.5);
      cameraRef.current = camera;

      // 3. Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;

      // Clear container and append canvas
      container.innerHTML = '';
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // 4. OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxPolarAngle = Math.PI / 2 - 0.02; // Prevents camera from going under ground grid
      controls.minDistance = 2.5;
      controls.maxDistance = 9;
      controls.target.set(0, 0.6, 0);
      controlsRef.current = controls;

      // 5. Lighting Setup (Studio Car Lighting)
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
      mainLight.position.set(5, 8, 5);
      mainLight.castShadow = true;
      mainLight.shadow.mapSize.width = 1024;
      mainLight.shadow.mapSize.height = 1024;
      scene.add(mainLight);

      const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
      fillLight.position.set(-5, 4, -5);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xe63946, 1.2);
      rimLight.position.set(0, 6, -6);
      scene.add(rimLight);

      // 6. Ground Studio Grid & Mirror Floor
      const gridHelper = new THREE.GridHelper(20, 20, 0x1e293b, 0x0f172a);
      gridHelper.position.y = 0;
      scene.add(gridHelper);

      const shadowPlaneGeo = new THREE.PlaneGeometry(20, 20);
      const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.4 });
      const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
      shadowPlane.rotation.x = -Math.PI / 2;
      shadowPlane.receiveShadow = true;
      scene.add(shadowPlane);

      // 7. Load Car Model
      const car = createCarModel();
      scene.add(car.group);
      carModelRef.current = car;

      // Group for damage markers
      const markersGroup = new THREE.Group();
      scene.add(markersGroup);
      markersGroupRef.current = markersGroup;

      setIsLoading(false);

      // 8. Animation Loop
      let animationFrameId: number;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      // 9. Resize Handler
      const handleResize = () => {
        if (!containerRef.current || !renderer || !camera) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
      };
    } catch (err) {
      console.error('WebGL init error:', err);
      setWebglError(true);
      setIsLoading(false);
    }
  }, []);

  // Update Panel Paints dynamically
  useEffect(() => {
    if (!carModelRef.current) return;
    Object.values(panelPaints).forEach((p) => {
      carModelRef.current?.updatePanelMaterial(p.panelId, p.color, p.finish);
    });
  }, [panelPaints]);

  // Update Damage Pin Markers in 3D Space
  useEffect(() => {
    if (!markersGroupRef.current) return;
    const group = markersGroupRef.current;

    // Clear previous markers
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
    }

    // Render new pins
    damageMarkers.forEach((marker) => {
      const pinGroup = new THREE.Group();
      pinGroup.position.set(...marker.position);

      // Outer Pulsing Red Sphere
      const sphereGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.9 });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      pinGroup.add(sphereMesh);

      // Inner Core Pin
      const coreGeo = new THREE.SphereGeometry(0.04, 12, 12);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      pinGroup.add(coreMesh);

      group.add(pinGroup);
    });
  }, [damageMarkers]);

  // Raycaster for Hover & Click Events
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!containerRef.current || !cameraRef.current || !carModelRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

      const meshes = Array.from(carModelRef.current.panelMeshes.values());
      const intersects = raycaster.intersectObjects(meshes, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const panelName = hitMesh.userData.panelName;

        if (hoveredMeshRef.current && hoveredMeshRef.current !== hitMesh && hoveredMeshRef.current !== selectedMeshRef.current) {
          // Restore previous hovered mesh material
          (hoveredMeshRef.current.material as THREE.MeshPhysicalMaterial).emissive?.setHex(0x000000);
        }

        hoveredMeshRef.current = hitMesh;
        setHoveredPanelName(panelName);

        if (hitMesh !== selectedMeshRef.current) {
          (hitMesh.material as THREE.MeshPhysicalMaterial).emissive?.setHex(0x1e3a8a);
          (hitMesh.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.4;
        }
      } else {
        if (hoveredMeshRef.current && hoveredMeshRef.current !== selectedMeshRef.current) {
          (hoveredMeshRef.current.material as THREE.MeshPhysicalMaterial).emissive?.setHex(0x000000);
        }
        hoveredMeshRef.current = null;
        setHoveredPanelName(null);
      }
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      setShowInstructions(false);
      if (!containerRef.current || !cameraRef.current || !carModelRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

      const meshes = Array.from(carModelRef.current.panelMeshes.values());
      const intersects = raycaster.intersectObjects(meshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0];
        const hitMesh = hit.object as THREE.Mesh;
        const { panelId, panelName } = hitMesh.userData;

        // Clear previous selected emissive
        if (selectedMeshRef.current && selectedMeshRef.current !== hitMesh) {
          (selectedMeshRef.current.material as THREE.MeshPhysicalMaterial).emissive?.setHex(0x000000);
        }

        selectedMeshRef.current = hitMesh;
        (hitMesh.material as THREE.MeshPhysicalMaterial).emissive?.setHex(0xd97706);
        (hitMesh.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.5;

        const point: [number, number, number] = [
          Number(hit.point.x.toFixed(3)),
          Number(hit.point.y.toFixed(3)),
          Number(hit.point.z.toFixed(3)),
        ];

        onSelectPanel(panelId, panelName, point);
      }
    },
    [onSelectPanel]
  );

  const handleResetCamera = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(4, 2.5, 4.5);
    controlsRef.current.target.set(0, 0.6, 0);
    controlsRef.current.update();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (webglError) {
    return (
      <div className="w-full h-[480px] bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-center p-8 border border-slate-800">
        <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2 font-oswald uppercase">WebGL 3D Viewer Unavailable</h3>
        <p className="text-slate-400 text-sm max-w-md mb-6">
          Your browser or device has WebGL hardware acceleration disabled. You can still select car panels manually using the dropdown options below.
        </p>
        <div className="grid grid-cols-2 gap-3 max-w-lg w-full">
          {CAR_PANELS.slice(0, 8).map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectPanel(p.id, p.name, [0, 0.8, 0])}
              className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-lg text-left transition border border-slate-700/50"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#0b132b] shadow-2xl transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-[460px] md:h-[560px]'
      }`}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 bg-slate-950 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#e63946] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white font-oswald uppercase tracking-wider text-sm">Preparing 3D Vehicle Renderer...</p>
        </div>
      )}

      {/* Hover Panel Tooltip Overlay */}
      {hoveredPanelName && (
        <div className="absolute top-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700 text-white text-xs font-semibold shadow-lg flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e63946] animate-pulse" />
          <span>{hoveredPanelName}</span>
        </div>
      )}

      {/* Mode Indicator & Quick Info */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={handleResetCamera}
          title="Reset Camera View"
          className="p-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white backdrop-blur-md rounded-xl border border-slate-700 transition shadow-lg"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={toggleFullscreen}
          title="Toggle Fullscreen"
          className="p-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white backdrop-blur-md rounded-xl border border-slate-700 transition shadow-lg"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Desktop/Mobile Gesture Instruction Banner */}
      {showInstructions && !isLoading && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-slate-900/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-700 text-slate-300 text-xs font-medium shadow-xl flex items-center gap-3 pointer-events-none">
          <Info className="w-4 h-4 text-[#e63946]" />
          <span>
            <strong className="text-white">Desktop:</strong> Drag to rotate • Scroll to zoom • Click panel to select
          </span>
        </div>
      )}

      {/* Main 3D Canvas Canvas */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
