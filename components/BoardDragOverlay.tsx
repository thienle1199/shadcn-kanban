"use client";
import { createPortal } from "react-dom";
import { DragOverlay } from "@dnd-kit/core";
import { BoardColumn } from "./column";
import  TaskCard from "./task-card";
import type { Column } from "./column";
import type { Task } from "./task-card";
import { useEffect, useState } from "react";

interface BoardDragOverlayProps {
  activeColumn: Column | null;
  activeTask: Task | null;
  tasks: Task[];
}

export default function BoardDragOverlay({ activeColumn, activeTask, tasks }: BoardDragOverlayProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return createPortal(
    <DragOverlay>
      {activeColumn && (
        <BoardColumn
          isOverlay
          column={activeColumn}
          tasks={tasks.filter((task) => task.column_id === activeColumn.id)}
        />
      )}
      {activeTask && <TaskCard task={activeTask} isOverlay />}
    </DragOverlay>,
    document.body
  );
}
