// "use client";
// import dynamic from 'next/dynamic'
import Image from "next/image";
import { BoardList } from "./board-list";
import { Suspense } from "react";
import ThemeSwitcher from "./theme-switcher";
// import {  useState } from 'react';
// import { Eye } from 'lucide-react';

// const ThemeSwitcher = dynamic(() => import('./theme-switcher').then((mod) => mod.default), { ssr: false });

export const Sidebar = () => {
  return (
    <aside className="w-[300px] border-r border-divider py-6 pr-6 flex flex-col bg-sidebar">
      <nav className="flex-1">
        <div className="flex gap-4 mb-8 pl-6">
          <Image src="/logo.svg" alt="Logo" width={25} height={25} priority />
          <h1 className="text-3xl text-black dark:text-white font-bold">
            kanban
          </h1>
        </div>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full">
              Loading...
            </div>
          }
        >
          <BoardList />
        </Suspense>
      </nav>
      <div className="space-y-4 pl-6">
        <Suspense>
        <ThemeSwitcher /> 
        </Suspense>

        {/* <button
          onClick={() => setIsVisible(false)}
          className="w-full flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
        >
          <EyeOff size={16} />
          <span className="font-bold text-sm">Hide Sidebar</span>
        </button>  */}
      </div>
    </aside>
  );
};
