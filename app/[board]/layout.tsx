export default async function Layout({
    params,
  }: {
    params: Promise<{ board: string }>
  }) {
    const { board } = await params
    return (
        <div>
            {board}
        </div>
    )
  }