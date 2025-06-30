import { useState, useRef, useEffect } from "react";

type Coords = { clientX: number; clientY: number };

export const useWheelDrag = () => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const startAngle = useRef(0);
  const lastRotation = useRef(0);

  const getAngle = (e: Coords, center: { x: number; y: number }) =>
    Math.atan2(e.clientY - center.y, e.clientX - center.x) * (180 / Math.PI);

  const handleMouseDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };

    startAngle.current = getAngle(e, center);
    setIsDragging(true);
  };

  const handleMouseMove = (e: PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };

    const currentAngle = getAngle(e, center);
    const delta = currentAngle - startAngle.current;
    setRotation(lastRotation.current + delta);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    lastRotation.current = rotation;
  };

  useEffect(() => {
    window.addEventListener("pointermove", handleMouseMove);
    window.addEventListener("pointerup", handleMouseUp);
    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("pointerup", handleMouseUp);
    };
  }, [rotation, isDragging]);

  return {
    rotation,
    containerRef,
    handleMouseDown,
    isDragging, // 👈 nuevo
  };
};

