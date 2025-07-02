import { useState, useRef, useEffect } from "react";

type Coords = { clientX: number; clientY: number };

export const useWheelDrag = () => {
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isDragging = useRef(false);
  const startAngle = useRef(0);
  const baseRotation = useRef(0);

  const getAngle = (e: Coords, rect: DOMRect) => {
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    return Math.atan2(y, x) * (180 / Math.PI);
  };

  const handleMouseDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    startAngle.current = getAngle(e, rect);
    baseRotation.current = rotation;
    isDragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handleMouseMove = (e: PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentAngle = getAngle(e as any, rect);

    let delta = currentAngle - startAngle.current;

    // Normaliza entre -180 y 180
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    setRotation(baseRotation.current + delta);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    baseRotation.current = rotation;
  };

  useEffect(() => {
    window.addEventListener("pointermove", handleMouseMove);
    window.addEventListener("pointerup", handleMouseUp);
    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("pointerup", handleMouseUp);
    };
  }, [rotation]);

  return {
    rotation,
    containerRef,
    handleMouseDown,
  };
};
