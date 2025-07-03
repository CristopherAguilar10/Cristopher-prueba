import { useState } from "react";
import { useWheelDrag } from "../hooks/useWheelDrag";
import "./WheelCarousel.css";

type WheelProps = {
  steps: number;
};

type CardType = {
  image: string;
  title: string;
};

const cards: CardType[] = [
  { image: "/assets/021.jpg", title: "Piscina Termal" },
  { image: "/assets/021.jpg", title: "Bosque Privado" },
  { image: "/assets/021.jpg", title: "Grupo reducido" },
  { image: "/assets/021.jpg", title: "Cuarta Card" },
  { image: "/assets/021.jpg", title: "Quinta Card" },
];

const getPaddedCards = (cards: CardType[], steps: number): CardType[] => {
  return Array.from({ length: steps }).map((_, i) => cards[i % cards.length]);
};

export default function Wheel({ steps }: WheelProps) {
  const { rotation, containerRef, handleMouseDown } = useWheelDrag(steps);
  const paddedCards = getPaddedCards(cards, steps);
  const radius = 450;


  const normalizedRotation = ((rotation % 360) + 360) % 360;

  const selectedIndex = paddedCards.findIndex((_, i) => {
    const angleDeg = (360 / steps) * i;
    const cardAngle = (angleDeg + normalizedRotation) % 360;
    const diff = Math.abs(cardAngle - 0);
    return diff < 360 / steps / 2;
  });

  return (
    <div
      ref={containerRef}
      className="wheel-container"
      onPointerDown={handleMouseDown}
      style={{ position: "relative" }}
    >
      <div
        className="rotating-group"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="rotating-ring"></div>

        {/* 🃏 Cards */}
        {paddedCards.map((card, i) => {
          const angleDeg = (360 / steps) * i;

          return (
            <div
              key={`dot-card-${i}`}
              className="dot-wrapper"
              style={{ transform: `rotate(${angleDeg}deg)` }}
            >
              {/* Card con efecto de selección */}
              <div
                className="card"
                style={{
                  transform: `
      translate(-50%, -${radius}px)
      rotate(${-rotation - angleDeg}deg)
      scale(${i === selectedIndex ? 1.5 : 1})
    `,
                  transformOrigin: "center center",
                  transition: "transform 0.3s ease-out",
                  zIndex: i === selectedIndex ? 10 : 1,
                  backgroundColor: "white",
                  borderRadius: "16px",
                  overflow: "hidden",
                  width: "180px",
                  height: "180px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  boxShadow:
                    i === selectedIndex
                      ? "0 12px 30px rgba(255,255,255,0.4)"
                      : "none",
                }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <h4>{card.title}</h4>
              </div>
            </div>
          );
        })}

        {/* 🛞 Llanta */}
        <img src="/assets/Llanta.png" alt="Llanta" className="wheel-image" />
      </div>
    </div>
  );
}
