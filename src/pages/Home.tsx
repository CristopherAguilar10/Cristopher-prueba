import Wheel from "../components/rimCarousel";

export default function Home() {
  return (
    <div style={{ background: "#000", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Wheel steps={3} />
    </div>
  );
}
