import { createClient } from "@/utils/supabase/server";
import NewColumnDialog from "./new-column-dialog";
// import { BoardColumn } from "./column";
import { KanbanBoard } from "./board";

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
    .single()

    const {data: tasks} = await supabase.from("tasks").select(`
        *,
        sub_tasks (
        *)
      `)


    // const boardCollumns = (board?.columns?.map((column) => ({
    //   id: column.id,
    //   name: column.name,
    // })) ?? []) as Tables<"columns">[];

  return (
    <div className="flex overflow-auto flex-1 gap-6 p-6 justify-items-start">
      {/* {board?.columns?.map(({ id, name, tasks }) => (
        <BoardColumn key={id} column={{id: id, name: name}} tasks={tasks} />
      ))} */}
      <KanbanBoard initialColumns={board?.columns} initialTasks={tasks?.map(item => ({
        ...item,
        id: "task"+item.id
      })) || []} />
      <div className="flex flex-col bg-lines justify-center rounded-md">
        <NewColumnDialog boardId={Number(boardId)} />
      </div>
      
    </div>
  );
};

export default BoardColumns;
