import Image from "next/image";
import BoardList from "./board-list";
import { Suspense } from "react";
import ThemeSwitcher from "./theme-switcher";
import BoardListSkeleton from "./board-list-skeleton";
import { EyeOff } from "lucide-react";
import { Button } from "./ui/button";

const Sidebar = () => {

  return (
    <aside className="w-[300px] tablet:flex border-r border-divider py-6 pr-6 hidden flex-col bg-sidebar">
      <nav className="flex-1">
        <div className="flex gap-4 mb-8 pl-6">
          <Image src="/logo.svg" alt="Logo" width={25} height={25} priority />
          <h1 className="text-3xl text-black dark:text-white font-bold">
            kanban
          </h1>
        </div>
        <Suspense fallback={<BoardListSkeleton />}>
          <BoardList />
        </Suspense>
      </nav>
      <div className="space-y-4 pl-6">
        <Suspense>
          <ThemeSwitcher />
        </Suspense>
      </div>
      <Button variant="ghost" className="flex justify-start gap-2 mt-4">
        <EyeOff />
        Hide Sidebar
      </Button>
    </aside>
  );
};


export default Sidebar;