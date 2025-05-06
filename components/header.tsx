interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="h-[97px] border-b border-neutral-200 px-6 flex items-center">
      <h2 className="text-xl font-bold">{title}</h2>
    </header>
  );
};