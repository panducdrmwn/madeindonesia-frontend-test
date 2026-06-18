'use client';

import { DragEvent, ChangeEvent, useMemo, useState } from 'react';
import type { CameraView } from '../lib/modelStore';

type ToolbarProps = {
  onFiles: (files: FileList | File[]) => void;
  onViewChange: (view: CameraView) => void;
  onFitToView: () => void;
  onResetCamera: () => void;
  onClearAll: () => void;
};

const views: CameraView[] = ['front', 'back', 'left', 'right', 'top', 'bottom', 'isometric'];

export default function Toolbar({ onFiles, onViewChange, onFitToView, onResetCamera, onClearAll }: ToolbarProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFiles(event.target.files);
      event.currentTarget.value = '';
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files.length > 0) {
      onFiles(event.dataTransfer.files);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
  };

  const viewButtons = useMemo(
    () =>
      views.map((view) => (
        <button key={view} type="button" onClick={() => onViewChange(view)}>
          {view}
        </button>
      )),
    [onViewChange],
  );

  return (
    <div className="toolbar">
      <div className="upload-button">
        <button type="button">Upload models</button>
        <input type="file" multiple accept=".stl,.glb,.gltf" onChange={handleInputChange} />
      </div>

      <div
        className={`drop-zone${dragActive ? ' drag-active' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <strong>Drag files here</strong>
        <span>Drop STL, GLTF, or GLB models to load multiple assets simultaneously.</span>
      </div>

      <div className="button-row">{viewButtons}</div>

      <div className="button-row">
        <button type="button" onClick={onFitToView}>
          Fit to view
        </button>
        <button type="button" onClick={onResetCamera}>
          Reset camera
        </button>
      </div>
      <button type="button" onClick={onClearAll} className="small-button">
        Clear all models
      </button>
    </div>
  );
}
