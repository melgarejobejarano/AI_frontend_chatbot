import React from 'react';
import { Message } from '../types';
import SourcesLeaderboard from './SourcesLeaderboard';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-8 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`
          max-w-[90%] md:max-w-[80%] rounded-2xl p-6 shadow-lg backdrop-blur-sm border
          ${isUser 
            ? 'bg-gradient-to-br from-modern-primary/90 to-modern-primary/70 border-modern-primary/50 text-white rounded-br-sm' 
            : 'bg-modern-surface/80 border-modern-border text-modern-text rounded-bl-sm'
          }
        `}
      >
        <div className="flex items-center gap-2 mb-3 opacity-90 text-[10px] uppercase tracking-widest font-bold">
          {isUser ? (
            <>
              <span className="text-white/80">You</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
            </>
          ) : (
            <>
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-modern-secondary to-modern-accent flex items-center justify-center shadow-lg shadow-modern-secondary/30">
                 <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-modern-secondary to-modern-accent">AI Assistant</span>
            </>
          )}
        </div>
        
        {isUser ? (
          <div className={`prose prose-sm max-w-none leading-relaxed whitespace-pre-wrap ${isUser ? 'text-white/95' : 'text-gray-300'}`}>
            {message.content}
          </div>
        ) : (
          <div className={`prose prose-sm max-w-none leading-relaxed whitespace-pre-wrap prose-invert text-gray-300`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}

        {!isUser && message.sources && message.sources.length > 0 && (
          <SourcesLeaderboard sources={message.sources} />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;