import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { X, Check } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStatus('success');
    
    // Reset after success
    setTimeout(() => {
      setStatus('idle');
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[200] bg-white flex items-center justify-center p-6 overflow-y-auto"
        >
          <button 
            onClick={onClose}
            className="fixed top-32 right-8 p-2 hover:bg-black hover:text-white transition-colors cursor-pointer z-50"
          >
            <X size={32} />
          </button>

          <div className="w-full max-w-md py-12">
            {status === 'success' ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="flex flex-col items-center justify-center text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center mb-6"
                >
                  <motion.div
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Check size={40} strokeWidth={3} />
                  </motion.div>
                </motion.div>
                <motion.h3 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-2xl font-light font-serif uppercase tracking-tighter"
                >
                  {t('contact.form.success')}
                </motion.h3>
              </motion.div>
            ) : (
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl md:text-3xl font-light font-serif uppercase tracking-tighter mb-8 border-b-2 border-black pb-2">
                  {t('contact.collaboration')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="group">
                    <label className="text-[10px] font-light tracking-widest-xl uppercase block mb-1 opacity-50 group-focus-within:opacity-100 transition-opacity">
                      {t('contact.form.name')}
                    </label>
                    <input 
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent border-b border-black py-2 text-base font-light uppercase focus:outline-none focus:border-b-2 transition-all"
                      placeholder="JOHN DOE"
                    />
                  </div>

                  <div className="group">
                    <label className="text-[10px] font-light tracking-widest-xl uppercase block mb-1 opacity-50 group-focus-within:opacity-100 transition-opacity">
                      {t('contact.form.email')}
                    </label>
                    <input 
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-transparent border-b border-black py-2 text-base font-light uppercase focus:outline-none focus:border-b-2 transition-all"
                      placeholder="HELLO@EXAMPLE.COM"
                    />
                  </div>

                  <div className="group">
                    <label className="text-[10px] font-light tracking-widest-xl uppercase block mb-1 opacity-50 group-focus-within:opacity-100 transition-opacity">
                      {t('contact.form.message')}
                    </label>
                    <textarea 
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-transparent border-b border-black py-2 text-base font-light uppercase focus:outline-none focus:border-b-2 transition-all resize-none"
                      placeholder="TELL ME ABOUT YOUR PROJECT..."
                    />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={status === 'loading'}
                    type="submit"
                    className="w-full py-4 bg-black text-white font-light uppercase tracking-widest-xl hover:bg-white hover:text-black border-2 border-black transition-all disabled:opacity-50 flex items-center justify-center gap-4 cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" 
                      />
                    ) : (
                      t('contact.form.send')
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
