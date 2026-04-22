import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { HiOutlineShieldCheck, HiOutlineUserGroup } from "react-icons/hi";
import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";
import Conversations from "./Conversations";
import CreateGroupModal from "./CreateGroupModal";
import ProfileDrawer from "./ProfileDrawer";
import { useAuthContext } from "../../context/AuthContext";
import Avatar from "../Avatar";

const Sidebar = ({ unreadCounts = {} }) => {
  const { authUser } = useAuthContext();
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="bg-base-200 flex flex-col h-full relative">
      {/* Header */}
      <div className="p-4 border-b border-base-300">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold gradient-text">Chats</h2>
          <button 
            onClick={() => setIsGroupModalOpen(true)}
            className="btn btn-sm btn-ghost btn-circle text-primary hover:bg-primary/20"
            title="Create Group"
          >
            <HiOutlineUserGroup className="text-xl" />
          </button>
        </div>
        <SearchInput onSearch={handleSearch} />
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto py-2">
        <Conversations searchQuery={searchQuery} unreadCounts={unreadCounts} />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-base-300 flex justify-between items-center bg-base-100/30">
        <div className="flex items-center gap-2">
          <LogoutButton />
          <button
            onClick={() => setIsProfileOpen(true)}
            className="btn btn-ghost btn-sm btn-circle hover:bg-primary/10 transition-colors"
            title="My Profile"
          >
            <Avatar
              username={authUser?.username}
              role={authUser?.role}
              profilePic={authUser?.profilePic}
              size={28}
            />
          </button>
        </div>
        {authUser?.role === "admin" && (
          <Link to="/admin" className="btn btn-sm btn-ghost text-primary hover:text-primary-focus" title="Admin Dashboard">
            <HiOutlineShieldCheck className="text-xl" />
          </Link>
        )}
      </div>

      {/* Modals */}
      <CreateGroupModal 
        isOpen={isGroupModalOpen} 
        onClose={() => setIsGroupModalOpen(false)} 
      />

      {/* Profile Drawer */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
};

export default Sidebar;
