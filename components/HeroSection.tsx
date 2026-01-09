import React from 'react';
import { APP_CONFIG } from '../constants';

const HeroSection: React.FC = () => {
  return (
    <div className="mb-10 animate-fade-in text-center pt-8 relative">
       {/* Top Logo (Replaced broken image with SVG) */}
       <div className="absolute top-0 left-0 md:-left-4 z-50 hidden md:block">
        <div className="bg-modern-surface/80 p-2.5 rounded-xl backdrop-blur-md border border-modern-border/50 shadow-lg">
          <svg className="w-8 h-8 text-modern-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      {/* Modern Hero Text */}
      <div className="relative z-10">
        <div className="inline-block px-4 py-1.5 mb-5 rounded-full border border-modern-primary/30 bg-modern-primary/10 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)]">
           <span className="text-xs font-bold tracking-[0.2em] uppercase text-modern-primary flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-modern-primary animate-pulse"></span>
             AI-Powered RAG System
           </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight text-white drop-shadow-2xl">
          Chatbot <span className="text-transparent bg-clip-text bg-gradient-to-r from-modern-primary via-modern-secondary to-modern-accent">Assistant</span>
        </h1>
        
        <p className="text-modern-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Access key information instantly. 
          <span className="hidden md:inline"> Ask questions and get accurate answers cited directly from your verified documents.</span>
        </p>
      </div>

      {/* Decorative Glow Behind */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-modern-secondary/10 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen"></div>

      {/* Info Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 max-w-3xl mx-auto">
        <div className="bg-modern-surface/40 border border-modern-border/40 p-4 rounded-xl backdrop-blur-sm text-left hover:border-modern-primary/30 hover:bg-modern-surface/60 transition-all duration-300 group">
           <div className="flex items-start gap-4">
              <div className="p-2.5 bg-modern-primary/10 rounded-lg text-modern-primary group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                 <h3 className="text-sm font-bold text-modern-text mb-1.5 group-hover:text-modern-primary transition-colors">Purpose</h3>
                 <p className="text-xs text-modern-muted leading-relaxed">
                   Support teams by providing instant access to specific knowledge within uploaded documents.
                 </p>
              </div>
           </div>
        </div>
        
        <div className="bg-modern-surface/40 border border-modern-border/40 p-4 rounded-xl backdrop-blur-sm text-left hover:border-modern-secondary/30 hover:bg-modern-surface/60 transition-all duration-300 group">
           <div className="flex items-start gap-4">
              <div className="p-2.5 bg-modern-secondary/10 rounded-lg text-modern-secondary group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                 <h3 className="text-sm font-bold text-modern-text mb-1.5 group-hover:text-modern-secondary transition-colors">Accuracy</h3>
                 <p className="text-xs text-modern-muted leading-relaxed">
                   AI-generated answers are grounded in your files. Sources are always cited for verification.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;