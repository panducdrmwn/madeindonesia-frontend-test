# Product Requirements Document (PRD)
## 3D Model Viewer — Frontend Technical Test (MadeIndonesia)

---

## Overview

Build a web-based 3D viewer that allows users to load, view, and interact with multiple 3D models simultaneously in a single scene.

**Stack:** React + Next.js + TypeScript + Three.js

---

## Goals

- Enable users to upload and view multiple 3D models in one unified scene.
- Provide intuitive camera controls with predefined views and smooth transitions.
- Display an orientation gizmo for quick camera reorientation.
- Deliver a clean, usable UI with essential scene interaction tools.

---

## Features

### 1. Multiple Model Loading
- Accept multiple 3D file uploads simultaneously.
- Supported formats: **STL**, **GLTF/GLB** (GLTF/GLB preferred).
- All loaded models must render within the same Three.js scene.

### 2. Camera Controls
Provide buttons to switch between predefined camera views with **smooth transitions**:

| View | Description |
|------|-------------|
| Front | Camera facing front of scene |
| Back | Camera facing back of scene |
| Left | Camera from left side |
| Right | Camera from right side |
| Top | Camera looking down |
| Bottom | Camera looking up |
| Isometric | Standard isometric perspective |

### 3. Gizmo / Orientation Control
- Display a **view cube** or **orientation gizmo** on-screen.
- Clicking gizmo faces/axes reorients the camera accordingly.
- Any open-source gizmo solution is acceptable.

### 4. Scene Interaction
- **Orbit controls:** rotate, pan, and zoom with mouse/touch.
- **Fit-to-view:** auto-fit camera to encompass all loaded models.
- **Reset camera:** button to return camera to default position.

### 5. UI Components
The interface must include:
- File upload button (with drag-and-drop support as a bonus).
- List of loaded models currently in the scene.
- Camera view preset buttons (Front, Back, Left, Right, Top, Bottom, Isometric).
- Reset view button.

---

## Bonus Features (Nice-to-Have)

- Drag-and-drop file loading.
- Use **React Three Fiber** and **Drei** for 3D scene management.
- Smooth animated camera transitions.
- Global state management with **Zustand**.
- Model visibility toggle (show/hide individual models).
- Model delete functionality (remove individual models from scene).

---

## Technical Requirements

- **Framework:** React + Next.js (TypeScript)
- **3D Library:** Three.js (React Three Fiber + Drei encouraged)
- **Code Structure:** Clear folder structure with reusable components
- **Code Quality:** Clean, readable, and maintainable code
- **State Management:** Zustand (bonus)
- **Test Assets:** Use the 3D assets provided by MadeIndonesia (required for evaluation)

---

## Non-Functional Requirements

- Camera transitions must be visually smooth (no jarring jumps).
- The viewer should handle multiple models without significant performance degradation.
- UI should be intuitive without requiring documentation to navigate.

---

