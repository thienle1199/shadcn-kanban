import BoardColumns from "@/components/board-columns"
import { Suspense } from "react"

type Props = {
  params: Promise<{boardId: string}>
}

const BoardPage = async ({params}: Props) => {
  const {boardId} = await params
  
  return (
    <>
      <Suspense fallback="Loading...">
        <BoardColumns boardId={boardId} />
      </Suspense>
    </>
  )
}

export default BoardPage