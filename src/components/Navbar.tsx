import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: t('nav.work'), href: "#work" },
    { name: t('nav.experience'), href: "#experience" },
    { name: t('nav.services'), href: "#services" },
    { name: t('nav.contact'), href: "#contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[150] mix-blend-difference text-white px-6 py-8 flex justify-between items-start md:items-center">
        <div className="font-bold tracking-widest-xl text-[10px] md:text-sm uppercase max-w-[150px] md:max-w-none">
          Erick Padrón Durán — DESIGN & DEV
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 text-[10px] font-bold tracking-widest-xl uppercase items-center">
          {menuItems.map((item) => (
            <a key={item.name} href={item.href} className="hover:line-through transition-all">
              {item.name}
            </a>
          ))}

          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="border border-white/30 px-3 py-1 rounded-full hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
          >
            {language === 'en' ? 'ES' : 'EN'}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="text-[8px] font-bold tracking-widest-xl uppercase border border-white/30 px-2 py-1 rounded-full cursor-pointer"
          >
            {language === 'en' ? 'ES' : 'EN'}
          </button>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="text-[8px] font-bold tracking-widest-xl uppercase flex items-center gap-1 cursor-pointer"
          >
            <Menu size={14} />
            {isMenuOpen ? '' : 'Menu'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-white text-black flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-24">
              <div className="font-bold tracking-widest-xl text-[10px] uppercase">
                Erick Padrón Durán
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:rotate-90 transition-transform duration-300 cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {menuItems.map((item, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-5xl font-light font-serif uppercase tracking-tighter hover:italic transition-all"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-black/10 flex flex-col gap-4">
              <span className="text-[10px] font-light tracking-widest-xl uppercase opacity-50">Social</span>
              <div className="flex gap-8">
                <a href="https://github.com/erickpd-hub" className="text-sm font-light hover:underline">GitHub</a>
                <a href="https://www.linkedin.com/in/erick-padron-5647b3369" className="text-sm font-light hover:underline">LinkedIn</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
