import { useState } from 'react';
import type { FormEvent } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="border border-border p-8 h-full flex items-center justify-center text-center">
        <div>
          <h3 className="text-2xl font-sans font-light mb-4">Message sent</h3>
          <p className="text-muted text-sm">Thank you for reaching out. I'll get back to you shortly.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-8 text-[10px] text-meta uppercase tracking-[0.2em] border-b border-meta hover:text-white hover:border-white transition-all pb-1"
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border p-8 md:p-12 h-full relative group">
      <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.2em]">INQUIRY</span>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between gap-8">
        <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              id="name"
              required
              className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-white transition-colors peer placeholder-transparent font-sans text-lg"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
            <label htmlFor="name" className="absolute left-0 top-4 text-meta text-[11px] uppercase tracking-[0.2em] transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:[font-size:9px] peer-[:not(:placeholder-shown)]:text-white pointer-events-none">Name</label>
          </div>
          <div className="relative">
            <input
              type="email"
              id="email"
              required
              className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-white transition-colors peer placeholder-transparent font-sans text-lg"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
            <label htmlFor="email" className="absolute left-0 top-4 text-meta text-[11px] uppercase tracking-[0.2em] transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:[font-size:9px] peer-[:not(:placeholder-shown)]:text-white pointer-events-none">Email Address</label>
          </div>
          <div className="relative pt-4">
            <textarea
              id="message"
              required
              rows={4}
              className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-white transition-colors peer placeholder-transparent font-sans text-lg resize-none"
              placeholder="Message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            ></textarea>
            <label htmlFor="message" className="absolute left-0 top-8 text-meta text-[11px] uppercase tracking-[0.2em] transition-all peer-focus:top-0 peer-focus:text-[9px] peer-focus:text-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:[font-size:9px] peer-[:not(:placeholder-shown)]:text-white pointer-events-none">Message</label>
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="group/btn self-start border border-border px-8 py-4 flex items-center gap-4 hover:bg-white hover:text-black transition-colors disabled:opacity-50"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">{status === 'submitting' ? 'Sending...' : 'Transmit'}</span>
          <div className="w-1.5 h-1.5 bg-white rounded-full group-hover/btn:bg-black group-hover/btn:scale-150 transition-all" />
        </button>
      </form>
    </div>
  );
}
