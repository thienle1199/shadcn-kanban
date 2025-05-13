"use server";

import { TablesUpdate } from "@/utils/supabase/database.types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type CreateTaskInput = {
  title: string;
  description: string;
  columnId: string;
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

export async function getTaskDetails(taskId: string) {
  const supabase = await createClient();

  try {
    const { data: task, error: taskError } = await supabase
      .from("tasks")
      .select(`
        *,
        column: columns (
          id,
          name
        ),
        sub_tasks (
          id,
          title,
          is_completed
        )
      `)
      .eq("id", taskId)
      .single();

    if (taskError) throw taskError;
    return { task };
  } catch (error) {
    console.error("Error fetching task:", error);
    return { error };
  }
}

export async function updateSubtaskStatus(subtaskId: number, isCompleted: boolean) {
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from("sub_tasks")
      .update({ is_completed: isCompleted })
      .eq("id", subtaskId);

    if (error) throw error;
    revalidatePath("/board/[boardId]", "page");
    return { success: true };
  } catch (error) {
    console.error("Error updating subtask:", error);
    return { error };
  }
}

export async function updateTaskStatus(taskId: string, columnId: string) {
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from("tasks")
      .update({ column_id: columnId })
      .eq("id", taskId);

    if (error) throw error;
    revalidatePath("/board/[boardId]", "page");
    return { success: true };
  } catch (error) {
    console.error("Error updating task status:", error);
    return { error };
  }
}

export async function updateTaskPositions(updates: TablesUpdate<"tasks"> & {id: string}) {
  const supabase = await createClient();
  
  try {
    const { error } = await supabase
      .from('tasks')
      .update(updates)
      .eq("id", updates.id)

    if (error) throw error;
    revalidatePath("/board/[boardId]");
    return { success: true };
  } catch (error) {
    console.error("Error updating task positions:", error);
    return { error };
  }
}