"use client";

import React, { useState } from 'react'
import TaskDetailDialog from './task-detail-dialog';

type Props = {
    title: string;
    description: string | null;
    id: number;
}

const TaskCard = ({ description, title, id }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsDialogOpen(true)}
        className="p-4 min-w-[280px] bg-white dark:bg-dark-grey rounded-lg mb-2 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <h3 className="text-foreground-contrast font-bold mb-2">{title}</h3>
        <p className="text-foreground text-xs">{description}</p>
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