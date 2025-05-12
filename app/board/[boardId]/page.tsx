import BoardColumns from "@/components/board-columns"

type Props = {
  params: Promise<{boardId: string}>
}

const BoardPage = async ({params}: Props) => {
  const {boardId} = await params
  
  return (
    <div className="flex flex-1 overflow-hidden">
      <BoardColumns boardId={boardId} />
    </div>
  )
}

export default BoardPage