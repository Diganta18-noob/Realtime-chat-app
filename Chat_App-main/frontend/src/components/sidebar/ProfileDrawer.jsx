import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import Avatar from "../Avatar";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Mail, User, Shield, Calendar, Loader2 } from "lucide-react";

const ProfileDrawer = ({ isOpen, onClose }) => {
  const { authUser, setAuthUser } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/users/profile");
      setProfile(res.data);
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageData = event.target.result;
      setUploading(true);
      try {
        const res = await axiosInstance.put("/users/profile/image", { imageData });
        const newPic = res.data.profilePic;
        
        // Update the auth context globally
        setAuthUser((prev) => ({ ...prev, profilePic: newPic }));
        setProfile((prev) => prev ? { ...prev, profilePic: newPic } : prev);
        toast.success("Profile picture updated!");
      } catch (error) {
        toast.error(error.response?.data?.error || "Failed to upload image");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 h-full w-full max-w-sm bg-base-100 z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-base-300">
              <h2 className="text-lg font-bold gradient-text">Profile</h2>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-sm btn-circle"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
              ) : profile ? (
                <div className="flex flex-col items-center gap-6">
                  {/* Avatar with upload overlay */}
                  <div className="relative group">
                    <div className="w-28 h-28 rounded-full ring-4 ring-primary/20 overflow-hidden">
                      <Avatar
                        username={profile.username}
                        role={profile.role}
                        profilePic={profile.profilePic}
                        size={112}
                      />
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      {uploading ? (
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                      ) : (
                        <Camera className="w-6 h-6 text-white" />
                      )}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                      className="hidden"
                      onChange={handleImageSelect}
                    />
                  </div>

                  {/* Name & Username */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-base-content">
                      {profile.fullName}
                    </h3>
                    <p className="text-sm text-base-content/50 mt-1">
                      @{profile.username}
                    </p>
                    {profile.role === "admin" && (
                      <span className="mt-2 inline-flex items-center gap-1 text-[10px] bg-primary/20 text-primary px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                        <Shield className="w-3 h-3" />
                        Admin
                      </span>
                    )}
                  </div>

                  {/* Info Cards */}
                  <div className="w-full space-y-3 mt-2">
                    <InfoRow
                      icon={<User className="w-4 h-4" />}
                      label="Full Name"
                      value={profile.fullName}
                    />
                    <InfoRow
                      icon={<Mail className="w-4 h-4" />}
                      label="Email"
                      value={profile.email || "Not set"}
                      badge={
                        profile.email
                          ? profile.isEmailVerified
                            ? { text: "Verified", color: "text-success bg-success/10" }
                            : { text: "Unverified", color: "text-warning bg-warning/10" }
                          : null
                      }
                    />
                    <InfoRow
                      icon={<Calendar className="w-4 h-4" />}
                      label="Joined"
                      value={formatDate(profile.createdAt)}
                    />
                  </div>

                  {/* Upload hint */}
                  <p className="text-xs text-base-content/30 text-center mt-4">
                    Hover over your avatar to change it.<br />
                    Max 2MB • PNG, JPG, GIF, WebP
                  </p>
                </div>
              ) : (
                <p className="text-center text-base-content/50">Failed to load profile.</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const InfoRow = ({ icon, label, value, badge }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-base-200/50 border border-base-300/50">
    <div className="text-primary/60">{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] uppercase tracking-wider font-semibold text-base-content/40">
        {label}
      </p>
      <p className="text-sm font-medium text-base-content truncate">{value}</p>
    </div>
    {badge && (
      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${badge.color}`}>
        {badge.text}
      </span>
    )}
  </div>
);

export default ProfileDrawer;
