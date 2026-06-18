'use client';

import { useCallback } from 'react';
import Toolbar from '../components/Toolbar';
import ModelList from '../components/ModelList';
import Viewer from '../components/Viewer';
import { loadModelFile } from '../lib/loaders';
import { useViewerStore, type CameraView } from '../lib/modelStore';

export default function HomePage() {
  const models = useViewerStore((state) => state.models);
  const addModels = useViewerStore((state) => state.addModels);
  const setActiveView = useViewerStore((state) => state.setActiveView);
  const fitToView = useViewerStore((state) => state.fitToView);
  const resetCamera = useViewerStore((state) => state.resetCamera);
  const clearModels = useViewerStore((state) => state.clearModels);

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileList = Array.from(files);
      const loaded = await Promise.all(fileList.map((file) => loadModelFile(file)));
      const validModels = loaded.filter((model): model is NonNullable<typeof model> => Boolean(model));
      if (validModels.length > 0) {
        addModels(validModels);
      }
    },
    [addModels],
  );

  return (
    <main className="page-shell">
      <section className="sidebar">
        <div className="panel">
          <h1>3D Model Viewer</h1>
          <p className="subtitle">Load multiple STL or GLB/GLTF files and view them together in one scene.</p>
          <Toolbar
            onFiles={handleFiles}
            onViewChange={(view: CameraView) => setActiveView(view)}
            onFitToView={fitToView}
            onResetCamera={resetCamera}
            onClearAll={clearModels}
          />
        </div>
        <div className="panel model-list-panel">
          <h2>Loaded Models</h2>
          <ModelList models={models} />
        </div>
      </section>

      <section className="viewer-panel">
        <Viewer />
      </section>
    </main>
  );
}
