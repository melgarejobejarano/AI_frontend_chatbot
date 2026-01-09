import React, { useRef } from 'react';
import { DocumentFile } from '../types';

interface SidebarProps {
  documents: DocumentFile[];
  onUpload: (files: FileList) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ documents, onUpload, isOpen = false, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-80 flex-col h-screen bg-modern-surface border-r border-modern-border 
        transition-transform duration-300 ease-in-out lg:transform-none lg:flex
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-modern-border/50 flex justify-between items-center">
          <div>
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-modern-primary to-modern-secondary font-bold font-heading text-xl flex items-center gap-2">
              <svg className="w-6 h-6 text-modern-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              Knowledge Base
            </h2>
            <p className="text-xs text-modern-muted mt-2">Manage your context documents</p>
          </div>
          {/* Close Button (Mobile Only) */}
          <button onClick={onClose} className="lg:hidden text-modern-muted hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        {/* Upload Area */}
        <div className="p-4">
          <div 
            onClick={triggerUpload}
            className="border-2 border-dashed border-modern-border hover:border-modern-primary/50 bg-modern-bg/50 hover:bg-modern-bg rounded-xl p-6 text-center cursor-pointer transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-modern-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              multiple 
              accept=".pdf,.docx,.pptx"
            />
            <div className="w-12 h-12 mx-auto bg-modern-surfaceLight rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-modern-primary/20">
               <svg className="w-6 h-6 text-modern-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            </div>
            <p className="text-sm font-bold text-modern-text relative z-10">Upload Documents</p>
            <p className="text-[10px] text-modern-muted mt-1 relative z-10">PDF, DOCX, PPTX</p>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 py-2 flex justify-between items-center text-xs text-modern-muted uppercase tracking-wider font-semibold">
          <span>Files ({documents.length})</span>
          <span>Status</span>
        </div>

        {/* File List */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto custom-scrollbar">
          {documents.map((doc) => (
            <div key={doc.id} className="group flex items-center gap-3 p-3 rounded-lg bg-modern-surfaceLight/30 hover:bg-modern-surfaceLight/60 border border-transparent hover:border-modern-primary/20 transition-all cursor-default relative overflow-hidden">
              {/* Loading Bar Background for processing */}
              {doc.status !== 'ready' && (
                <div className="absolute bottom-0 left-0 h-0.5 bg-modern-primary animate-pulse w-full"></div>
              )}

              <div className={`p-2.5 rounded-lg shrink-0 ${
                doc.type === 'pdf' ? 'bg-red-500/10 text-red-400' : 
                doc.type === 'docx' ? 'bg-blue-500/10 text-blue-400' : 
                'bg-orange-500/10 text-orange-400'
              }`}>
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                 </svg>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-modern-text truncate" title={doc.name}>{doc.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-modern-muted bg-modern-bg px-1.5 py-0.5 rounded border border-modern-border/50">{doc.size}</span>
                  
                  {doc.status === 'ready' ? (
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 ml-auto">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span>
                       Ready
                    </span>
                  ) : (
                    <span className="text-[10px] text-modern-secondary font-semibold flex items-center gap-1 ml-auto">
                       <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                       {doc.status === 'uploading' ? 'Uploading' : 'Indexing'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer Info */}
        <div className="p-4 border-t border-modern-border/50 text-center">
           <p className="text-[10px] text-modern-muted/60">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;