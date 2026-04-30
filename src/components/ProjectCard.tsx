import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  icon: ReactNode;
  period?: string;
  key?: any;
}

export default function ProjectCard({ title, description, tags, icon, period }: ProjectCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group border border-border p-8 h-full flex flex-col justify-between transition-colors hover:bg-white/5"
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="opacity-40 group-hover:opacity-100 transition-opacity">
            {icon}
          </div>
          {period && <span className="text-[10px] text-meta uppercase tracking-[0.2em]">{period}</span>}
        </div>
        <h3 className="text-2xl font-sans font-light mb-4 group-hover:underline underline-offset-4">
          {title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-8 max-w-sm">
          {description}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="text-[10px] text-meta uppercase tracking-[0.2em] border border-border px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
