import { useWheelDrag } from "../hooks/useWheelDrag";
import "./WheelCarousel.css";

type WheelProps = {
  steps: number;
};

const cards = [
  { image: "/assets/021.jpg", title: "Piscina Termal" },
  { image: "/assets/022.jpg", title: "Otra Card" },
  { image: "/assets/023.jpg", title: "Tercera Card" },
];

export default function Wheel({ steps }: WheelProps) {
  const { rotation, containerRef, handleMouseDown } = useWheelDrag(steps);

  const radius = 200;
  const cardOffset = 60;

  return (
    <div
      ref={containerRef}
      className="wheel-container"
      onPointerDown={handleMouseDown}
    >
      {/* 🛞 Llanta y puntos dentro del grupo rotatorio */}
      <div
        className="rotating-group"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="rotating-ring">
          {Array.from({ length: steps }).map((_, i) => {
            const angleDeg = (360 / steps) * i;
            return (
              <div
                key={`dot-${i}`}
                className="dot-wrapper"
                style={{ transform: `rotate(${angleDeg}deg)` }}
              >
                <div className="dot" />
              </div>
            );
          })}
        </div>
          {/* 🃏 Cards Alineadas */}
        {cards.map((card, i) => {
          const angleRad = ((360 / steps) * i * Math.PI) / 180;
          const visualAngle = angleRad + (rotation * Math.PI) / 180;
          const deg = (visualAngle * 180) / Math.PI;

          const distance = radius + cardOffset;
          const x = distance * Math.cos(visualAngle);
          const y = distance * Math.sin(visualAngle);

          return (
            <div
              key={i}
              className="card"
              style={{
                transform: `
                  translate(${x}px, ${y}px)
                  translate(-50%, -50%)
                  rotate(${deg + 90}deg)
                `,
                transformOrigin: "center center",
                transition: "transform 0.2s ease-out",
              }}
            >
              <img src={card.image} alt={card.title} />
              <h4>{card.title}</h4>
            </div>
          );
        })}
        <img src="/assets/Llanta.png" alt="Llanta" className="wheel-image" />
      </div>
    </div>
  );
}
