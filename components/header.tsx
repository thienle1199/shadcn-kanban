"use client";

import { useBoardStore } from "@/lib/store";
import NewTaskDialog from "./new-task-dialog";
import { Button } from "./ui/button";

export const Header = () => {
  const activeBoardName = useBoardStore((state) => state.activeBoardName);

  return (
    <header className="h-[97px] border-b border-divider px-6 flex items-center justify-between bg-sidebar">
      <h2 className="text-xl font-bold">{activeBoardName}</h2>
      <div className="flex items-center gap-4">
        <NewTaskDialog />
        <Button variant="ghost">⋮</Button>
      </div>
    </header>
  );
};