"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type CreateBoardInput = {
  name: string;
  columns: { name: string }[];
};

export async function createBoard(data: CreateBoardInput) {
  const supabase = await createClient();

  try {
    // Insert the board
    const { data: board, error: boardError } = await supabase
      .from("boards")
      .insert({ name: data.name })
      .select()
      .single();

    if (boardError) throw boardError;

    // Insert the columns with positions
    if (data.columns.length > 0) {
      const columnsWithPosition = data.columns.map((col, index) => ({
        name: col.name,
        board_id: board.id,
        position: index,
        status: col.name.toLowerCase(),  // Using name as status
      }));

      const { error: columnsError } = await supabase
        .from("columns")
        .insert(columnsWithPosition);

      if (columnsError) throw columnsError;
    }

    revalidatePath("/");
    return { board };
  } catch (error) {
    console.error("Error creating board:", error);
    return { error };
  }
}