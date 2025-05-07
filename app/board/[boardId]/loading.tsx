const LoadingBoardPage = () => {
  // Create 3 columns for the loading state
  return (
    <div className="flex gap-6 p-6 justify-items-start">
      {[...Array(3)].map((_, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            {/* Column header skeleton */}
            <div className="w-[15px] h-[15px] rounded-full bg-muted animate-pulse" />
            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          </div>

          <div className="flex flex-col gap-5">
            {/* Task card skeletons - 3 per column */}
            {[...Array(3)].map((_, taskIndex) => (
              <div
                key={taskIndex}
                className="p-4 w-[280px] bg-white dark:bg-dark-grey rounded-lg mb-2 animate-pulse"
              >
                {/* Task title skeleton */}
                <div className="h-4 w-3/4 bg-foreground rounded mb-2" />
                {/* Task description skeleton */}
                <div className="h-3 w-1/2 bg-foreground rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingBoardPage;