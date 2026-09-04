import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.work': 'Projects',
    'nav.services': 'Skills',
    'nav.experience': 'Experience',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.available': 'Available for hire / 2026',
    'hero.title': 'UX/UI Designer & Full-Stack Engineer. Crafting systems with React, Express, Supabase & FastAPI.',
    'hero.subtitle': 'Monterrey Nuevo León México',
    'hero.design': 'DESIGN',
    'hero.repeat': 'FULLSTACK',
    'portfolio.title': 'Project Archive',
    'portfolio.subtitle': 'Selected Works 2024—2026',
    'portfolio.view': 'VIEW CASE',
    'services.title': 'Skill Stack',
    'services.subtitle': 'Bridging the gap between aesthetic precision and technical performance.',
    'services.ux.title': 'UX/UI DESIGN',
    'services.ux.desc': 'User-centric interfaces, design systems, and high-fidelity prototyping using Figma and Adobe Suite.',
    'services.frontend.title': 'FRONTEND DEV',
    'services.frontend.desc': 'Building scalable, performant web applications with React, TypeScript, and Tailwind CSS.',
    'services.backend.title': 'BACKEND & CLOUD',
    'services.backend.desc': 'Robust APIs and database management using Express, FastAPI, and Supabase / PostgreSQL.',
    'contact.collaboration': 'Collaboration',
    'contact.title': "WANT TO BUILD SOMETHING? LET'S TALK.",
    'contact.availability': 'Availability',
    'contact.availability.desc': 'OPEN FOR FULL-TIME ROLES & FREELANCE PROJECTS',
    'contact.network': 'Network',
    'contact.resume': 'Resume',
    'contact.resume.desc': 'Download CV (PDF)',
    'contact.copyright': '© 2026 ALV — DESIGN & CODE',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.form.success': 'Message Sent Successfully',
    'contact.form.close': 'Close',
    'project.design': 'Design Type',
    'project.tech': 'Tech Stack',
    'project.arch': 'Architecture',
    'project.github': 'GitHub Repository',
    'project.live': 'Live Demo',
    'project.back': 'Back to Archive',
    'experience.title': 'Exp.',
    'experience.subtitle': 'Professional Journey',
    'experience.current': 'Current',
    'experience.role1.title': 'UX/UI DESIGNER',
    'experience.role1.company': 'FOR IT CONSULTING',
    'experience.role1.location': 'HYBRID',
    'experience.role1.date': 'SEP-2025 - JUL-2026',
    'experience.role1.desc': 'I lead the end-to-end product design process, starting in Figma with user research, flow mapping, and interactive prototyping supported by scalable design systems. I bring these experiences to life by building responsive, interactive websites in Webflow with SEO-optimized CMS architectures, or by directly converting designs into clean, accessible code using HTML, CSS/Tailwind CSS, and JavaScript or React, while maintaining a smooth workflow through Git and GitHub.',
    'experience.role2.title': 'FULL STACK DEVELOPER',
    'experience.role2.company': 'ARMEND SOLUCIONES',
    'experience.role2.location': 'REMOTE',
    'experience.role2.date': 'FEB-2024 - AUG-2025',
    'experience.role2.desc': 'I developed dynamic, modular user interfaces with React and Vue.js to optimize overall performance and user experience. On the backend, I designed and implemented scalable RESTful APIs and microservices using Express.js and Python. I also managed SQL and NoSQL databases while setting up Docker containers to streamline deployments, ensuring software stability through clean code, unit testing, and rigorous code reviews.',
  },
  es: {
    'nav.work': 'Proyectos',
    'nav.services': 'Habilidades',
    'nav.experience': 'Experiencia',
    'nav.about': 'Sobre mí',
    'nav.contact': 'Contacto',
    'hero.available': 'Disponible para contratación / 2026',
    'hero.title': 'Diseñador UX/UI y Desarrollador Full-Stack. Creando sistemas con React, Express, Supabase y FastAPI.',
    'hero.subtitle': 'Monterrey Nuevo León México',
    'hero.design': 'DISEÑO',
    'hero.repeat': 'FULLSTACK',
    'portfolio.title': 'Archivo de Proyectos',
    'portfolio.subtitle': 'Trabajos Seleccionados 2024—2026',
    'portfolio.view': 'VER CASO',
    'services.title': 'Stack de Habilidades',
    'services.subtitle': 'Cerrando la brecha entre la precisión estética y el rendimiento técnico.',
    'services.ux.title': 'DISEÑO UX/UI',
    'services.ux.desc': 'Interfaces centradas en el usuario, sistemas de diseño y prototipado de alta fidelidad con Figma y Adobe Suite.',
    'services.frontend.title': 'DESARROLLO FRONTEND',
    'services.frontend.desc': 'Construcción de aplicaciones web escalables y eficientes con React, TypeScript y Tailwind CSS.',
    'services.backend.title': 'BACKEND Y NUBE',
    'services.backend.desc': 'APIs robustas y gestión de bases de datos con Express, FastAPI y Supabase / PostgreSQL.',
    'contact.collaboration': 'Colaboración',
    'contact.title': '¿QUIERES CONSTRUIR ALGO? HABLEMOS.',
    'contact.availability': 'Disponibilidad',
    'contact.availability.desc': 'ABIERTO A ROLES DE TIEMPO COMPLETO Y PROYECTOS FREELANCE',
    'contact.network': 'Redes',
    'contact.resume': 'Currículum',
    'contact.resume.desc': 'Descargar CV (PDF)',
    'contact.copyright': '© 2026 ALV — DISEÑO Y CÓDIGO',
    'contact.form.name': 'Nombre',
    'contact.form.email': 'Correo',
    'contact.form.message': 'Mensaje',
    'contact.form.send': 'Enviar Mensaje',
    'contact.form.success': 'Mensaje Enviado Correctamente',
    'contact.form.close': 'Cerrar',
    'project.design': 'Tipo de Diseño',
    'project.tech': 'Stack Tecnológico',
    'project.arch': 'Arquitectura',
    'project.github': 'Repositorio GitHub',
    'project.live': 'Demo en Vivo',
    'project.back': 'Volver al Archivo',
    'experience.title': 'Exp.',
    'experience.subtitle': 'Trayectoria Profesional',
    'experience.current': 'Actual',
    'experience.role1.title': 'UX/UI DESIGNER',
    'experience.role1.company': 'FOR IT CONSULTING',
    'experience.role1.location': 'HÍBRIDO',
    'experience.role1.date': 'SEP-2025 - JUL-2026',
    'experience.role1.desc': 'Lidero el proceso de diseño de producto de principio a fin, comenzando en Figma con investigación de usuarios, mapeo de flujos y prototipado interactivo respaldado por sistemas de diseño escalables. Doy vida a estas experiencias construyendo sitios web responsivos e interactivos en Webflow con arquitecturas CMS optimizadas para SEO, o convirtiendo directamente los diseños en código limpio y accesible utilizando HTML, CSS/Tailwind CSS y JavaScript o React, manteniendo un flujo de trabajo fluido mediante Git y GitHub.',
    'experience.role2.title': 'FULL STACK DEVELOPER',
    'experience.role2.company': 'ARMEND SOLUCIONES',
    'experience.role2.location': 'REMOTO',
    'experience.role2.date': 'FEB-2024 - AGO-2025',
    'experience.role2.desc': 'Desarrollé interfaces de usuario dinámicas y modulares con React y Vue.js para optimizar el rendimiento general y la experiencia del usuario. En el backend, diseñé e implementé APIs RESTful y microservicios escalables utilizando Express.js y Python. También gestioné bases de datos SQL y NoSQL mientras configuraba contenedores Docker para agilizar los despliegues, garantizando la estabilidad del software mediante código limpio, pruebas unitarias y revisiones rigurosas de código.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
