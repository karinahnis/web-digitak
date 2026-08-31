import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustedBy from "./components/TrustedBy";
import ServicesGrid from "./components/ServicesGrid";
import WhyDigitak from "./components/WhyDigitak";
import PortfolioGrid from "./components/PortfolioGrid";
import Industries from "./components/Industries";
import Testimonials from "./components/Testimonials";
import CtaBand from "./components/CtaBand";
import Footer from "./components/Footer";
import Tentang from "./components/pages/Tentang";
import Layanan from "./components/pages/Layanan";
import DetailLayanan from "./components/pages/DetailLayanan";
import Portofolio from "./components/pages/Portofolio";
import Kontak from "./components/pages/Kontak";
import TestimoniPage from "./components/pages/TestimoniPage";
import AdminLogin from "./components/pages/admin/AdminLogin";
import AdminShell from "./components/pages/admin/AdminShell";

function App() {
  const [activePage, setActivePage] = useState("beranda");
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(() => window.location.search.includes("admin"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isAdminMode && !isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }
  if (isAdminMode && isLoggedIn) {
    return <AdminShell onLogout={() => setIsLoggedIn(false)} />;
  }

  return (
    <div>
      <Navbar activePage={activePage} onNavigate={setActivePage} />

      {activePage === "beranda" && (
        <>
          <Hero onNavigate={setActivePage} />
          <TrustedBy />
          <ServicesGrid onNavigate={setActivePage} />
          <WhyDigitak />
          <PortfolioGrid onNavigate={setActivePage} />
          <Industries onNavigate={setActivePage} />
          <Testimonials onNavigate={setActivePage} />
          <CtaBand onNavigate={setActivePage} />
        </>
      )}

      {activePage === "tentang" && <Tentang />}

      {activePage === "layanan" && (
        <Layanan onNavigate={setActivePage} onSelectService={setSelectedServiceId} />
      )}

      {activePage === "layanan-detail" && (
        <DetailLayanan serviceId={selectedServiceId} onNavigate={setActivePage} />
      )}

      {activePage === "portofolio" && <Portofolio />}

      {activePage === "kontak" && <Kontak />}

      {activePage === "testimoni" && <TestimoniPage />}

      <Footer onNavigate={setActivePage} />
    </div>
  );
}

export default App;