"use client";

import React, { useState } from 'react'
import TaskDetailDialog from './task-detail-dialog';
import { Tables } from '@/utils/supabase/database.types';

type Props = {
    title: string;
    description: string | null;
    id: number;
    sub_tasks?: Tables<"sub_tasks">[];
}

const TaskCard = ({ title, id, sub_tasks }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const subTaskCompleted = sub_tasks?.filter((task) => task.is_completed).length || 0;

  return (
    <>
      <div 
        onClick={() => setIsDialogOpen(true)}
        className="p-4 min-w-[280px] bg-white dark:bg-dark-grey rounded-lg mb-2 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <h3 className="text-foreground-contrast font-bold mb-2">{title}</h3>
        {/* <p className="text-foreground text-xs">{description}</p> */}
        <p className='text-foreground text-xs'>
          {subTaskCompleted} of {sub_tasks?.length} Subtasks
        </p>
      </div>
      
      <TaskDetailDialog 
        taskId={id} 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};

export default TaskCard;