"use client";

const BoardListSkeleton = () => {
  return (
    <div className="space-y-1">
      <div className="h-4 w-24 bg-muted rounded animate-pulse mx-6 mb-4" />
      <div className="space-y-1">
        {/* Generate 3 board item skeletons */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="w-full flex items-center gap-4 py-3 px-6 rounded-r-full"
          >
            <div className="w-4 h-4 rounded bg-muted animate-pulse" />
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          </div>
        ))}
        
        {/* New Board Dialog button skeleton */}
        <div className="w-full flex items-center gap-4 py-3 px-6 rounded-r-full">
          <div className="w-4 h-4 rounded bg-muted/50 animate-pulse" />
          <div className="h-4 w-36 bg-muted/50 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default BoardListSkeleton;