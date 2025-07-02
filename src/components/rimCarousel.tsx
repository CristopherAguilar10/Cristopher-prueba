import { useWheelDrag } from "../hooks/useWheelDrag";
import "./WheelCarousel.css";

type WheelProps = {
  steps: number;
};

const cards = [
  { image: "/assets/021.jpg", title: "Piscina Termal" },
  { image: "/assets/021.jpg", title: "Otra Card" },
  { image: "/assets/021.jpg", title: "Tercera Card" },
];

export default function Wheel({ steps }: WheelProps) {
  const { rotation, containerRef, handleMouseDown } = useWheelDrag(steps);

  const radius = 200;
  const cardOffset = 400;

  return (
    <div
      ref={containerRef}
      className="wheel-container"
      onPointerDown={handleMouseDown}
    >
      <div
        className="rotating-group"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* 🔴 Dots fijos en la rueda */}
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

        {cards.map((card, i) => {
          const angleDeg = (360 / steps) * i;

          return (
            <div
              key={`dot-card-${i}`}
              className="dot-wrapper"
              style={{ transform: `rotate(${angleDeg}deg)` }}
            >
              <div className="dot" />

              {/* 🃏 Card anidada alineada al centro de la llanta */}
              <div
                className="card"
                style={{
                  transform: `
            translateY(-${radius - cardOffset}px)
            rotate(${180 - angleDeg}deg)


          `,
                  transformOrigin: "center center",
                  transition: "transform 0.2s ease-out",
                }}
              >
                <img src={card.image} alt={card.title} />
                <h4>{card.title}</h4>
              </div>
            </div>
          );
        })}

        {/* 🛞 Llanta al fondo */}
        <img src="/assets/Llanta.png" alt="Llanta" className="wheel-image" />
      </div>
    </div>
  );
}
