import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <div className="grainy min-h-screen">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="curtain"
              initial={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="curtain"
            />
          )}
        </AnimatePresence>

        <Navbar />

        <main>
          <Hero />

          <div className="relative z-10 bg-white">
            <Portfolio />
            <Services />
            <Experience />
            <Contact />
          </div>
        </main>

        {/* Decorative background text */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.02]">
          <div className="absolute top-0 left-0 text-[40vw] font-black leading-none -ml-20 -mt-20">
            ERICK PD
          </div>
          <div className="absolute bottom-0 right-0 text-[40vw] font-black leading-none -mr-20 -mb-20">
            DESIGN
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}
