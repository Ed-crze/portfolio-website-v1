import { motion } from 'motion/react';

interface ExperienceItemProps {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  key?: any;
}

export default function ExperienceItem({ role, company, period, location, highlights }: ExperienceItemProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-12 border-b border-border first:border-t">
      <div className="md:col-span-3">
        <span className="text-[10px] text-meta uppercase tracking-[0.2em] block mb-1">{period}</span>
        <div className="text-[10px] text-meta uppercase tracking-[0.2em]">{location}</div>
      </div>
      <div className="md:col-span-9">
        <div className="mb-6">
          <h3 className="text-3xl font-sans font-light mb-1 tracking-[-0.02em]">{role}</h3>
          <p className="text-xl text-muted">{company}</p>
        </div>
        <ul className="space-y-4">
          {highlights.map((highlight, index) => (
            <li key={index} className="text-sm leading-relaxed text-muted flex items-start">
              <span className="mr-3 mt-1.5 w-1 h-1 bg-fg rounded-full shrink-0" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
