import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { ArrowUpRight } from "lucide-react";

import consultoriaVideo from "../assets/videos/consultoria b2b.mp4";
import renderStudioVideo from "../assets/videos/render studio.mp4";
import consultoriaFinancieraVideo from "../assets/videos/consultoria financiera.mp4";
import teslaVideo from "../assets/videos/tesla.mp4";

interface ProjectItem {
  id: string;
  title: string;
  category: {
    en: string;
    es: string;
  };
  video: string;
  link: string;
}

const landingProjects: ProjectItem[] = [
  {
    id: "consultoria-b2b",
    title: "consultoria b2b",
    category: {
      en: "Interactive B2B Landing & Strategy",
      es: "Landing Interactiva B2B & Estrategia"
    },
    video: consultoriaVideo,
    link: "https://consultoria-b2b.vercel.app/"
  },
  {
    id: "render-studio",
    title: "render studio",
    category: {
      en: "3D Animation & Render Studio",
      es: "Estudio de Renders & Animación 3D"
    },
    video: renderStudioVideo,
    link: "https://studio-render-pi.vercel.app/"
  },
  {
    id: "consultoria-financiera",
    title: "consultoria financiera",
    category: {
      en: "Financial Consulting Landing & Strategy",
      es: "Landing de Consultoría Financiera & Estrategia"
    },
    video: consultoriaFinancieraVideo,
    link: "https://consultoria-financiera-one.vercel.app/"
  },
  {
    id: "tesla",
    title: "tesla",
    category: {
      en: "Interactive Automotive Experience",
      es: "Experiencia Interactiva Automotriz"
    },
    video: teslaVideo,
    link: "https://tesla-two-omega.vercel.app/"
  }
];

interface VideoCardProps {
  key?: React.Key;
  project: ProjectItem;
  index: number;
  language: "en" | "es" | string;
}

function VideoCard({
  project,
  index,
  language,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    playVideo();

    // Ensure continuous playback on pause or loop completion
    video.addEventListener("pause", playVideo);
    video.addEventListener("ended", playVideo);

    return () => {
      video.removeEventListener("pause", playVideo);
      video.removeEventListener("ended", playVideo);
    };
  }, []);

  return (
    <motion.a
      key={project.id}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group block cursor-pointer"
    >
      {/* Big Card with Generously Rounded Corners */}
      <div className="relative aspect-[16/10] md:aspect-[16/10.5] w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-neutral-100 border border-black/10 shadow-sm transition-all duration-500 group-hover:shadow-2xl">
        <video
          ref={videoRef}
          src={project.video}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          onLoadedData={(e) => {
            e.currentTarget.muted = true;
            e.currentTarget.play().catch(() => {});
          }}
          className="w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Minimal Darkening Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />

        {/* Floating Minimal Arrow Badge on Hover */}
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md pointer-events-none">
          <ArrowUpRight size={20} />
        </div>
      </div>

      {/* Title Underneath in Bold */}
      <div className="mt-5 px-2 flex justify-between items-baseline gap-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-black transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-xs font-mono uppercase tracking-wider text-black/50 mt-1 block">
            {project.category[language]}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-widest text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>VISIT</span>
          <ArrowUpRight size={14} />
        </div>
      </div>
    </motion.a>
  );
}

export default function ImmersiveExperiences() {
  const { t, language } = useLanguage();

  return (
    <section 
      id="immersive" 
      className="px-6 py-24 border-t border-black bg-white text-black"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
        <h2 className="text-5xl md:text-6xl font-light font-serif uppercase tracking-tighter">
          {t('immersive.title')}
        </h2>
        <span className="text-[10px] font-light tracking-widest-xl uppercase opacity-50">
          {t('immersive.subtitle')}
        </span>
      </div>

      {/* Grid of Large Cards with Very Rounded Corners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 w-full">
        {landingProjects.map((project, index) => (
          <VideoCard
            key={project.id}
            project={project}
            index={index}
            language={language}
          />
        ))}
      </div>
    </section>
  );
}
