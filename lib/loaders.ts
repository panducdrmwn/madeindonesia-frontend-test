import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import type { ModelItem } from './modelStore';

async function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(reader.result);
      } else {
        reject(new Error('Could not read file as ArrayBuffer.'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

function buildStlModel(data: ArrayBuffer, fileName: string): ModelItem {
  const loader = new STLLoader();
  const geometry = loader.parse(data);
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    color: 0x82c7ff,
    metalness: 0.3,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const group = new THREE.Group();
  group.add(mesh);

  const boundingBox = new THREE.Box3().setFromObject(group);
  const center = new THREE.Vector3();
  boundingBox.getCenter(center);
  group.position.copy(center.multiplyScalar(-1));
  group.name = fileName;

  return {
    id: `${Date.now()}-${fileName}`,
    name: fileName,
    object: group,
    visible: true,
  };
}

async function buildGltfModel(data: ArrayBuffer, fileName: string): Promise<ModelItem> {
  const loader = new GLTFLoader();
  const gltf = await loader.parseAsync(data, '');
  const scene = gltf.scene.clone(true);
  scene.name = fileName;

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (!child.material) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0x82c7ff,
          metalness: 0.3,
          roughness: 0.6,
        });
      }
    }
  });

  return {
    id: `${Date.now()}-${fileName}`,
    name: fileName,
    object: scene,
    visible: true,
  };
}

export async function loadModelFile(file: File): Promise<ModelItem | null> {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
  try {
    const data = await readFileAsArrayBuffer(file);
    if (extension === 'stl') {
      return buildStlModel(data, file.name);
    }
    if (extension === 'glb' || extension === 'gltf') {
      return await buildGltfModel(data, file.name);
    }
  } catch (error) {
    console.error('Failed to load model file:', file.name, error);
  }
  return null;
}
