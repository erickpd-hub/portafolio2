import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 500]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 w-full">
      <div className="px-6 mb-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-xl"
        >
          <p className="text-sm font-bold uppercase tracking-widest mb-4">{t('hero.available')}</p>
          <h2 className="text-2xl font-display uppercase tracking-tighter leading-none mb-6">
            {t('hero.title')}
          </h2>
          <p className="text-sm font-medium opacity-60 uppercase tracking-widest">
            {t('hero.subtitle')}
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col select-none pointer-events-none px-6">
        <motion.h1 
          style={{ x: x1 }}
          className="text-massive font-display whitespace-nowrap -ml-20"
        >
          {t('hero.design')}
        </motion.h1>
        <motion.h1 
          style={{ x: x2 }}
          className="text-[10.5vw] font-display whitespace-nowrap leading-none tracking-tighter self-end"
        >
          {t('hero.repeat')}
        </motion.h1>
      </div>
    </section>
  );
}
