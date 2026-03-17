import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useGetUsers from "../../hooks/useGetUsers";
import useToggleBan from "../../hooks/useToggleBan";
import useGetAuditLogs from "../../hooks/useGetAuditLogs";
import useGetDashboardStats from "../../hooks/useGetDashboardStats";
import { useAuthContext } from "../../context/AuthContext";

const StatCard = ({ icon, label, value, loading, color }) => (
  <div className="bg-base-200/50 rounded-lg border border-base-300 p-4 text-center flex-1 min-w-[120px]">
    {loading ? (
      <div className="flex flex-col items-center gap-2">
        <div className="skeleton w-10 h-10 rounded-full"></div>
        <div className="skeleton h-6 w-16"></div>
        <div className="skeleton h-4 w-20"></div>
      </div>
    ) : (
      <>
        <div className="text-3xl mb-1">{icon}</div>
        <div className={`text-2xl font-bold ${color || "gradient-text"}`}>{value}</div>
        <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{label}</div>
      </>
    )}
  </div>
);

const ACTION_TYPES = ["LOGIN", "LOGOUT", "ADMIN_LOGIN", "USER_BANNED", "USER_UNBANNED"];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const { users, setUsers, loading: loadingUsers } = useGetUsers();
  const { logs, page, totalPages, loading: loadingLogs, setPage, applyFilters } = useGetAuditLogs();
  const { toggleBan } = useToggleBan();
  const { stats, loading: loadingStats } = useGetDashboardStats();
  const { accessToken, refreshAccessToken } = useAuthContext();

  // Local filter state for the form
  const [localFilters, setLocalFilters] = useState({
    action: "",
    userId: "",
    startDate: "",
    endDate: "",
  });

  const handleApplyFilters = () => {
    applyFilters(localFilters);
  };

  const handleClearFilters = () => {
    const cleared = { action: "", userId: "", startDate: "", endDate: "" };
    setLocalFilters(cleared);
    applyFilters(cleared);
  };

  const handleExportCSV = async () => {
    try {
      const params = new URLSearchParams();
      if (localFilters.action) params.set("action", localFilters.action);
      if (localFilters.userId) params.set("userId", localFilters.userId);
      if (localFilters.startDate) params.set("startDate", localFilters.startDate);
      if (localFilters.endDate) params.set("endDate", localFilters.endDate);

      let token = accessToken;
      let res = await fetch(`/api/admin/audit-logs/export?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        token = await refreshAccessToken();
        if (!token) return;
        res = await fetch(`/api/admin/audit-logs/export?${params.toString()}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "audit_logs.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to export CSV");
    }
  };

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

      {/* Stats Bar */}
      <div className="px-6 pt-4 flex gap-3 flex-wrap">
        <StatCard icon="👥" label="Total Users" value={stats.totalUsers} loading={loadingStats} />
        <StatCard icon="🟢" label="Online Now" value={stats.onlineNow} loading={loadingStats} color="text-green-400" />
        <StatCard icon="💬" label="Messages Today" value={stats.messagesToday} loading={loadingStats} color="text-sky-400" />
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
          <div className="flex flex-col h-full">
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2 items-end mb-4 bg-base-200/30 rounded-lg border border-base-300 p-3">
              <div className="form-control">
                <label className="label py-0 pb-1"><span className="label-text text-xs">Action</span></label>
                <select
                  className="select select-bordered select-sm w-40"
                  value={localFilters.action}
                  onChange={(e) => setLocalFilters({ ...localFilters, action: e.target.value })}
                >
                  <option value="">All Actions</option>
                  {ACTION_TYPES.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label py-0 pb-1"><span className="label-text text-xs">From</span></label>
                <input
                  type="date"
                  className="input input-bordered input-sm w-36"
                  value={localFilters.startDate}
                  onChange={(e) => setLocalFilters({ ...localFilters, startDate: e.target.value })}
                />
              </div>
              <div className="form-control">
                <label className="label py-0 pb-1"><span className="label-text text-xs">To</span></label>
                <input
                  type="date"
                  className="input input-bordered input-sm w-36"
                  value={localFilters.endDate}
                  onChange={(e) => setLocalFilters({ ...localFilters, endDate: e.target.value })}
                />
              </div>
              <button className="btn btn-sm btn-primary" onClick={handleApplyFilters}>Apply</button>
              <button className="btn btn-sm btn-ghost" onClick={handleClearFilters}>Clear</button>
              <div className="flex-1"></div>
              <button className="btn btn-sm btn-outline" onClick={handleExportCSV}>📥 Export CSV</button>
            </div>

            {loadingLogs ? (
              <div className="flex justify-center items-center flex-1">
                <span className="loading loading-spinner text-secondary loading-lg"></span>
              </div>
            ) : (
            <>
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
            </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
