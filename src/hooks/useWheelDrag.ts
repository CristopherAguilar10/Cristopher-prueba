import { useState, useRef, useEffect } from "react";

type Coords = { clientX: number; clientY: number };

export const useWheelDrag = (steps: number) => {
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startAngle = useRef(0);
  const lastRotation = useRef(0);
  const stepAngle = 360 / steps;

  const getAngle = (e: Coords, rect: DOMRect) =>
    Math.atan2(
      e.clientY - (rect.top + rect.height / 2),
      e.clientX - (rect.left + rect.width / 2)
    ) *
    (180 / Math.PI);

  const handleMouseDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    startAngle.current = getAngle(e, rect);
    isDragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handleMouseMove = (e: PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const current = getAngle(e as any, rect);
    setRotation(lastRotation.current + (current - startAngle.current));
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const raw = lastRotation.current = rotation;
    const snapped = Math.round(raw / stepAngle) * stepAngle;
    setRotation(snapped);
    lastRotation.current = snapped;
  };

  useEffect(() => {
    window.addEventListener("pointermove", handleMouseMove);
    window.addEventListener("pointerup", handleMouseUp);
    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("pointerup", handleMouseUp);
    };
  }, [rotation]);

  return { rotation, containerRef, handleMouseDown };
};
