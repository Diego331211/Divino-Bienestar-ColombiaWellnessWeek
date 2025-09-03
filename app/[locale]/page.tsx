import Hero from "./components/Hero";
import BlockedPopup from "../../components/BlockedPopup";
import CitySection from "./components/citysection";
import CounterSection from "./components/counter-section";
import DataSections from "./components/datasections";
import EndSection from "./components/end";
import SponsorshipTiers from "./components/sponsor-ships";
import EventTimeline from "./components/timeline";

export default function Home() {
  // Cambia esto a false si no quieres mostrar el popup
  const isBlocked = true;

  return (
    <>
      {/* Video Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <img
          src="/images/fondo.png"
          alt="fondo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Popup bloqueante por falta de pago */}
     // <BlockedPopup visible={isBlocked} />

      <div className="relative">
        <Hero />
        <DataSections />
        <CitySection />
        <CounterSection />
        <EventTimeline />
        <SponsorshipTiers />
        <EndSection />
      </div>
    </>
  );
}
