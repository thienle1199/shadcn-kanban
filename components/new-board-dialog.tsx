"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

type Column = {
  id: string;
  name: string;
};

const defaultColumns: Column[] = [
  { id: '1', name: 'Todo' },
  { id: '2', name: 'Doing' },
];

export default function NewBoardDialog({children}: {children: React.ReactNode}) {
  const [columns, setColumns] = useState<Column[]>(defaultColumns);
  const [boardName, setBoardName] = useState('');

  const addNewColumn = () => {
    setColumns([...columns, { id: Date.now().toString(), name: '' }]);
  };

  const updateColumnName = (id: string, name: string) => {
    setColumns(columns.map(col => 
      col.id === id ? { ...col, name } : col
    ));
  };

  const removeColumn = (id: string) => {
    setColumns(columns.filter(col => col.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle board creation
    console.log({ boardName, columns });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-8 bg-background">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-[18px] font-bold">Add New Board</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="grid gap-2">
              <Label htmlFor="boardName" className="text-xs font-bold text-muted-foreground">
                Board Name
              </Label>
              <Input
                id="boardName"
                placeholder="e.g. Web Design"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                className="bg-background border-[#828FA340] placeholder:text-muted-foreground/25"
              />
            </div>
            <div className="grid gap-3">
              <Label className="text-xs font-bold text-muted-foreground">
                Board Columns
              </Label>
              <div className="grid gap-3">
                {columns.map((column) => (
                  <div key={column.id} className="flex gap-4">
                    <Input
                      value={column.name}
                      onChange={(e) => updateColumnName(column.id, e.target.value)}
                      className="bg-background border-[#828FA340]"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-muted-foreground hover:text-destructive px-0 hover:bg-transparent"
                      onClick={() => removeColumn(column.id)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  className="text-primary font-bold bg-primary/10 hover:bg-primary/20"
                  onClick={addNewColumn}
                >
                  + Add New Column
                </Button>
              </div>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-[13px] font-bold"
          >
            Create New Board
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
