"use client";
import dynamic from 'next/dynamic'
import Image from 'next/image'


const ThemeSwitcher = dynamic(() => import('./theme-switcher').then((mod) => mod.default), { ssr: false });
export const Sidebar = () => {
  return (
    <aside className="w-[300px] border-r border-border p-6 flex flex-col bg-sidebar">
      <nav className="flex-1">
        <div className='flex gap-4'>
        <Image 
          src="/logo.svg"
          alt="Logo"
          width={25}
          height={25}
          className="mb-8"
          priority
          />
        <h1 className="text-3xl text-black dark:text-white font-bold mb-8">kanban</h1>
          </div>
        {/* Add navigation items here later */}
      </nav>
      <ThemeSwitcher />
    </aside>
  );
};