import { useState, useRef } from "react";

type Coords = { clientX: number; clientY: number };

export const useWheelDrag = (steps: number) => {
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const prevAngle = useRef(0);
  const lastRotation = useRef(0);
  const center = useRef({ x: 0, y: 0 });

  const getAngle = (e: Coords) =>
    Math.atan2(e.clientY - center.current.y, e.clientX - center.current.x) * (180 / Math.PI);

  const handleMouseDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    center.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    
    prevAngle.current = getAngle(e);
    isDragging.current = true;

    window.addEventListener("pointermove", handleMouseMove);
    window.addEventListener("pointerup", handleMouseUp);

    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handleMouseMove = (e: PointerEvent) => {
    if (!isDragging.current) return;
    const angle = getAngle(e as any);
    const delta = angle - prevAngle.current;
    
    prevAngle.current = angle;
    lastRotation.current += delta;
    setRotation(lastRotation.current);
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    window.removeEventListener("pointermove", handleMouseMove);
    window.removeEventListener("pointerup", handleMouseUp);

    const stepAngle = 360 / steps;
    const snapped = Math.round(lastRotation.current / stepAngle) * stepAngle;
    lastRotation.current = snapped;
    setRotation(snapped);
  };

  return {
    rotation,
    containerRef,
    handleMouseDown,
  };
};
