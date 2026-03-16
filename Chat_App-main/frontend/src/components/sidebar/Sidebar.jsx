import { Link } from "react-router-dom";
import { HiOutlineShieldCheck } from "react-icons/hi";
import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";
import Conversations from "./Conversations";
import { useAuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { authUser } = useAuthContext();
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
      <div className="p-4 border-t border-base-300 flex justify-between items-center bg-base-100/30">
        <LogoutButton />
        {authUser?.role === "admin" && (
          <Link to="/admin" className="btn btn-sm btn-ghost text-primary hover:text-primary-focus">
            <HiOutlineShieldCheck className="text-xl" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
