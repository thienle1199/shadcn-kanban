"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { updateSubtaskStatus, updateTaskStatus } from "@/app/actions/task";
import { useEffect, useState } from "react";
import { MoreVertical } from 'lucide-react';
import { Tables } from '@/utils/supabase/database.types';
import { Task } from "./task-card";

type TaskWithSubtasks = Task & {
  sub_tasks: Pick<Tables<"sub_tasks">, "id" | "is_completed" | "title">[];
};

type Props = {
  task: TaskWithSubtasks;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  columns?: Pick<Tables<"columns">, "id" | "name">[];
};


const TaskDetailDialog = ({ task, isOpen, onOpenChange, columns }: Props) => {
  const [taskDetails, setTaskDetails] = useState<TaskWithSubtasks>(task);
  const [currentColumnId, setCurrentColumnId] = useState<string | null>(task.column_id);

  useEffect(() => {
    setTaskDetails(task);
    setCurrentColumnId(task.column_id);
  }, [task]);

  const completedSubtasks = taskDetails.sub_tasks?.filter(st => st.is_completed)?.length ?? 0;
  const totalSubtasks = taskDetails.sub_tasks?.length ?? 0;

  const handleSubtaskToggle = async (subtaskId: number, isCompleted: boolean) => {
    await updateSubtaskStatus(subtaskId, isCompleted);
    const updatedSubtasks = taskDetails.sub_tasks.map(st => 
      st.id === subtaskId ? { ...st, is_completed: isCompleted } : st
    )
    setTaskDetails({ ...taskDetails, sub_tasks: updatedSubtasks });
  };

  const handleStatusChange = async (columnId: string) => {
    if (columnId === currentColumnId) return;
    await updateTaskStatus(taskDetails.id, columnId);
    setCurrentColumnId(columnId);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-8 bg-background">
        <DialogHeader className="flex flex-row items-start justify-between">
          <DialogTitle className="text-[18px] font-bold text-foreground-contrast pr-8">
            {taskDetails.title}
          </DialogTitle>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <MoreVertical size={16} />
          </button>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          {taskDetails.description && (
            <div>
              <p className="text-muted-foreground text-[13px] leading-6">
                {taskDetails.description}
              </p>
            </div>
          )}

          <div className="grid gap-4">
            <Label className="text-xs font-bold text-foreground-contrast">
              Subtasks ({completedSubtasks} of {totalSubtasks})
            </Label>
            <div className="grid gap-2">
              {taskDetails.sub_tasks?.sort((a, b) => {
                const dateA = a.id || 0;
                const dateB = b.id || 0;
                return dateA - dateB;
              })?.map((subtask) => (
                <div
                  key={subtask.id}
                  onClick={() => handleSubtaskToggle(subtask.id, !subtask.is_completed)}
                  className="flex items-center gap-4 p-3 bg-background hover:bg-primary/10 transition-colors rounded-[4px] cursor-pointer dark:bg-[#20212C]"
                >
                  <input
                    type="checkbox"
                    checked={!!subtask.is_completed}
                    className="h-4 w-4 rounded border-[#828FA340] text-primary focus:ring-primary"
                    onChange={() => {}}
                  />
                  <span
                    className={`text-xs ${
                      subtask.is_completed
                        ? "text-muted-foreground line-through opacity-50"
                        : "text-foreground-contrast"
                    }`}
                  >
                    {subtask.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status" className="text-xs font-bold text-foreground-contrast">
              Current Status
            </Label>
            <select
              id="status"
              className="h-[40px] w-full rounded-[4px] bg-background border border-[#828FA340] px-4 text-[13px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer"
              value={currentColumnId ?? ""}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              {columns?.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailDialog;