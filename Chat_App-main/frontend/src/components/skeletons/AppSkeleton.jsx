const AppSkeleton = () => {
  return (
    <div className="flex w-full h-[100dvh] sm:h-[85vh] sm:max-w-5xl sm:mx-auto overflow-hidden glass-card sm:my-4 animate-pulse">
      
      {/* Sidebar Skeleton */}
      <div className="hidden md:flex w-full md:w-80 flex-shrink-0 flex-col border-r border-base-300/30 p-4">
        {/* Search Bar Skeleton */}
        <div className="skeleton h-10 w-full rounded-full mb-6 bg-base-300"></div>
        
        {/* Conversations List Skeletons */}
        <div className="flex flex-col gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className="skeleton w-11 h-11 rounded-full shrink-0 bg-base-300"></div>
              <div className="flex flex-col flex-1 gap-2">
                <div className="skeleton h-4 w-3/4 bg-base-300"></div>
                <div className="skeleton h-3 w-1/2 bg-base-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header Skeleton */}
        <div className="h-16 w-full bg-base-200/50 flex items-center px-4 border-b border-base-300/30">
          <div className="skeleton h-5 w-48 bg-base-300"></div>
        </div>

        {/* Message Area Skeleton */}
        <div className="flex-1 p-6 flex flex-col gap-6 justify-end">
          <div className="flex gap-3 items-center">
            <div className="skeleton w-10 h-10 rounded-full shrink-0 bg-base-300"></div>
            <div className="skeleton h-12 w-64 rounded-2xl bg-base-300"></div>
          </div>
          <div className="flex gap-3 items-center justify-end">
            <div className="skeleton h-12 w-48 rounded-2xl bg-primary/20"></div>
            <div className="skeleton w-10 h-10 rounded-full shrink-0 bg-primary/30"></div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="skeleton w-10 h-10 rounded-full shrink-0 bg-base-300"></div>
            <div className="skeleton h-12 w-56 rounded-2xl bg-base-300"></div>
          </div>
        </div>

        {/* Message Input Skeleton */}
        <div className="h-16 w-full p-4 border-t border-base-300/30">
          <div className="skeleton h-full w-full rounded-full bg-base-300"></div>
        </div>
      </div>

    </div>
  );
};

export default AppSkeleton;
