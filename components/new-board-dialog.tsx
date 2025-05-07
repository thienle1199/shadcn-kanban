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
import { createBoard } from "@/app/actions/board";
import { useState } from "react";
import { useBoardStore } from "@/lib/store";
import { useRouter } from "next/navigation";

type Column = {
  id: string;
  name: string;
};

const defaultColumns: Column[] = [
  { id: "1", name: "Todo" },
  { id: "2", name: "Doing" },
];

export default function NewBoardDialog() {
  const [columns, setColumns] = useState<Column[]>(defaultColumns);
  const [boardName, setBoardName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const setActiveBoard = useBoardStore((state) => state.setActiveBoard);

  console.log('isLoading', isLoading)

  const addNewColumn = () => {
    setColumns([...columns, { id: Date.now().toString(), name: "" }]);
  };

  const updateColumnName = (id: string, name: string) => {
    setColumns(columns.map((col) => (col.id === id ? { ...col, name } : col)));
  };

  const removeColumn = (id: string) => {
    setColumns(columns.filter((col) => col.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!boardName) return;

    try {
      setIsLoading(true);
      const validColumns = columns.filter((col) => col.name.trim() !== "");
      const { board, error } = await createBoard({
        name: boardName,
        columns: validColumns,
      });

      if (error) throw error;
      if (board) {
        setActiveBoard(String(board.id), board.name);
        router.push(`/board/${board.id}`);
        setOpen(false);
        setBoardName("");
        setColumns(defaultColumns);
      }
    } catch (error) {
      console.error("Failed to create board:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="w-full text-primary hover:text-primary/85 flex items-center gap-4 py-3 px-6 rounded-r-full transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z"
              fill="currentColor"
            />
          </svg>
          <span className="font-bold">
            + Create New Board
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-8 bg-background">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-[18px] font-bold text-foreground-contrast">
              Add New Board
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="grid gap-2">
              <Label
                htmlFor="boardName"
                className="text-xs font-bold text-foreground-contrast"
              >
                Board Name
              </Label>
              <Input
                id="boardName"
                placeholder="e.g. Web Design"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                className="bg-background border-[#828FA340] placeholder:text-foreground-contrast/25"
              />
            </div>
            <div className="grid gap-3">
              <Label className="text-xs font-bold text-foreground-contrast">
                Board Columns
              </Label>
              <div className="grid gap-3">
                {columns.map((column) => (
                  <div key={column.id} className="flex gap-4">
                    <Input
                      value={column.name}
                      onChange={(e) =>
                        updateColumnName(column.id, e.target.value)
                      }
                      className="bg-background border-[#828FA340]"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-foreground-contrast hover:text-destructive px-0 hover:bg-transparent"
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
  );
}
