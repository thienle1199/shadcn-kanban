"use client";

import React, { useState } from 'react'
import TaskDetailDialog from './task-detail-dialog';
import { Tables } from '@/utils/supabase/database.types';

type TaskWithSubtasks = Tables<"tasks"> & {
  sub_tasks: Tables<"sub_tasks">[];
  columns?: Tables<"columns">[];
};

type Props = TaskWithSubtasks;

const TaskCard = ({ title, id, sub_tasks, description, columns, column_id }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const subTaskCompleted = sub_tasks?.filter((task) => task.is_completed).length || 0;

  return (
    <>
      <div 
        onClick={() => setIsDialogOpen(true)}
        className="p-4 min-w-[280px] bg-white dark:bg-dark-grey rounded-lg mb-2 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <h3 className="text-foreground-contrast font-bold mb-2">{title}</h3>
        <p className='text-foreground text-xs'>
          {subTaskCompleted} of {sub_tasks?.length} Subtasks
        </p>
      </div>
      
      <TaskDetailDialog
        columns={columns}
        task={{ 
          id, 
          title, 
          description, 
          column_id, 
          sub_tasks,
        }}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};

export default TaskCard;