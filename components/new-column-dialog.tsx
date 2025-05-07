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
import { createColumn } from "@/app/actions/column";
import { useState } from "react";

interface NewColumnDialogProps {
  boardId: number;
  trigger?: React.ReactNode;
}

export default function NewColumnDialog({ boardId, trigger }: NewColumnDialogProps) {
  const [columnName, setColumnName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!columnName.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);

    try {
      setIsLoading(true);
      const { error } = await createColumn({
        name: columnName,
        boardId: boardId,
      });

      if (error) throw error;

      setOpen(false);
      setColumnName("");
    } catch (error) {
      console.error("Failed to create column:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameError(false);
    setColumnName(e.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" className="text-xl font-bold w-[280px] text-center">
            + Add New Column
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-8 bg-background">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-[18px] font-bold text-foreground-contrast">
              Add New Column
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="columnName" className="text-xs font-bold text-foreground-contrast">
                  Name
                </Label>
                {nameError && (
                  <span className="text-[13px] text-destructive">Cannot be empty</span>
                )}
              </div>
              <Input
                id="columnName"
                value={columnName}
                onChange={handleNameChange}
                placeholder="e.g. In Progress"
                className={`bg-background ${
                  nameError ? "border-destructive" : "border-[#828FA340]"
                }`}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-[13px] font-bold"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Column"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}