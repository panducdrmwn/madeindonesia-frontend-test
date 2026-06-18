'use client';

import { useMemo } from 'react';
import { useViewerStore } from '../lib/modelStore';
import type { ModelItem } from '../lib/modelStore';

type ModelListProps = {
  models: ModelItem[];
};

export default function ModelList({ models }: ModelListProps) {
  const toggleVisibility = useViewerStore((state) => state.toggleVisibility);
  const removeModel = useViewerStore((state) => state.removeModel);

  const items = useMemo(
    () =>
      models.map((model) => (
        <div key={model.id} className="model-item">
          <span>{model.name}</span>
          <div className="model-actions">
            <button type="button" onClick={() => toggleVisibility(model.id)}>
              {model.visible ? 'Hide' : 'Show'}
            </button>
            <button type="button" onClick={() => removeModel(model.id)}>
              Delete
            </button>
          </div>
        </div>
      )),
    [models, removeModel, toggleVisibility],
  );

  if (models.length === 0) {
    return <p>No models loaded. Use upload or drag-and-drop to add models.</p>;
  }

  return <div className="model-list">{items}</div>;
}
