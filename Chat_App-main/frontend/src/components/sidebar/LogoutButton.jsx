import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center gap-3">
      <div className="avatar">
        <div className="w-9 rounded-full">
          <img src={authUser?.profilePic} alt="avatar" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-base-content truncate">
          {authUser?.fullName}
        </p>
      </div>
      {!loading ? (
        <button
          className="btn btn-ghost btn-sm btn-circle text-error hover:bg-error/10"
          onClick={logout}
        >
          <BiLogOut className="w-5 h-5" />
        </button>
      ) : (
        <span className="loading loading-spinner loading-sm"></span>
      )}
    </div>
  );
};
export default LogoutButton;
