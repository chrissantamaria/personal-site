import { useEffect } from 'react';
import { Pane } from 'tweakpane';

import { animationConfig } from './config';

const TWEAK_GUI_ID = 'tweak-gui';
const TWEAKPANE_HEADER_SELECTOR = '.tp-rotv_t';

const BLOB_NUMBERS = [1, 2, 3, 4, 5, 6] as const;

function initTweakGUI() {
  const container = document.getElementById(TWEAK_GUI_ID);
  if (!container) {
    throw new Error(`#${TWEAK_GUI_ID} element not found`);
  }

  // Check if device is mobile based on viewport width
  const isMobile = window.innerWidth < 768;

  const pane = new Pane({
    title: 'Controls',
    container,
    expanded: !isMobile,
  });

  const colorsFolder = pane.addFolder({ title: 'Colors' });
  colorsFolder.addBinding(animationConfig, 'baseColor', {
    label: 'Background',
  });

  const movementFolder = pane.addFolder({
    title: 'Movement',
    expanded: false,
  });
  movementFolder.addBinding(animationConfig, 'speedVariation', {
    label: 'Speed Variation',
    min: 0,
    max: 0.5,
    step: 0.01,
  });

  const speedsFolder = movementFolder.addFolder({ title: 'Speeds' });
  const radiiFolder = movementFolder.addFolder({ title: 'Movement Radii' });

  const blobsFolder = pane.addFolder({
    title: 'Blob Properties',
    expanded: false,
  });
  const sizesFolder = blobsFolder.addFolder({ title: 'Sizes' });
  const softnessFolder = blobsFolder.addFolder({ title: 'Softness' });
  const colorMixFolder = blobsFolder.addFolder({ title: 'Color Mixing' });

  for (const i of BLOB_NUMBERS) {
    const label = `Blob ${i}`;

    colorsFolder.addBinding(animationConfig, `blobColor${i}`, {
      label,
    });

    speedsFolder.addBinding(animationConfig, `speed${i}`, {
      label,
      min: 0,
      max: 1,
      step: 0.01,
    });

    radiiFolder.addBinding(animationConfig, `radius${i}`, {
      label,
      min: 0,
      max: 2,
      step: 0.01,
    });

    sizesFolder.addBinding(animationConfig, `blobSize${i}`, {
      label,
      min: 0,
      max: 2,
      step: 0.01,
    });

    softnessFolder.addBinding(animationConfig, `blobSoft${i}`, {
      label,
      min: 0,
      max: 1,
      step: 0.01,
    });

    colorMixFolder.addBinding(animationConfig, `colorMix${i}`, {
      label,
      min: 0,
      max: 1,
      step: 0.01,
    });
  }

  const disposeDraggable = makeDraggable(container.parentElement!);

  return () => {
    pane.dispose();
    disposeDraggable();
  };
}

export function TweakGUI() {
  useEffect(() => {
    const dispose = initTweakGUI();
    return () => {
      dispose();
    };
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      ${TWEAKPANE_HEADER_SELECTOR} {
        cursor: move !important;
        user-select: none !important;
      }
      ${TWEAKPANE_HEADER_SELECTOR}:active {
        cursor: grabbing !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="animate-fade-in fixed top-4 right-4 z-10">
      <div id={TWEAK_GUI_ID} />
    </div>
  );
}

function makeDraggable(element: HTMLElement) {
  let isDragging = false;
  let hasDragged = false;
  let currentX = 0;
  let currentY = 0;
  let initialX = 0;
  let initialY = 0;
  let xOffset = 0;
  let yOffset = 0;
  let dragStartX = 0;
  let dragStartY = 0;

  function onMouseDown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    // Only allow dragging from the tweakpane header
    if (!target.closest(TWEAKPANE_HEADER_SELECTOR)) return;

    e.stopPropagation();

    dragStartX = e.clientX;
    dragStartY = e.clientY;
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    hasDragged = false;

    if (e.target === target.closest(TWEAKPANE_HEADER_SELECTOR)) {
      isDragging = true;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  }

  function onMouseMove(e: MouseEvent) {
    if (!isDragging) return;

    e.stopPropagation();

    const deltaX = Math.abs(e.clientX - dragStartX);
    const deltaY = Math.abs(e.clientY - dragStartY);

    // Consider it a drag if moved more than 3 pixels
    if (deltaX > 3 || deltaY > 3) {
      hasDragged = true;
    }

    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    element.style.transform = `translate(${currentX}px, ${currentY}px)`;
  }

  function onMouseUp(e: MouseEvent) {
    if (isDragging) {
      e.stopPropagation();

      // If we dragged, prevent the subsequent click event
      if (hasDragged) {
        setTimeout(() => {
          hasDragged = false;
        }, 0);
      }
    }
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  function onClick(e: MouseEvent) {
    if (hasDragged) {
      e.stopPropagation();
      hasDragged = false;
    }
  }

  element.addEventListener('mousedown', onMouseDown);
  element.addEventListener('click', onClick, true);

  return () => {
    element.removeEventListener('mousedown', onMouseDown);
    element.removeEventListener('click', onClick, true);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
}
