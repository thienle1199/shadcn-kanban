import React from 'react'

type Props = {
    title: string;
    description: string | null;
}


const TaskCard = ({description,title}: Props) => {
  return (
    <div className="px-4 py-6 min-w-[280px] bg-white dark:bg-dark-grey rounded-md mb-2">
        <h3 className="text-foreground-contrast font-bold mb-2">{title}</h3>
        <p className="text-foreground text-xs">{description}</p>
    </div>
  )
}

export default TaskCard