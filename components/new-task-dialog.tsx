"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTask } from "@/app/actions/task";
import { useState, useEffect, useCallback } from "react";
import { useBoardStore } from "@/lib/store";
import { createClient } from "@/utils/supabase/client";

type Subtask = {
  id: string;
  title: string;
};

type Column = {
  id: number;
  name: string;
};

export default function NewTaskDialog() {
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [columns, setColumns] = useState<Column[]>([]);
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);

  const activeBoard = useBoardStore(state => state.activeBoard);

  const fetchColumns = useCallback(async () => {
    if (!activeBoard) return;
    
    const supabase = createClient();
    const { data } = await supabase
      .from("columns")
      .select("id, name")
      .eq("board_id", Number(activeBoard))
      .order("position");

    if (data) {
      setColumns(data);
      setSelectedColumnId(data[0]?.id ?? null);
    }
  }, [activeBoard]);

  useEffect(() => {
    if (activeBoard) {
      fetchColumns();
    }
  }, [activeBoard, fetchColumns]);

  useEffect(() => {
    if (open) {
      fetchColumns();
    }
  }, [open, fetchColumns]);

  const addNewSubtask = () => {
    setSubtasks([...subtasks, { id: Date.now().toString(), title: "" }]);
  };

  const updateSubtaskTitle = (id: string, title: string) => {
    setSubtasks(subtasks.map((task) => (task.id === id ? { ...task, title } : task)));
  };

  const removeSubtask = (id: string) => {
    setSubtasks(subtasks.filter((task) => task.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim() || !selectedColumnId) {
      setTitleError(!taskTitle.trim());
      return;
    }
    setTitleError(false);

    try {
      setIsLoading(true);
      const { error } = await createTask({
        title: taskTitle,
        description: description,
        columnId: selectedColumnId,
        subtasks: subtasks.filter(st => st.title.trim() !== ""),
      });

      if (error) throw error;

      setOpen(false);
      setTaskTitle("");
      setDescription("");
      setSubtasks([]);
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTaskTitle(e.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={!activeBoard}>+ Add New Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-8 bg-background">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-[18px] font-bold text-foreground-contrast">
              Add New Task
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="taskTitle" className="text-xs font-bold text-foreground-contrast">
                  Title
                </Label>
                {titleError && (
                  <span className="text-[13px] text-destructive">Cannot be empty</span>
                )}
              </div>
              <Input
                id="taskTitle"
                placeholder="e.g. Make coffee"
                value={taskTitle}
                onChange={handleTitleChange}
                className={`bg-background ${
                  titleError ? "border-destructive" : "border-[#828FA340]"
                }`}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="text-xs font-bold text-foreground-contrast">
                Description
              </Label>
              <textarea
                id="description"
                placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[112px] w-full rounded-md bg-background border border-[#828FA340] p-3 text-[13px] placeholder:text-foreground-contrast/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>

            <div className="grid gap-3">
              <Label className="text-xs font-bold text-foreground-contrast">
                Subtasks
              </Label>
              <div className="grid gap-3">
                {subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex gap-4">
                    <Input
                      value={subtask.title}
                      onChange={(e) => updateSubtaskTitle(subtask.id, e.target.value)}
                      className="bg-background border-[#828FA340]"
                      placeholder="e.g. Make coffee"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-foreground-contrast hover:text-destructive px-0 hover:bg-transparent"
                      onClick={() => removeSubtask(subtask.id)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  className="text-primary font-bold bg-primary/10 hover:bg-primary/20"
                  onClick={addNewSubtask}
                >
                  + Add New Subtask
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status" className="text-xs font-bold text-foreground-contrast">
                Status
              </Label>
              <select
                id="status"
                className="h-[40px] w-full rounded-md bg-background border border-[#828FA340] px-3 text-[13px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                value={selectedColumnId ?? ""}
                onChange={(e) => setSelectedColumnId(Number(e.target.value))}
              >
                {columns.map(column => (
                  <option key={column.id} value={column.id}>
                    {column.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-[13px] font-bold"
            disabled={isLoading || !selectedColumnId}
          >
            {isLoading ? "Creating..." : "Create Task"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}