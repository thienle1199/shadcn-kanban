"use client";
import dynamic from 'next/dynamic'

const ThemeSwitcher = dynamic(() => import('./theme-switcher').then((mod) => mod.default), { ssr: false });
export const Sidebar = () => {
  return (
    <aside className="w-[300px] border-r border-neutral-200 p-6 flex flex-col">
      <nav className="flex-1">
        <h1 className="text-2xl font-bold mb-8">Kanban</h1>
        {/* Add navigation items here later */}
      </nav>
      <ThemeSwitcher />
    </aside>
  );
};