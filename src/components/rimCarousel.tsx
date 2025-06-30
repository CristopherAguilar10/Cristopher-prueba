import "./WheelCarousel.css";
import { useWheelRotation } from "../hooks/useWheelRotation";

const cards = [
  {
    title: "Bosque Privado",
    image: "/assets/021.jpg",
    description: "Recorrido dentro de nuestro bosque privado.",
  },{
    title: "Bosque Privado",
    image: "/assets/021.jpg",
    description: "Recorrido dentro de nuestro bosque privado.",
  },{
    title: "Bosque Privado",
    image: "/assets/021.jpg",
    description: "Recorrido dentro de nuestro bosque privado.",
  },
];

export default function WheelCarousel() {
  const { rotation } = useWheelRotation();
  const radius = 230;
  const stepAngle = (2 * Math.PI) / cards.length;

  return (
    <div className="wheel-container">
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
          const pointRadius = radius - 5; // Para que el punto quede dentro del borde rojo
          const x = pointRadius * Math.cos(angle);
          const y = pointRadius * Math.sin(angle);

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
  const angle = i * stepAngle; // posición original de la card
  const visualAngle = angle + (rotation * Math.PI) / 180; // suma la rotación
  const deg = (visualAngle * 180) / Math.PI;
  const x = (radius + 100) * Math.cos(visualAngle);
  const y = (radius + 100) * Math.sin(visualAngle);

  const normalized = ((deg % 360) + 360) % 360;
  const diff = Math.min(Math.abs(normalized - 270), 360 - Math.abs(normalized - 270));
  const t = 1 - Math.min(diff / 90, 1); // 1 en el tope
  const scale = 1 + t * 0.5;

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
