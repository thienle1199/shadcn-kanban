"use client";
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { BoardList } from './board-list';
import { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';

const ThemeSwitcher = dynamic(() => import('./theme-switcher').then((mod) => mod.default), { ssr: false });

// Sample data - in a real app this would come from your data source
const sampleBoards = [
  { id: '1', name: 'Platform Launch' },
  { id: '2', name: 'Marketing Plan' },
  { id: '3', name: 'Roadmap' },
];

export const Sidebar = () => {
  const [activeBoard, setActiveBoard] = useState(sampleBoards[0].id);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed left-0 bottom-8 bg-main-purple hover:bg-primary/90 text-white px-5 py-3 rounded-r-full transition-colors flex items-center gap-2"
      >
        <Eye size={16} />
      </button>
    );
  }


  return (
    <aside className="w-[300px] border-r border-border py-6 flex flex-col bg-sidebar">
      <nav className="flex-1">
        <div className='flex gap-4 mb-8 pl-6'>
          <Image 
            src="/logo.svg"
            alt="Logo"
            width={25}
            height={25}
            priority
          />
          <h1 className="text-3xl text-black dark:text-white font-bold">kanban</h1>
        </div>
        <BoardList 
          boards={sampleBoards}
          activeBoard={activeBoard}
          onBoardClick={setActiveBoard}
          onCreateNew={() => console.log('Create new board')}
        />
      </nav>
      <div className="space-y-4 px-6">
      <ThemeSwitcher />

        <button
          onClick={() => setIsVisible(false)}
          className="w-full flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
        >
          <EyeOff size={16} />
          <span className="font-bold text-sm">Hide Sidebar</span>
        </button>
      </div>
    </aside>
  );
};