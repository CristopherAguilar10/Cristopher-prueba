import Wheel from "../components/rimCarousel";
import "./Home.css";

export default function Home() {
  return (
    <div className="wheel-positioning">
      {/* 🎯 Este div es el que tapa la parte superior de la llanta */}
      <div className="wheel-overlay-top" />

      {/* Tu llanta */}
      <Wheel steps={3} />
    </div>
  );
}
