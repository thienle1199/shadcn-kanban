import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { Badge } from "./ui/badge";
import { Tables } from "@/utils/supabase/database.types";
import dynamic from "next/dynamic";
import TaskDetailDialog from "./task-detail-dialog";
import { useState } from "react";

const Button = dynamic(() => import("./ui/button").then((mod) => mod.Button), { ssr: false });

export type Task = Pick<Tables<"tasks">, "title" | "description" | "column_id" | "id" | "position"> & {
  sub_tasks: Pick<Tables<"sub_tasks">, "id" | "is_completed" | "title">[];
}

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
  columns?: Pick<Tables<"columns">, "id" | "name">[]
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export default function TaskCard({ task, isOverlay, columns = [] }: TaskCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("p-4 min-w-[280px] bg-white dark:bg-dark-grey rounded-lg mb-2 cursor-pointer hover:opacity-80 transition-opacity", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
    <>
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
      onClick={()=>setIsDialogOpen(true)}
    >
      <CardHeader className="px-3 py-3 space-between flex flex-row border-b-2 border-secondary relative">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab"
        >
          <span className="sr-only">Move task</span>
          <GripVertical />
        </Button>
        <CardTitle>
          {task.title}
        </CardTitle>
        <Badge variant={"outline"} className="ml-auto font-semibold">
          Task
        </Badge>

      </CardHeader>
      <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
        {task.description} - {task.position}
      </CardContent>
    </Card>
    <TaskDetailDialog
    columns={columns}
    task={task}
    isOpen={isDialogOpen}
    onOpenChange={setIsDialogOpen}
  />
  </>
  );
}
