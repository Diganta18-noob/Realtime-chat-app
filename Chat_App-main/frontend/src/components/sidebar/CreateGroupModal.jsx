import { useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import useCreateGroup from "../../hooks/useCreateGroup";

const CreateGroupModal = ({ isOpen, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { conversations } = useGetConversations(); // Reusing the sidebar hook to get users
  const { createGroup, loading } = useCreateGroup();

  // Filter out existing groups so we only see individual users to add
  const availableUsers = conversations.filter((c) => !c.isGroup);

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createGroup(groupName, selectedUsers);
    if (success) {
      setGroupName("");
      setSelectedUsers([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#1A172B] border border-primary/20 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-slate-400 hover:text-white"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text mb-6">
          Create New Group
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="label p-0 mb-2">
              <span className="text-sm text-slate-300 font-medium">Group Name</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Weekend Plans"
              className="w-full input input-bordered bg-slate-800/50 text-slate-100 placeholder:text-slate-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label p-0 mb-2">
              <span className="text-sm text-slate-300 font-medium">Add Members ({selectedUsers.length})</span>
            </label>
            <div className="h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar border border-slate-700/50 rounded-lg p-2 bg-slate-800/30">
              {availableUsers.map((user) => (
                <label
                  key={user._id}
                  className="flex items-center gap-3 p-2 hover:bg-slate-700/30 rounded-lg cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary border-slate-600 border-2"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => handleCheckboxChange(user._id)}
                  />
                  <div className="avatar">
                    <div className="w-8 rounded-full ring-1 ring-primary/20">
                      <img src={user.profilePic || "/default-avatar.png"} alt={user.fullName} />
                    </div>
                  </div>
                  <span className="text-slate-200 text-sm font-medium">{user.fullName}</span>
                </label>
              ))}
              {availableUsers.length === 0 && (
                <div className="text-center text-slate-400 text-sm py-4">
                  No users available
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost hover:bg-slate-800 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary bg-gradient-to-r from-primary to-secondary border-none text-white shadow-lg shadow-primary/25 disabled:opacity-50"
              disabled={loading || !groupName.trim() || selectedUsers.length < 2}
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
