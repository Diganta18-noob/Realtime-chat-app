import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";
import Conversations from "./Conversations";

const Sidebar = () => {
  return (
    <div className="bg-base-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-base-300">
        <h2 className="text-lg font-bold gradient-text mb-3">Chats</h2>
        <SearchInput />
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto py-2">
        <Conversations />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-base-300">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
