import { useState } from "react";
import { Link } from "react-router-dom";
import useGetUsers from "../../hooks/useGetUsers";
import useToggleBan from "../../hooks/useToggleBan";
import useGetAuditLogs from "../../hooks/useGetAuditLogs";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const { users, setUsers, loading: loadingUsers } = useGetUsers();
  const { logs, page, totalPages, loading: loadingLogs, setPage } = useGetAuditLogs();
  const { toggleBan } = useToggleBan();

  const handleToggle = async (user) => {
    if (user.role === "admin") return;
    const res = await toggleBan(user._id);
    if (res) {
      setUsers(
        users.map((u) =>
          u._id === user._id ? { ...u, isBanned: !u.isBanned } : u
        )
      );
    }
  };

  return (
    <div className="w-full max-w-5xl glass-card border border-base-300 rounded-lg overflow-hidden flex flex-col h-[90vh]">
      {/* Header */}
      <div className="p-4 border-b border-base-300 flex justify-between items-center bg-base-100/50 backdrop-blur-md">
        <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
        <Link to="/" className="btn btn-sm btn-ghost">
          Back to Chat
        </Link>
      </div>

      {/* Tabs */}
      <div className="px-6 pt-4">
        <div role="tablist" className="tabs tabs-boxed bg-base-200/50 inline-flex">
          <button
            role="tab"
            className={`tab ${activeTab === "users" ? "tab-active bg-primary text-primary-content" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
          <button
            role="tab"
            className={`tab ${activeTab === "logs" ? "tab-active bg-primary text-primary-content" : ""}`}
            onClick={() => setActiveTab("logs")}
          >
            Audit Logs
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 overflow-y-auto">
        {activeTab === "users" && (
          loadingUsers ? (
            <div className="flex justify-center items-center h-full">
              <span className="loading loading-spinner text-primary loading-lg"></span>
            </div>
          ) : (
            <div className="overflow-x-auto bg-base-200/50 rounded-lg border border-base-300 shadow-xl">
              <table className="table table-zebra table-sm">
                <thead>
                  <tr className="text-gray-300">
                    <th>User</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Last Logout</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-base-100/50 transition-colors">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className={`avatar ${user.isOnline ? "online" : "offline"}`}>
                            <div className="w-10 rounded-full border border-base-300 shadow-sm">
                              <img src={user.profilePic} alt={user.fullName} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-gray-200">{user.fullName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-gray-400">@{user.username}</td>
                      <td>
                        <span
                          className={`badge badge-sm ${
                            user.role === "admin" ? "badge-primary text-primary-content" : "badge-ghost"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`text-xs font-semibold tracking-wide ${user.isOnline ? "text-green-400" : "text-gray-500"}`}>
                          {user.isOnline ? "Online" : "Offline"}
                        </span>
                      </td>
                      <td className="text-xs text-gray-400">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}
                      </td>
                      <td className="text-xs text-gray-400">
                        {user.lastLogout ? new Date(user.lastLogout).toLocaleString() : "Never"}
                      </td>
                      <td>
                        <div className="form-control w-fit">
                          <label className="label cursor-pointer gap-2">
                            <span className="label-text text-xs hidden sm:block">
                              {user.isBanned ? "Banned" : "Active"}
                            </span>
                            <input
                              type="checkbox"
                              className="toggle toggle-error toggle-sm"
                              checked={user.isBanned}
                              disabled={user.role === "admin"}
                              onChange={() => handleToggle(user)}
                            />
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && !loadingUsers && (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-gray-500">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )
        )}

        {activeTab === "logs" && (
          loadingLogs ? (
            <div className="flex justify-center items-center h-full">
              <span className="loading loading-spinner text-secondary loading-lg"></span>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-x-auto bg-base-200/50 rounded-lg border border-base-300 shadow-xl mb-4">
                <table className="table table-zebra table-sm">
                  <thead>
                    <tr className="text-gray-300">
                      <th>Timestamp</th>
                      <th>Action</th>
                      <th>Performed By</th>
                      <th>Target</th>
                      <th>IP / Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log._id} className="hover:bg-base-100/50 transition-colors">
                        <td className="text-gray-400 text-xs">
                          {new Date(log.createdAt).toLocaleString()}
                        </td>
                        <td>
                          <span
                            className={`badge badge-sm ${
                              log.action === "USER_BANNED" ? "badge-error" : 
                              log.action === "USER_UNBANNED" ? "badge-success" :
                              log.action === "ADMIN_LOGIN" ? "badge-warning" : "badge-info"
                            }`}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td>
                          {log.userId ? (
                            <div className="flex items-center gap-2">
                              <div className="avatar">
                                <div className="w-6 rounded-full inline-block">
                                  <img src={log.userId.profilePic} alt={log.userId.fullName} />
                                </div>
                              </div>
                              <span className="text-sm">{log.userId.username}</span>
                            </div>
                          ) : "System"}
                        </td>
                        <td>
                          {log.targetUserId ? (
                            <span className="text-sm text-gray-300">@{log.targetUserId.username}</span>
                          ) : "-"}
                        </td>
                        <td>
                          <div className="text-xs text-gray-400 font-mono">{log.ipAddress || "-"}</div>
                          {log.details && <div className="text-xs text-gray-500 mt-1">{log.details}</div>}
                        </td>
                      </tr>
                    ))}
                    {logs.length === 0 && !loadingLogs && (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-gray-500">
                          No audit logs found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination Controls */}
              <div className="flex justify-center">
                <div className="join gap-2">
                  <button 
                    className="join-item btn btn-sm" 
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    «
                  </button>
                  <button className="join-item btn btn-sm bg-base-200 no-animation">
                    Page {page} of {totalPages === 0 ? 1 : totalPages}
                  </button>
                  <button 
                    className="join-item btn btn-sm" 
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    »
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
