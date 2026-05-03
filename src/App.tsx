/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, ArrowDown } from 'lucide-react';
import { CV_DATA } from './constants';
import SectionHeader from './components/SectionHeader';
import ProjectCard from './components/ProjectCard';
import ExperienceItem from './components/ExperienceItem';
import BlogSection from './components/BlogSection';
import ContactForm from './components/ContactForm';
import AdminTools from './components/AdminTools';
import Loader from './components/Loader';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoading || menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoading, menuOpen]);

  return (
    <div className="min-h-screen selection:bg-fg selection:text-bg">
      <AnimatePresence>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <AdminTools />
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 py-8 flex justify-between items-center md:items-end pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-start gap-2 md:gap-0 md:block">
          <span className="hidden md:block text-[10px] text-meta uppercase tracking-[0.2em] md:mb-2">Identity / Digital</span>
          <a href="#" className="font-serif italic text-2xl text-white">ES. Studio&trade;</a>
        </div>
        
        <nav className="hidden md:flex pointer-events-auto items-center gap-10">
          <a href="#projects" className="text-[11px] uppercase tracking-[0.2em] text-meta border-b border-transparent hover:text-white hover:border-white transition-all">Archive</a>
          <a href="#experience" className="text-[11px] uppercase tracking-[0.2em] text-meta border-b border-transparent hover:text-white hover:border-white transition-all">Studio</a>
          <a href="#contact" className="text-[11px] uppercase tracking-[0.2em] text-meta border-b border-transparent hover:text-white hover:border-white transition-all">Contact</a>
        </nav>

        <button 
          className="md:hidden pointer-events-auto flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
           <div className={`w-6 h-[1px] bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
           <div className={`w-6 h-[1px] bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
           <div className={`w-6 h-[1px] bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg px-6 pt-24 pb-8 flex flex-col justify-start overflow-y-auto"
          >
            <nav className="flex flex-col gap-8 items-start mt-4">
              <a href="#projects" onClick={() => setMenuOpen(false)} className="text-4xl font-sans font-light tracking-[-0.02em] text-white">Archive</a>
              <a href="#experience" onClick={() => setMenuOpen(false)} className="text-4xl font-sans font-light tracking-[-0.02em] text-white">Studio</a>
              <a href="#blog" onClick={() => setMenuOpen(false)} className="text-4xl font-sans font-light tracking-[-0.02em] text-white">Journal</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="text-4xl font-sans font-light tracking-[-0.02em] text-white">Contact</a>
              <div className="w-full h-px bg-border my-4" />
              <div className="flex flex-col gap-4">
                <span className="text-[10px] text-meta uppercase tracking-[0.2em]">Contact details</span>
                <a href={`mailto:${CV_DATA.email}`} className="text-lg text-muted">{CV_DATA.email}</a>
                <a href={`tel:${CV_DATA.phone}`} className="text-lg text-muted">{CV_DATA.phone}</a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="px-6 pt-32 pb-24 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section id="hero" className="mb-48">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <div className="overflow-hidden mb-12">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[12vw] md:text-[9vw] font-sans font-light leading-[0.85] tracking-[-0.04em] text-balance"
                >
                  EDWIN <br />
                  <span className="font-serif italic text-muted">Safo</span>
                </motion.h1>
              </div>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl md:text-3xl max-w-2xl leading-relaxed font-light text-muted"
              >
                {CV_DATA.profile}
              </motion.p>
            </div>
            
            <div className="md:col-span-4 flex flex-col items-start md:items-end gap-6 h-full justify-between">
              <div className="hidden md:block w-px h-64 bg-border" />
              <div className="space-y-4 text-[10px] uppercase tracking-[0.2em] text-meta">
                <div className="flex items-center gap-3">
                  <MapPin className="w-3 h-3" />
                  <span>{CV_DATA.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-3 h-3" />
                  <span>{CV_DATA.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-3 h-3" />
                  <span>{CV_DATA.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work / Projects */}
        <section id="projects" className="mb-48">
          <SectionHeader number="01" title="Selected Projects">
            <motion.div 
              variants={containerVariants} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-10%" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-collapse"
            >
              {CV_DATA.projects.map((project, idx) => (
                <motion.div variants={itemVariants} key={idx} className="border-l border-t border-r md:border-r-0 last:border-r last:border-b md:last:border-b-0 border-border">
                  <ProjectCard 
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                    icon={project.icon}
                    period={project.period}
                  />
                </motion.div>
              ))}
              <motion.div variants={itemVariants} className="border border-border p-8 flex flex-col items-center justify-center text-center bg-white/5 text-white group cursor-pointer transition-colors duration-500 overflow-hidden relative hover:bg-white/10">
                <div className="relative z-10">
                  <p className="text-[10px] text-meta mb-4 uppercase tracking-[0.2em]">Interested?</p>
                  <h3 className="text-3xl font-sans font-light mb-6">Let's build together</h3>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowDown className="w-6 h-6 stroke-[1.5]" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </SectionHeader>
        </section>

        {/* Experience */}
        <section id="experience" className="mb-48">
          <SectionHeader number="02" title="Practical Experience">
            <motion.div 
              variants={containerVariants} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-10%" }}
              className="space-y-0"
            >
              {CV_DATA.experience.map((exp, idx) => (
                <motion.div variants={itemVariants} key={idx}>
                  <ExperienceItem 
                    role={exp.role}
                    company={exp.company}
                    period={exp.period}
                    location={exp.location}
                    highlights={exp.highlights}
                  />
                </motion.div>
              ))}
            </motion.div>
          </SectionHeader>
        </section>

        {/* Blog / Journal */}
        <section id="blog" className="mb-48">
          <BlogSection />
        </section>

        {/* Skills */}
        <section id="skills" className="mb-48">
          <SectionHeader number="04" title="Technical Arsenal">
            <motion.div 
              variants={containerVariants} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-10%" }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
            >
              {CV_DATA.skills.map((skill, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="flex flex-col gap-4"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-border group hover:bg-white hover:text-black transition-colors duration-300">
                    {skill.icon}
                  </div>
                  <span className="text-[10px] text-meta uppercase tracking-[0.2em] leading-tight">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </SectionHeader>
        </section>

        {/* Education */}
        <section id="education" className="mb-48">
          <SectionHeader number="05" title="Academic Background">
            <motion.div 
              variants={containerVariants} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-10%" }}
              className="space-y-8"
            >
              {CV_DATA.education.map((edu, idx) => (
                <motion.div variants={itemVariants} key={idx} className="flex flex-col md:flex-row justify-between items-baseline gap-4 border-b border-border pb-8">
                  <div>
                    <h3 className="text-3xl font-sans font-light mb-1">{edu.degree}</h3>
                    <p className="text-xl text-muted font-light">{edu.school}</p>
                  </div>
                  <span className="text-[10px] text-meta uppercase tracking-[0.2em]">{edu.period}</span>
                 </motion.div>
              ))}
            </motion.div>
          </SectionHeader>
        </section>

        {/* Contact */}
        <section id="contact" className="mb-24">
          <SectionHeader number="06" title="Get in touch">
            <motion.div 
              variants={containerVariants} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-10%" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
               <motion.div variants={itemVariants} className="flex flex-col justify-between">
                 <div>
                   <p className="text-muted text-lg leading-relaxed max-w-sm mb-12">
                     I'm currently available for new opportunities, freelance projects, or just a chat about technology.
                   </p>
                 </div>
                 <div className="space-y-4 text-[10px] uppercase tracking-[0.2em] text-meta">
                   <div className="flex items-center gap-3">
                     <Mail className="w-3 h-3" />
                     <span>{CV_DATA.email}</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <Phone className="w-3 h-3" />
                     <span>{CV_DATA.phone}</span>
                   </div>
                 </div>
               </motion.div>
               <motion.div variants={itemVariants}>
                  <ContactForm />
               </motion.div>
            </motion.div>
          </SectionHeader>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-24 border-t border-border mt-32 relative">
        <div className="hidden lg:block absolute right-12 top-12" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          <span className="text-[10px] uppercase tracking-[0.3em] text-meta">ESTABLISHED TWO THOUSAND TWENTY-FIVE</span>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div>
            <h2 className="text-7xl md:text-10xl font-sans font-light tracking-[-0.04em] mb-4 text-white leading-[0.85]">
              HELLO<br/>
              <span className="font-serif italic text-muted">There.</span>
            </h2>
            <div className="flex gap-8 text-[11px] uppercase tracking-[0.2em] text-meta mt-8">
              <a href={`mailto:${CV_DATA.email}`} className="hover:text-white transition-colors border-b border-transparent hover:border-white">Email</a>
              <a href={`tel:${CV_DATA.phone}`} className="hover:text-white transition-colors border-b border-transparent hover:border-white">Phone</a>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-meta uppercase tracking-[0.2em] block mb-2">Current Location</span>
            <p className="font-sans text-[14px] text-muted">Accra, GH &mdash; 5.6037&deg; N</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

