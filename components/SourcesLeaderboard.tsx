import React from 'react';
import { Source } from '../types';

interface SourcesLeaderboardProps {
  sources: Source[];
}

const SourcesLeaderboard: React.FC<SourcesLeaderboardProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-6 bg-modern-bg/50 rounded-xl border border-modern-border overflow-hidden">
      <div className="bg-modern-surface px-4 py-2 border-b border-modern-border flex items-center gap-2">
        <svg className="w-4 h-4 text-modern-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        <h3 className="text-xs font-bold text-modern-text font-heading uppercase tracking-wide">TOP SOURCES</h3>
      </div>
      <table className="w-full text-left text-xs md:text-sm">
        <thead>
          <tr className="bg-modern-bg/80 text-modern-muted font-semibold border-b border-modern-border/50">
            <th className="px-4 py-2 w-2/3">Document Title</th>
            <th className="px-4 py-2 w-1/3 text-right">P&amp;R Hub reference</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-modern-border/30">
          {sources.map((source, idx) => (
            <tr key={idx} className="hover:bg-modern-primary/5 transition-colors group">
              <td className="px-4 py-3 text-modern-text/90 font-medium group-hover:text-modern-primary transition-colors">
                {source.title}
              </td>
              <td className="px-4 py-3 text-modern-muted text-right font-mono text-[10px] md:text-xs">
                {source.link.startsWith('http') ? (
                  <a
                    href={source.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-modern-primary hover:underline break-all"
                  >
                    {source.link}
                  </a>
                ) : (
                  source.link
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SourcesLeaderboard;