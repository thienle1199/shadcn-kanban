interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="h-[97px] border-b border-border px-6 flex items-center bg-sidebar">
      <h2 className="text-xl font-bold">{title}</h2>
    </header>
  );
};