import { createClient } from "@/utils/supabase/server";
import BoardColumn from "./column";
import { Button } from "./ui/button";

type Props = {
  boardId: string;
};

const BoardColumns = async ({ boardId }: Props) => {
  const supabase = await createClient();
  const { data: board } = await supabase
    .from("boards")
    .select(
      `
      id,
      name,
       columns (
         id,
         name,
         tasks (
            id,
            title,
            description
          )
      )
      `
    )
    .eq("id", Number(boardId))
    .single();
  return (
    <div className="flex gap-6 p-6 justify-items-start flex-1">
        {board?.columns?.map(({ id, name, tasks }, idx) => (
          <BoardColumn index={idx}  key={id} name={name} tasks={tasks} />
        ))}
      <div key="add-column" className="flex flex-col bg-lines justify-center rounded-md">
        <Button variant="ghost" className="text-xl font-bold w-[280px] text-center">+Add New Column</Button>
      </div>
    </div>
  );
};

export default BoardColumns;
