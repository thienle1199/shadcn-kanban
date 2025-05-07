import { createClient } from "@/utils/supabase/server"

type Props = {
  boardId: string
}

const BoardColumns = async ({boardId}: Props) => {
  const supabase = await createClient()
  const { data: board } = await supabase
    .from("boards")
    .select("*")
    .eq("id", Number(boardId))
    .single()
  return (
    <div>{board?.name}</div>
  )
}

export default BoardColumns