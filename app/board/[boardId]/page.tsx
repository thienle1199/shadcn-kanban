import BoardColumns from "@/components/board-columns"

type Props = {
  params: Promise<{boardId: string}>
}

const BoardPage = async ({params}: Props) => {
  const {boardId} = await params
  
  return (
    <BoardColumns boardId={boardId} />
  )
}

export default BoardPage