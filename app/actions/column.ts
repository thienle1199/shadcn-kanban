"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type CreateColumnInput = {
  name: string;
  boardId: number;
};

export async function createColumn(data: CreateColumnInput) {
  const supabase = await createClient();

  try {
    // Get the current max position
    const { data: columns } = await supabase
      .from("columns")
      .select("position")
      .eq("board_id", data.boardId)
      .order("position", { ascending: false })
      .limit(1);

    const nextPosition = (columns?.[0]?.position ?? -1) + 1;

    // Insert the column
    const { data: column, error } = await supabase
      .from("columns")
      .insert({
        name: data.name,
        board_id: data.boardId,
        position: nextPosition,
        status: data.name.toLowerCase(),
      })
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/board/[boardId]", "page");
    return { column };
  } catch (error) {
    console.error("Error creating column:", error);
    return { error };
  }
}