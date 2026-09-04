import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    { 
      id: "01", 
      title: t('services.ux.title'), 
      desc: t('services.ux.desc'),
      stack: ["FIGMA", "ADOBE CC", "FRAMER"]
    },
    { 
      id: "02", 
      title: t('services.frontend.title'), 
      desc: t('services.frontend.desc'),
      stack: ["REACT", "TYPESCRIPT", "TAILWIND"]
    },
    { 
      id: "03", 
      title: t('services.backend.title'), 
      desc: t('services.backend.desc'),
      stack: ["EXPRESS", "FASTAPI", "SUPABASE"]
    },
  ];

  return (
    <motion.section 
      id="services" 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="bg-black text-white py-24"
    >
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-4"
          >
            <h2 className="text-sm font-light font-tech tracking-widest-xl uppercase mb-8">{t('services.title')}</h2>
            <p className="text-xl font-light font-tech leading-tight opacity-70">
              {t('services.subtitle')}
            </p>
          </motion.div>
          
          <div className="md:col-span-8 flex flex-col">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: false }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.6, delay: index * 0.15 }
                  }
                }}
                className="group border-b border-white/20 py-12 flex flex-col md:flex-row gap-8 cursor-pointer relative overflow-hidden"
              >
                <motion.span 
                  variants={{
                    hidden: { x: 0 },
                    visible: { x: 0 },
                    hover: { x: 10 }
                  }}
                  className="text-4xl font-light font-tech opacity-30 group-hover:opacity-100 transition-opacity"
                >
                  {service.id}.
                </motion.span>
                
                <div className="flex-1">
                  <h3 className="text-4xl font-light font-tech mb-4 tracking-tighter">{service.title}</h3>
                  <p className="max-w-md text-sm font-light font-tech opacity-50 group-hover:opacity-100 transition-opacity leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 md:flex-col md:items-end md:justify-center min-h-[40px]">
                  {service.stack.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 0, x: 20 },
                        hover: { 
                          opacity: 1, 
                          x: 0,
                          transition: { 
                            delay: techIndex * 0.1,
                            duration: 0.4,
                            ease: "easeOut"
                          }
                        }
                      }}
                      className="text-[10px] font-light font-tech tracking-widest-xl border border-white/30 px-3 py-1 rounded-full whitespace-nowrap"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
