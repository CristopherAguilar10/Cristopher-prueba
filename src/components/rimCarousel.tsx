import { useWheelDrag } from "../hooks/useWheelDrag";
import "./WheelCarousel.css";

type WheelProps = {
  steps: number;
};

export default function Wheel({ steps }: WheelProps) {
  const { rotation, containerRef, handleMouseDown } = useWheelDrag(steps);

  return (
    <div
      ref={containerRef}
      className="wheel-container"
      onPointerDown={handleMouseDown}
    >
      <div
        className="rotating-group"
        style={{ transform: `rotate(${rotation}deg)`, transition: "transform 0.4s ease-out" }}
      >
        <img src="/assets/Llanta.png" alt="Llanta" className="wheel-image" />
        <div className="red-circle" />
      </div>
    </div>
  );
}
