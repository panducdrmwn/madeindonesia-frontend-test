import { create } from 'zustand';
import type * as THREE from 'three';

export type CameraView = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom' | 'isometric';

export type ModelItem = {
  id: string;
  name: string;
  object: THREE.Object3D;
  visible: boolean;
};

type ViewerState = {
  models: ModelItem[];
  activeView: CameraView;
  fitToViewCount: number;
  resetCameraCount: number;
  addModels: (models: ModelItem[]) => void;
  removeModel: (id: string) => void;
  toggleVisibility: (id: string) => void;
  setActiveView: (view: CameraView) => void;
  fitToView: () => void;
  resetCamera: () => void;
  clearModels: () => void;
};

export const useViewerStore = create<ViewerState>((set) => ({
  models: [],
  activeView: 'isometric',
  fitToViewCount: 0,
  resetCameraCount: 0,
  addModels: (models) =>
    set((state) => ({
      models: [...state.models, ...models],
    })),
  removeModel: (id) =>
    set((state) => ({
      models: state.models.filter((model) => model.id !== id),
    })),
  toggleVisibility: (id) =>
    set((state) => ({
      models: state.models.map((model) =>
        model.id === id ? { ...model, visible: !model.visible } : model,
      ),
    })),
  setActiveView: (view) =>
    set(() => ({
      activeView: view,
    })),
  fitToView: () =>
    set((state) => ({
      fitToViewCount: state.fitToViewCount + 1,
    })),
  resetCamera: () =>
    set((state) => ({
      resetCameraCount: state.resetCameraCount + 1,
    })),
  clearModels: () =>
    set(() => ({
      models: [],
    })),
}));
