import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Experience() {
  const { t } = useLanguage();

  const experiences = [
    {
      year: t('experience.role1.date'),
      title: t('experience.role1.title'),
      company: t('experience.role1.company'),
      location: t('experience.role1.location'),
      description: t('experience.role1.desc'),
      current: true
    },
    {
      year: t('experience.role2.date'),
      title: t('experience.role2.title'),
      company: t('experience.role2.company'),
      location: t('experience.role2.location'),
      description: t('experience.role2.desc')
    },
  ];

  return (
    <section id="experience" className="py-32 px-6 bg-white border-t border-black overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-32 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-light font-serif uppercase tracking-tighter leading-[0.8] mb-8"
          >
            Exp<br/>erience
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[10px] font-light text-black/50 uppercase tracking-widest-xl"
          >
            {t('experience.subtitle')}
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Trunk - Centered */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-0 w-[1px] h-full bg-black/20 origin-top -translate-x-1/2 hidden md:block"
          />

          {/* Mobile Trunk - Left aligned */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 w-[1px] h-full bg-black/20 origin-top md:hidden"
          />

          <div className="space-y-32 relative">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className="relative group">
                  {/* Desktop Layout */}
                  <div className="hidden md:grid grid-cols-2 gap-24 items-center min-h-[200px]">
                    {/* Left Side */}
                    <div className="relative h-full flex items-center">
                      {isEven ? (
                        <ExperienceCard exp={exp} side="left" />
                      ) : (
                        <DetailCard description={exp.description} side="left" />
                      )}
                    </div>

                    {/* Right Side */}
                    <div className="relative h-full flex items-center">
                      {!isEven ? (
                        <ExperienceCard exp={exp} side="right" />
                      ) : (
                        <DetailCard description={exp.description} side="right" />
                      )}
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden pl-8 space-y-4">
                    <ExperienceCard exp={exp} side="mobile" />
                    <div className="p-4 border border-black/10 text-sm font-light opacity-70">
                      {exp.description}
                    </div>
                  </div>

                  {/* Node on Trunk */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute left-0 md:left-1/2 top-8 md:top-1/2 w-3 h-3 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 z-20 border-2 border-white group-hover:scale-150 group-hover:bg-black transition-all duration-300"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp, side }: { exp: any, side: 'left' | 'right' | 'mobile' }) {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: side === 'left' ? -50 : side === 'right' ? 50 : 0, y: side === 'mobile' ? 20 : 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      className={`p-8 border border-black/10 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-500 cursor-pointer relative z-10 bg-white w-full
        ${side === 'left' ? 'text-right' : 'text-left'}
      `}
    >
      {/* Branch line to trunk */}
      {side !== 'mobile' && (
        <div className={`absolute top-1/2 -translate-y-1/2 w-12 h-[1px] bg-black/10 group-hover:bg-black transition-colors
          ${side === 'left' ? '-right-12' : '-left-12'}
        `} />
      )}

      <div className={`flex flex-col mb-4 ${side === 'left' ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-3 mb-2">
          {side === 'left' && exp.current && (
            <span className="text-[8px] font-light uppercase tracking-widest border border-black/20 group-hover:border-white/40 px-2 py-0.5">
              {t('experience.current')}
            </span>
          )}
          <span className="inline-block text-[10px] font-light uppercase tracking-widest bg-black/5 text-black px-3 py-1 group-hover:bg-white group-hover:text-black transition-colors">
            {exp.year}
          </span>
          {side !== 'left' && exp.current && (
            <span className="text-[8px] font-light uppercase tracking-widest border border-black/20 group-hover:border-white/40 px-2 py-0.5">
              {t('experience.current')}
            </span>
          )}
        </div>
        <span className="text-[10px] font-light opacity-40 group-hover:opacity-60 transition-opacity uppercase tracking-widest-xl">
          {exp.company} • {exp.location}
        </span>
      </div>
      <h3 className="text-3xl md:text-5xl font-light font-serif uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
        {exp.title}
      </h3>
    </motion.div>
  );
}

function DetailCard({ description, side }: { description: string, side: 'left' | 'right' }) {
  return (
    <div 
      className={`opacity-0 group-hover:opacity-100 transition-all duration-700 p-8 border border-black/10 bg-black/[0.02] relative z-10 flex items-center justify-center w-full min-h-[120px]
        ${side === 'left' ? 'text-right' : 'text-left'}
      `}
    >
      {/* Branch line to trunk */}
      <div className={`absolute top-1/2 -translate-y-1/2 w-12 h-[1px] bg-black/10
        ${side === 'left' ? '-right-12' : '-left-12'}
      `} />

      <p className="text-lg font-light font-serif italic opacity-60 group-hover:opacity-100 transition-opacity leading-relaxed">
        {description}
      </p>
    </div>
  );
}

