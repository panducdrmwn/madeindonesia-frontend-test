'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, GizmoHelper, GizmoViewport, Html } from '@react-three/drei';
import { Box3, Vector3 } from 'three';
import { useViewerStore } from '../lib/modelStore';
import OrientationGizmo from './OrientationGizmo';

function getCameraConfig(view: string, box: Box3) {
  const center = box.getCenter(new Vector3());
  const size = box.getSize(new Vector3());
  const radius = Math.max(size.length() * 0.6, 8);
  const offset = radius * 1.4;

  const positions: Record<string, Vector3> = {
    front: new Vector3(center.x, center.y, center.z + offset),
    back: new Vector3(center.x, center.y, center.z - offset),
    left: new Vector3(center.x - offset, center.y, center.z),
    right: new Vector3(center.x + offset, center.y, center.z),
    top: new Vector3(center.x, center.y + offset, center.z),
    bottom: new Vector3(center.x, center.y - offset, center.z),
    isometric: new Vector3(center.x + offset, center.y + offset, center.z + offset),
  };

  return {
    position: positions[view] ?? positions.isometric,
    target: center,
  };
}

function SceneContents() {
  const models = useViewerStore((state) => state.models);
  const activeView = useViewerStore((state) => state.activeView);
  const fitToViewCount = useViewerStore((state) => state.fitToViewCount);
  const resetCameraCount = useViewerStore((state) => state.resetCameraCount);
  const setActiveView = useViewerStore((state) => state.setActiveView);
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const desiredPosition = useRef(new Vector3(12, 12, 12));
  const desiredTarget = useRef(new Vector3(0, 0, 0));
  const transitioningRef = useRef(false);

  const visibleModels = useMemo(() => models.filter((model) => model.visible), [models]);

  const sceneBounds = useMemo(() => {
    const box = new Box3();
    visibleModels.forEach((model) => {
      const objectBox = new Box3().setFromObject(model.object);
      box.union(objectBox);
    });
    if (box.isEmpty()) {
      box.expandByScalar(4);
    }
    return box;
  }, [visibleModels]);

  useEffect(() => {
    const { position, target } = getCameraConfig(activeView, sceneBounds);
    desiredPosition.current.copy(position);
    desiredTarget.current.copy(target);
    transitioningRef.current = true;
  }, [activeView, sceneBounds]);

  useEffect(() => {
    if (fitToViewCount > 0) {
      const { position, target } = getCameraConfig(activeView, sceneBounds);
      desiredPosition.current.copy(position);
      desiredTarget.current.copy(target);
      transitioningRef.current = true;
    }
  }, [fitToViewCount, activeView, sceneBounds]);

  useEffect(() => {
    if (resetCameraCount > 0) {
      const { position, target } = getCameraConfig('isometric', sceneBounds);
      desiredPosition.current.copy(position);
      desiredTarget.current.copy(target);
      transitioningRef.current = true;
      controlsRef.current?.saveState();
    }
  }, [resetCameraCount, sceneBounds]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enableZoom = true;
      controlsRef.current.enablePan = true;
      controlsRef.current.enableRotate = true;
    }
  }, []);

  useFrame((_, delta) => {
    if (transitioningRef.current) {
      const lerpAmount = Math.min(1, delta * 5);
      camera.position.lerp(desiredPosition.current, lerpAmount);
      controlsRef.current?.target.lerp(desiredTarget.current, lerpAmount);
      controlsRef.current?.update();

      const distance = camera.position.distanceTo(desiredPosition.current);
      if (distance < 0.02) {
        transitioningRef.current = false;
      }
    }
    controlsRef.current?.update();
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[12, 18, 10]} intensity={1.2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <pointLight position={[-10, 10, -10]} intensity={0.4} />

      {visibleModels.length === 0 ? (
        <mesh>
          <Html center>
            <div className="drop-zone" style={{ padding: '18px', pointerEvents: 'none' }}>
              <strong>No models loaded</strong>
              <div>Upload or drop STL / GLTF / GLB files to begin.</div>
            </div>
          </Html>
        </mesh>
      ) : null}

      <group>
        {models.map((model) => (
          <primitive key={model.id} object={model.object} visible={model.visible} />
        ))}
      </group>

      <OrbitControls
        ref={controlsRef}
        enablePan
        enableZoom
        enableRotate
        minDistance={4}
        maxDistance={120}
        makeDefault
        onStart={() => {
          if (transitioningRef.current) {
            transitioningRef.current = false;
          }
        }}
      />
      <OrientationGizmo onViewChange={setActiveView} />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport axisColors={['#ef4444', '#22c55e', '#3b82f6']} labelColor="#f8fafc" />
      </GizmoHelper>
    </>
  );
}

export default function Viewer() {
  return (
    <div className="viewer-shell">
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [12, 12, 12], fov: 50, near: 0.1, far: 2000 }}
        shadows
        onCreated={({ gl }) => {
          gl.domElement.style.touchAction = 'none';
        }}
      >
        <SceneContents />
      </Canvas>
    </div>
  );
}
