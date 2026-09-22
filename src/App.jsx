import { useState } from "react";
import Background from "./components/Background";
import ParticleCanvas from "./components/ParticleCanvas";
import SplashScreen from "./components/SplashScreen";
import ScrollProgress from "./components/ScrollProgress";
import SideNav from "./components/SideNav";
import BackToTop from "./components/BackToTop";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certificates from "./components/Certificates";
import Achievements from "./components/Achievements";
import Gate from "./components/Gate";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <div className="relative min-h-screen">
      {!ready && <SplashScreen onFinish={() => setReady(true)} />}

      <Background />
      <ParticleCanvas />
      <ScrollProgress />
      <SideNav />
      <BackToTop />
      <CustomCursor />

      <div className={`app-enter relative z-10 ${ready ? "app-ready" : ""}`}>
        <Navbar />
        <main className="relative">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certificates />
          <Achievements />
          <Gate />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}