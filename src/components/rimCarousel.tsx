import "./WheelCarousel.css";
import { useWheelDrag } from "../hooks/useWheelDrag"; // ⬅️ ahora `.ts` (¡tipado!)

const cards = [
  {
    title: "Bosque Privado",
    image: "/assets/021.jpg",
    description: "Recorrido dentro de nuestro bosque privado.",
  },
  {
    title: "Bosque Privado",
    image: "/assets/021.jpg",
    description: "Recorrido dentro de nuestro bosque privado.",
  },
  {
    title: "Bosque Privado",
    image: "/assets/021.jpg",
    description: "Recorrido dentro de nuestro bosque privado.",
  },
];

export default function WheelCarousel() {
 const { rotation, containerRef, handleMouseDown, isDragging } = useWheelDrag();

  const radius = 230;
  const stepAngle = (2 * Math.PI) / cards.length;

  return (
    <div
  ref={containerRef}
  className={`wheel-container ${isDragging ? "dragging" : ""}`}
  onPointerDown={handleMouseDown}
>
      <div
        className="rotating-group"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <img src="/assets/Llanta.png" alt="Wheel" className="wheel-image" />

        {/* Red circle */}
        <div className="red-circle" />

        {/* Dots */}
        {cards.map((_, i) => {
          const angle = i * stepAngle;
          const visualAngle = angle + (rotation * Math.PI) / 180;
          const pointRadius = radius - 5;
          const x = pointRadius * Math.cos(visualAngle);
          const y = pointRadius * Math.sin(visualAngle);

          return (
            <div
              key={`dot-${i}`}
              className="dot"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            />
          );
        })}

        {cards.map((card, i) => {
          const angle = i * stepAngle;
          const visualAngle = angle + (rotation * Math.PI) / 180;
          const deg = (visualAngle * 180) / Math.PI;

          const normalized = ((deg % 360) + 360) % 360;
          const diff = Math.min(
            Math.abs(normalized - 270),
            360 - Math.abs(normalized - 270)
          );
          const t = 1 - Math.min(diff / 90, 1); // 1 en el tope
          const scale = 1 + t * 0.5;

          const extraDistance = scale * 30; // 💡 Empuja más lejos si es más grande
          const distance = radius + 100 + extraDistance;

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
          scale(${scale})
        `,
                transformOrigin: "center center",
                transition: "transform 0.2s ease-out",
                zIndex: Math.round(t * 100),
              }}
            >
              <img src={card.image} alt={card.title} />
              <h4>{card.title}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
