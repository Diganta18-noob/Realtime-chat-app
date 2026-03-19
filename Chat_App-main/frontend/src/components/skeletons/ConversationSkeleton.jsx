const ConversationSkeleton = () => {
  return (
    <>
      <div className="flex gap-3 items-center px-3 py-2.5 mx-2 my-1 animate-pulse">
        {/* Avatar Skeleton */}
        <div className="skeleton w-11 h-11 rounded-full shrink-0 bg-base-300"></div>

        <div className="flex flex-col flex-1 gap-2">
          {/* Name Outline */}
          <div className="skeleton h-4 w-32 bg-base-300"></div>
          {/* Status Outline */}
          <div className="skeleton h-3 w-16 bg-base-300"></div>
        </div>
      </div>
      <div className="border-b border-base-300/30 mx-4 my-0.5" />
    </>
  );
};

export default ConversationSkeleton;
