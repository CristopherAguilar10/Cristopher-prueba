import { useState, useRef, useEffect } from 'react';

type Coords = { clientX: number; clientY: number };

export function useCircularDrag(itemsCount: number) {
  const [rotation, setRotation] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startAngle = useRef(0);
  const baseRotation = useRef(0);

  const getAngle = (e: Coords) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
  };

  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    baseRotation.current = rotation;
    startAngle.current = getAngle(e);
    ref.current?.setPointerCapture(e.pointerId);
  };

  const onMove = (e: PointerEvent) => {
    if (!dragging.current) return;
    const current = getAngle(e as any);
    const delta = current - startAngle.current;
    setRotation(baseRotation.current + delta);
  };

  const onUp = () => {
    dragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return { rotation, ref, onDown };
}
