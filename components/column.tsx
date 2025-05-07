import { cn } from "@/lib/utils";
import TaskCard from "./task-card";
import { Tables } from "@/utils/supabase/database.types";

type Props = {
    name: string;
    // id: string;
    className?: string;
    tasks?: (Tables<"tasks"> & {sub_tasks: Tables<"sub_tasks">[]})[];
    index?: number;
}


const colorsStatus = [
    "#49C4E5",
    "#8471F2",
    "#67E2AE",
    "#F6C343",
    "#FBAF85",
    "#F24C3D",
]

const BoardColumn = ({className, name, tasks, index}: Props) => {
  return (
    <div className={cn(className, 'flex flex-col gap-6 min-w-[280px]')}>
        <div className="flex items-center gap-3">
        <span className="w-[15px] h-[15px] rounded-full" style={{backgroundColor: colorsStatus[index || 0]}}></span>
        <h2 className="text-xs uppercase font-bold">{name} ({tasks?.length})</h2>
        </div>
        <div className="flex flex-col gap-5">
        {tasks?.map((task) => (
            <TaskCard 
                id={task.id}
                key={task.id}
                title={task.title}
                description={task.description}
                sub_tasks={task.sub_tasks}
            />
        ))}
        </div>
    </div>
  )
}

export default BoardColumn