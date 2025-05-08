import { FC } from "react";
// import NewBoardDialog from "./new-board-dialog";
// import { Tables } from "@/utils/supabase/database.types";
import { createClient } from "@/utils/supabase/server";
import BoardItem from "./board-item";
import NewBoardDialog from "./new-board-dialog";


interface BoardListProps {
  activeBoard?: string | number;
  // onBoardClick?: (id: string | number) => void;
  onCreateNew?: () => void;
}

const BoardList: FC<BoardListProps> = async  ({
  // onBoardClick,
  //   onCreateNew,
}) => {
  // const [activeBoard, setActiveBoard] = useState<number | null>(null);
  const supabase  = await createClient();


  const {data: boards = []} = await supabase.from("boards").select("id, name").order("created_at", { ascending: false });

  return (
    <div className="space-y-1">
      <h2 className="text-xs font-bold tracking-[.2em] px-6 mb-4">
        ALL BOARDS ({boards?.length})
      </h2>
      <div className="space-y-1">
        {boards?.map((board) => (
          <BoardItem
            key={board.id}
            name={board.name}
            id={board.id}
          />
        ))}

        <NewBoardDialog />
      </div>
    </div>
  );
};


export default BoardList;