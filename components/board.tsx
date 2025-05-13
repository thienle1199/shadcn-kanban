"use client";
import { useEffect, useMemo, useState } from "react";

import { BoardColumn, BoardContainer } from "./column";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  useSensor,
  useSensors,
  KeyboardSensor,
  TouchSensor,
  MouseSensor,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { type Task } from "./task-card";
import type { Column } from "./column";
import { hasDraggableData } from "./utils";
import { coordinateGetter } from "./multipleContainersKeyboardPreset";
import dynamic from "next/dynamic";
import { updateTaskPositions } from "@/app/actions/task";
import { updateColumnPositions } from "@/app/actions/column";
const BoardDragOverlay = dynamic(() => import("./BoardDragOverlay"), { ssr: false });


type KanbanBoardProps = {
    initialTasks?: Task[];
    initialColumns?: Column[]
}

export function KanbanBoard({initialTasks = [], initialColumns = []}: KanbanBoardProps) {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  useEffect(() => {
    setColumns(initialColumns)
  }, [initialColumns])
  

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter,
    })
  );


  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <BoardColumn
              key={col.id}
              column={col}
              tasks={tasks.filter((task) => task.column_id === col.id)}
            />
          ))}
        </SortableContext>
      </BoardContainer>

      <BoardDragOverlay activeColumn={activeColumn} activeTask={activeTask} tasks={tasks} />
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;
    if (data?.type === "Column") {
      setActiveColumn(data.column);
      return;
    }

    if (data?.type === "Task") {
      setActiveTask(data.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over, collisions } = event;
    if (!over) return;

    console.log({active, over, collisions})

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;
    const overData = active.data.current;
    console.log('overData', overData)


    const targetIndex = overData?.sortable.items.findIndex((t: UniqueIdentifier) => t === overId);
    const prevItemId = overData?.sortable.items[targetIndex - 1]
    const nextItemId = overData?.sortable.items[targetIndex + 1]

    const prevItemPos = tasks.find(item => item.id === prevItemId)?.position || null;
    const nextItemPos = tasks.find(item => item.id === nextItemId)?.position || null;

    const newPosition = calculateNewPosition(prevItemPos, nextItemPos)

    console.log({newPosition})

    if (activeData?.type === "Task") {
      console.log("updating task")
      updateTaskPositions({
        column_id: overData?.sortable.containerId,
        position: newPosition,
        id: activeId as string,
      }).then(res => {
        console.log('res', res)
      });
    }
 
    if (activeId === overId) return;

    const isActiveAColumn = activeData?.type === "Column";
    console.log('activeData3', activeData)

    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });

    if (activeData.type === "Column") {
      const prevColumnPos = columns.find(item => item.id === prevItemId)?.position || null;
      const nextColumnPos = columns.find(item => item.id === nextItemId)?.position || null;
  
      const newColPosition = calculateNewPosition(prevColumnPos, nextColumnPos)
      console.log({newColPosition})
      updateColumnPositions({
        id: activeId as string,
        position: newColPosition
      }).then((res) => {
        console.log("res", res)
      })

    }

    console.log("updating column position")
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === "Task";
    const isOverATask = overData?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      console.log("Im dropping a Task over another Task")
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        const activeTask = tasks[activeIndex];
        const overTask = tasks[overIndex];
        if (
          activeTask &&
          overTask &&
          activeTask.column_id !== overTask.column_id
        ) {
          activeTask.column_id = overTask.column_id;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = overData?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      console.log("// Im dropping a Task over a column")
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const activeTask = tasks[activeIndex];
        if (activeTask) {
          activeTask.column_id = overId as string;
          return arrayMove(tasks, activeIndex, activeIndex);
        }
        return tasks;
      });
    }
  }
}


function calculateNewPosition(prevPosition: number | null, nextPosition: number | null): number {
  let result = 100
  if (prevPosition !== null && nextPosition !== null) {
    // Inserting between two items
    result = (prevPosition + nextPosition) / 2;
  } else if (prevPosition !== null && nextPosition === null) {
    // Inserting at the end
    result = prevPosition + 100;
  } else if (prevPosition === null && nextPosition !== null) {
    // Inserting at the start
    result = nextPosition - 100;
  }

  return result
}