import './WheelCarousel.css';
import { useWheelRotation } from '../hooks/useWheelRotation';

const cards = [
  {
    title: 'Bosque Privado',
    image: '/assets/021.jpg',
    description: 'Recorrido dentro de nuestro bosque privado.',
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
  const angle = i * stepAngle;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  const deg = (angle * 180) / Math.PI;

  return (
    <div
      key={i}
      className="card fixed"
      style={{
        transform: `
          translate(${x}px, ${y}px)
          rotate(${rotation + deg}deg)
          translate(-50%, -50%)
        `,
      }}
    >
      <div
        style={{
          transform: `rotate(-${rotation + deg}deg)`, // Corrige solo el contenido si querés
        }}
      >
        <img src={card.image} alt={card.title} />
        <h4>{card.title}</h4>
      </div>
    </div>
  );
})}




      </div>
    </div>
  );
}
