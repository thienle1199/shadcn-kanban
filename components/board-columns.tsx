import { createClient } from "@/utils/supabase/server";
import BoardColumn from "./column";

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
    <div className="flex gap-6 p-6 justify-items-start">
      {board?.columns?.map(({ id, name, tasks }, idx) => (
        <BoardColumn index={idx}  key={id} name={name} tasks={tasks} />
      ))}
    </div>
  );
};

export default BoardColumns;
