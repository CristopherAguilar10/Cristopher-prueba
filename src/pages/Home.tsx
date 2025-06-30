

import WheelCarousel from '../components/rimCarousel';
import './Home.css';

export default function Home() {
  return (
    <section className="carousel-section">
      <div className="carousel-wrapper">
        <WheelCarousel />
      </div>
    </section>
  );
}
