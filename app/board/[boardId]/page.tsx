import BoardColumns from "@/components/board-columns"
import { Suspense } from "react"

type Props = {
  params: {
    boardId: string
  }
}

const BoardPage = async ({params: {boardId}}: Props) => {
  
  return (
    <div>
      <Suspense fallback="Loading...">
      <BoardColumns boardId={boardId} />
      </Suspense>
    </div>
  )
}

export default BoardPage