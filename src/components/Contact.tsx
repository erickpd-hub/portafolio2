import { useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import ContactModal from "./ContactModal";
import cvPdf from "../assets/cv/ErickPDCVW.pdf";

export default function Contact() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.section 
      id="contact" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="px-6 py-48 flex flex-col items-center justify-center text-center"
    >
      <div className="overflow-hidden mb-12">
        <motion.h2 
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[10px] font-light font-tech tracking-widest-xl uppercase"
        >
          {t('contact.collaboration')}
        </motion.h2>
      </div>
      
      <div className="overflow-hidden mb-12">
        <motion.button 
          initial={{ y: "100%", skewY: 10 }}
          whileInView={{ y: 0, skewY: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1, 
            delay: 0.4, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.02 }}
          className="text-4xl md:text-8xl font-light font-tech uppercase tracking-tighter hover:line-through cursor-pointer block"
        >
          {t('contact.title')}
        </motion.button>
      </div>
      
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 w-full mt-24 border-t border-black"
      >
        <div className="text-left p-8 border-b md:border-b-0 md:border-r border-black hover:bg-black hover:text-white transition-colors duration-500 group">
          <span className="text-[10px] font-light font-tech tracking-widest-xl uppercase block mb-4 opacity-50 group-hover:opacity-100">{t('contact.availability')}</span>
          <p className="text-xl font-light font-tech uppercase leading-tight">{t('contact.availability.desc')}</p>
        </div>
        <div className="text-left p-8 border-b md:border-b-0 md:border-r border-black hover:bg-black hover:text-white transition-colors duration-500 group">
          <span className="text-[10px] font-light font-tech tracking-widest-xl uppercase block mb-4 opacity-50 group-hover:opacity-100">{t('contact.network')}</span>
          <div className="flex flex-col gap-2">
            <a href="https://github.com/erickpd-hub" target="_blank" rel="noopener noreferrer" className="text-2xl font-light font-tech hover:line-through">GITHUB</a>
            <a href="https://www.linkedin.com/in/erick-padron-5647b3369?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" className="text-2xl font-light font-tech hover:line-through">LINKEDIN</a>
          </div>
        </div>
        <div className="text-left p-8 hover:bg-black hover:text-white transition-colors duration-500 group relative overflow-hidden">
          <span className="text-[10px] font-light font-tech tracking-widest-xl uppercase block mb-4 opacity-50 group-hover:opacity-100">{t('contact.resume')}</span>
          <div className="flex flex-col gap-4">
            <a 
              href={cvPdf} 
              target="_blank"
              rel="noopener noreferrer"
              className="group/cv"
            >
              <p className="text-xl font-light font-tech uppercase leading-tight group-hover/cv:line-through transition-all">
                {t('contact.resume.desc')}
              </p>
            </a>
            <a 
              href={cvPdf} 
              target="_blank"
              rel="noopener noreferrer" 
              className="w-12 h-12 border-2 border-current rounded-full flex items-center justify-center font-light font-tech hover:bg-white hover:text-black transition-all duration-300 transform hover:rotate-90"
            >
              ↓
            </a>
          </div>
        </div>
      </motion.div>
      
      <div className="w-full flex flex-col md:flex-row justify-between items-center mt-12 gap-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-[10px] font-light font-tech tracking-widest-xl uppercase"
        >
          {t('contact.copyright')}
        </motion.div>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1, rotate: 180 }}
          className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center font-black text-xl border-2 border-black hover:bg-white hover:text-black transition-all duration-500"
        >
          ↑
        </motion.button>
      </div>
    </motion.section>
  );
}
