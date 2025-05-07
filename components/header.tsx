"use client";

import { useBoardStore } from "@/lib/store";


export const Header = () => {
  const activeBoardName = useBoardStore((state) => state.activeBoardName);

  return (
    <header className="h-[97px] border-b border-divider px-6 flex items-center bg-sidebar">
      <h2 className="text-xl font-bold">{activeBoardName}</h2>
    </header>
  );
};