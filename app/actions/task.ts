"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type CreateTaskInput = {
  title: string;
  description: string;
  columnId: number;
  subtasks: { title: string }[];
};

export async function createTask(data: CreateTaskInput) {
  const supabase = await createClient();

  try {
    // Insert the task
    const { data: task, error: taskError } = await supabase
      .from("tasks")
      .insert({
        title: data.title,
        description: data.description,
        column_id: data.columnId,
      })
      .select()
      .single();

    if (taskError) throw taskError;

    // Insert the subtasks
    if (data.subtasks.length > 0) {
      const subtasksToInsert = data.subtasks
        .filter(subtask => subtask.title.trim() !== "")
        .map(subtask => ({
          title: subtask.title,
          task_id: task.id,
          is_completed: false,
        }));

      if (subtasksToInsert.length > 0) {
        const { error: subtasksError } = await supabase
          .from("sub_tasks")
          .insert(subtasksToInsert);

        if (subtasksError) throw subtasksError;
      }
    }

    revalidatePath("/board/[boardId]", "page");
    return { task };
  } catch (error) {
    console.error("Error creating task:", error);
    return { error };
  }
}