'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import type { CameraView } from '../lib/modelStore';

type OrientationGizmoProps = {
  onViewChange: (view: CameraView) => void;
};

export default function OrientationGizmo({ onViewChange }: OrientationGizmoProps) {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.style.cursor = 'grab';
    return () => {
      canvas.style.cursor = '';
    };
  }, [gl.domElement]);

  return (
    <group position={[120, -110, 0]} scale={0.75}>
      <mesh onClick={() => onViewChange('front')} position={[0, 0, 1]}>
        <boxGeometry args={[16, 16, 16]} />
        <meshStandardMaterial color="#38bdf8" opacity={0.85} transparent />
      </mesh>
      <mesh onClick={() => onViewChange('top')} position={[0, 16, 0]}>
        <boxGeometry args={[12, 12, 12]} />
        <meshStandardMaterial color="#a855f7" opacity={0.85} transparent />
      </mesh>
      <mesh onClick={() => onViewChange('back')} position={[0, 0, -1]}>
        <boxGeometry args={[16, 16, 16]} />
        <meshStandardMaterial color="#ec4899" opacity={0.85} transparent />
      </mesh>
      <mesh onClick={() => onViewChange('left')} position={[-16, 0, 0]}>
        <boxGeometry args={[16, 16, 16]} />
        <meshStandardMaterial color="#f59e0b" opacity={0.85} transparent />
      </mesh>
    </group>
  );
}
