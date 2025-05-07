import { FC } from "react";
// import NewBoardDialog from "./new-board-dialog";
// import { Tables } from "@/utils/supabase/database.types";
import { createClient } from "@/utils/supabase/server";
import BoardItem from "./board-item";


interface BoardListProps {
  activeBoard?: string | number;
  // onBoardClick?: (id: string | number) => void;
  onCreateNew?: () => void;
}

export const BoardList: FC<BoardListProps> = async ({
  // onBoardClick,
  //   onCreateNew,
}) => {
  // const [activeBoard, setActiveBoard] = useState<number | null>(null);
  // const [boards, setBoards] = useState<Tables<"boards">[]>([]);
  const supabase  = await createClient();


  const {data: boards = [], count} = await supabase.from("boards").select("*");

  return (
    <div className="space-y-1">
      <h2 className="text-xs font-bold tracking-[.2em] px-6 mb-4">
        ALL BOARDS ({count})
      </h2>
      <div className="space-y-1">
        {boards?.map((board) => (
          <BoardItem
            key={board.id}
            name={board.name}
            id={board.id}
            // isActive={board.id === activeBoard}
            // onClick={() => onBoardClick?.(board.id)}
          />
        ))}

        {/* <NewBoardDialog>
          <BoardItem
            name="+ Create New Board"
            isCreateNew
            //   onClick={onCreateNew}
          />
        </NewBoardDialog> */}
      </div>
    </div>
  );
};
