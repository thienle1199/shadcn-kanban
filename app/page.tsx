import { Button } from "@/components/button";

export default function Home() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-6">
          This board is empty. Create a new column to get started.
        </h3>
        <Button variant="primary">+ Add New Column</Button>
      </div>
    </div>
  );
}
