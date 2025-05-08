"use client";
import Image from "next/image";
import { ReactNode, Suspense, useEffect } from "react";
import ThemeSwitcher from "./theme-switcher";
import { EyeIcon, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { useBoardStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const Sidebar = ({ children }: { children: ReactNode }) => {
  const isSidebarVisible = useBoardStore((state) => state.isSidebarVisible);
  const setSidebarVisible = useBoardStore((state) => state.toggleSidebar);

  useEffect(() => {
    const container = document.querySelector('[data-sidebar-container]');
    if (container) {
      container.setAttribute('data-sidebar-hidden', (!isSidebarVisible).toString());
    }
  }, [isSidebarVisible]);

  return (
    <>
      <aside
        className={cn(
          "fixed top-0 left-0 hidden h-full z-40 w-[300px] border-r overflow-hidden border-divider py-6 pr-6 mobile:flex flex-col bg-sidebar",
          {
            "translate-x-0": isSidebarVisible,
            "-translate-x-full": !isSidebarVisible,
            "transition-transform duration-300 ease-in-out": true,
          }
        )}
      >
        <nav className="flex-1">
          <div className="flex gap-4 mb-8 pl-6">
            <Image src="/logo.svg" alt="Logo" width={25} height={25} priority />
            <h1 className="text-3xl text-black dark:text-white font-bold">
              kanban
            </h1>
          </div>
          {children}
        </nav>

        <div className="space-y-4 pl-6">
          <Suspense>
            <ThemeSwitcher />
          </Suspense>
        </div>
        <Button
          onClick={setSidebarVisible}
          variant="ghost"
          className="flex justify-start gap-2 mt-4"
          >
          <EyeOff />
          Hide Sidebar
        </Button>

      </aside>
      {!isSidebarVisible && (
        <Button
          className="bg-primary fixed bottom-6 left-0 z-40"
          onClick={setSidebarVisible}
        >
          <EyeIcon />
        </Button>
      )}
    </>
  );
};

export default Sidebar;
