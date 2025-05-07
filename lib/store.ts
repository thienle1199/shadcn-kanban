import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface Board {
  id: string
  name: string
}

interface BoardState {
  boards: Board[]
  activeBoard?: string
  activeBoardName?: string
  isSidebarVisible: boolean
  setBoards: (boards: Board[]) => void
  setActiveBoard: (boardId: string, boardName: string) => void
  toggleSidebar: () => void
}

export const useBoardStore = create<BoardState>()(
  devtools(
    (set) => ({
      boards: [],
      activeBoard: undefined,
      activeBoardName: undefined,
      isSidebarVisible: true,
      setBoards: (boards) => set({ boards }),
      setActiveBoard: (boardId, boardName) => 
        set({ activeBoard: boardId, activeBoardName: boardName }),
      toggleSidebar: () => set((state) => ({ isSidebarVisible: !state.isSidebarVisible })),
    }),
    {
      name: 'board-store',
    }
  )
)