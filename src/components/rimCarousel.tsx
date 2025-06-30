import './WheelCarousel.css';
import { useWheelRotation } from '../hooks/useWheelRotation';

const cards = [
  {
    title: 'Bosque Privado',
    image: '/assets/021.jpg',
  },
  {
    title: 'Grupos Reducidos',
    image: '/assets/021.jpg',
  },
  {
    title: 'Experiencia Exclusiva',
    image: '/assets/021.jpg',
  },
];

export default function WheelCarousel() {
  const { rotation } = useWheelRotation();

  const radius = 250;
  const stepAngle = (2 * Math.PI) / cards.length;

  return (
    <div className="wheel-container">
      <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }}>
        <img src="/assets/wheel.png" alt="Wheel" className="wheel-image" />
        {cards.map((card, i) => {
          const angle = i * stepAngle + (rotation * Math.PI) / 180;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <div
              className="card"
              key={i}
              style={{
                transform: `translate(${x}px, ${y}px)`,
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
