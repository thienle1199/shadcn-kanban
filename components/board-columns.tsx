import { createClient } from "@/utils/supabase/server";
import BoardColumn from "./column";
import NewColumnDialog from "./new-column-dialog";

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
            *,
            sub_tasks (
              *
            )
          )
      )
      `
    )
    .eq("id", Number(boardId))
    .single();
  return (
    <div className="flex gap-6 p-6 justify-items-start flex-1">
      {board?.columns?.map(({ id, name, tasks }, idx) => (
        <BoardColumn index={idx} key={id} name={name} tasks={tasks} />
      ))}
      <div className="flex flex-col bg-lines justify-center rounded-md">
        <NewColumnDialog boardId={Number(boardId)} />
      </div>
    </div>
  );
};

export default BoardColumns;
