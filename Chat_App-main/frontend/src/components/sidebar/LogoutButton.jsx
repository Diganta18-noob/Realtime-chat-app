import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";
import Avatar from "../Avatar";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  const { authUser } = useAuthContext();
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    setShowModal(false);
    logout();
  };

  return (
    <>
      {!loading ? (
        <button
          className="btn btn-ghost btn-sm btn-circle text-error hover:bg-error/10 tooltip tooltip-top"
          data-tip="Logout"
          onClick={handleLogoutClick}
        >
          <BiLogOut className="w-5 h-5" />
        </button>
      ) : (
        <span className="loading loading-spinner loading-sm"></span>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <dialog open className="modal modal-bottom sm:modal-middle bg-black/60 backdrop-blur-sm z-50">
          <div className="modal-box border border-white/10 shadow-2xl bg-base-100/95 backdrop-blur-xl">
            <h3 className="font-bold text-lg mb-4 text-center">Confirm Logout</h3>
            
            <div className="flex flex-col items-center gap-4 py-4">
              <Avatar
                username={authUser?.username || authUser?.fullName}
                role={authUser?.role}
                profilePic={authUser?.profilePic}
                size={80}
              />
              
              <p className="text-center text-base-content/80">
                Are you sure you want to sign out, <br/>
                <span className="font-semibold text-base-content">{authUser?.fullName}</span>?
              </p>
            </div>

            <div className="modal-action flex justify-center gap-3 mt-6">
              <button 
                className="btn btn-ghost" 
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="btn btn-error shadow-error/30 shadow-lg" 
                onClick={confirmLogout}
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner"></span> : "Yes, Logout"}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowModal(false)} className="cursor-default">close</button>
          </form>
        </dialog>
      )}
    </>
  );
};

export default LogoutButton;
