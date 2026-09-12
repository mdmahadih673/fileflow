import { FolderHeart, Settings, History, LayoutDashboard } from 'lucide-react';
import type { Page } from '../App';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const navItemClass = (page: Page) => `
    flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
    ${currentPage === page 
      ? 'bg-blue-500/10 text-blue-400' 
      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}
  `;

  return (
    <header className="h-14 border-b border-[#2d3748] bg-[#15181e] flex items-center justify-between px-4 select-none" style={{ WebkitAppRegion: 'drag' } as any}>
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
          <FolderHeart size={18} className="text-white" />
        </div>
        <div>
          <h1 className="font-semibold text-gray-100 text-sm leading-tight">FileFlow</h1>
          <p className="text-[10px] text-gray-400 font-medium">File Organizer</p>
        </div>
      </div>
      
      <nav className="flex items-center gap-1" style={{ WebkitAppRegion: 'no-drag' } as any}>
        <button className={navItemClass('dashboard')} onClick={() => onNavigate('dashboard')}>
          <LayoutDashboard size={16} />
          Dashboard
        </button>
        <button className={navItemClass('history')} onClick={() => onNavigate('history')}>
          <History size={16} />
          History
        </button>
        <button className={navItemClass('settings')} onClick={() => onNavigate('settings')}>
          <Settings size={16} />
          Settings
        </button>
      </nav>

      {/* Placeholder for custom window controls - would require more IPC setup, using standard for now or CSS trick */}
      <div className="w-[100px]" />
    </header>
  );
}
