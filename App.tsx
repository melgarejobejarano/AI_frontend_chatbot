import React, { useState, useRef, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ChatMessage from './components/ChatMessage';
import Sidebar from './components/Sidebar';
import { Message, DocumentFile } from './types';
import { sendMessageToBackend } from './services/backendService';
import { MOCK_DOCS } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Combine mock docs with uploaded docs state
  const [documents, setDocuments] = useState<DocumentFile[]>([...MOCK_DOCS]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');

    // Add User Message
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    // Call Backend
    const result = await sendMessageToBackend(userText);

    // Add Bot Message
    const newBotMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      content: result.text,
      sources: result.sources,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newBotMsg]);
    setIsLoading(false);
  };

  // Mock Upload Handler
  const handleUpload = (fileList: FileList) => {
    const newFiles: DocumentFile[] = Array.from(fileList).map((file, index) => ({
      id: `up-${Date.now()}-${index}`,
      name: file.name,
      type: file.name.split('.').pop() as any || 'docx',
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      status: 'uploading'
    }));

    setDocuments(prev => [...prev, ...newFiles]);

    // Simulate upload and indexing process
    newFiles.forEach((file, idx) => {
      // Step 1: Uploading -> Processing
      setTimeout(() => {
        setDocuments(prev => prev.map(d => d.id === file.id ? { ...d, status: 'processing' } : d));
      }, 1500 + (idx * 500));

      // Step 2: Processing -> Ready
      setTimeout(() => {
        setDocuments(prev => prev.map(d => d.id === file.id ? { ...d, status: 'ready' } : d));
      }, 3500 + (idx * 500));
    });
  };

  return (
    <div className="flex min-h-screen bg-modern-bg text-modern-text font-sans">
      <Sidebar 
        documents={documents} 
        onUpload={handleUpload} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 flex flex-col h-screen relative bg-gradient-to-br from-modern-bg to-modern-bg/95">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-modern-border/50 bg-modern-surface/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-modern-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="font-bold font-heading text-lg tracking-tight">Chatbot Assistant</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg bg-modern-surfaceLight/50 text-modern-primary border border-modern-primary/20"
          >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-12 py-6 pb-40 scroll-smooth">
          <div className="max-w-4xl mx-auto">
            {/* Always show hero for context/brand, keeps it looking professional */}
            <HeroSection />

            {/* Chat History */}
            <div className="space-y-6">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              
              {/* Loading State - Modern Pulse */}
              {isLoading && (
                 <div className="flex w-full mb-8 justify-start animate-fade-in">
                   <div className="bg-modern-surface/80 border border-modern-border/50 text-modern-muted rounded-2xl rounded-bl-sm p-5 shadow-lg flex items-center gap-4">
                      <div className="relative w-8 h-8 flex items-center justify-center">
                         <div className="absolute inset-0 border-t-2 border-modern-primary rounded-full animate-spin"></div>
                         <div className="absolute inset-2 border-b-2 border-modern-secondary rounded-full animate-spin reverse"></div>
                      </div>
                      <span className="text-sm font-medium animate-pulse text-modern-text">Searching knowledge base...</span>
                   </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area (Floating Glass) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20 pointer-events-none">
          <div className="max-w-4xl mx-auto pointer-events-auto">
            <form onSubmit={handleSendMessage} className="relative group">
              {/* Glowing Background Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-modern-primary to-modern-secondary rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
              
              <div className="relative flex items-center bg-modern-surface border border-modern-border/50 rounded-xl shadow-2xl p-2 pl-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question about your documents..."
                  className="flex-1 bg-transparent text-white placeholder-modern-muted focus:outline-none py-3 px-2 text-sm md:text-base"
                  disabled={isLoading}
                />
                
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="ml-2 bg-gradient-to-r from-modern-primary to-modern-secondary text-white p-3 rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-modern-primary/20"
                >
                   {isLoading ? (
                     <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                   ) : (
                     <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                   )}
                </button>
              </div>
            </form>
            
            <div className="text-center mt-3">
              <p className="text-[10px] text-modern-muted opacity-60">
                Chatbot Assistant can make mistakes. Consider checking official documents.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
