import { cn } from "@/lib/utils";

type Props = {
    name: string;
    // id: string;
    className?: string;
    tasks?: {
        id: number;
        title: string;
        description: string | null;
    }[];
}

const BoardColumn = ({className, name, tasks}: Props) => {
  return (
    <div className={cn(className, 'flex flex-col p-4 mr-4')}>
        <h2 className="text-lg font-bold mb-4">{name}</h2>
        <div>
        {tasks?.map((task) => (
            <div key={task.id} className="p-4 min-w-[280px] bg-white rounded-md mb-2">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
            </div>
        ))}
        </div>
    </div>
  )
}

export default BoardColumn