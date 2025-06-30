import { useState, useRef, useEffect } from "react";

type Coords = {
  clientX: number;
  clientY: number;
};

export const useWheelDrag = () => {
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startAngle = useRef(0);
  const lastRotation = useRef(0);

  const getAngle = (e: Coords, rect: DOMRect) => {
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    return Math.atan2(y, x) * (180 / Math.PI);
  };

  const handleMouseDown = (e: MouseEvent | React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    startAngle.current = getAngle(e, rect);
    isDragging.current = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentAngle = getAngle(e, rect);
    const delta = currentAngle - startAngle.current;
    setRotation(lastRotation.current + delta);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    lastRotation.current = rotation;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [rotation]);

  return {
    rotation,
    containerRef,
    handleMouseDown,
  };
};
