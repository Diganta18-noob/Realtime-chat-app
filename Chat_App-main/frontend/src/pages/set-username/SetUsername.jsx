import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const SetUsername = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [checking, setChecking] = useState(false);

  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  // Debounced check username logic
  const handleUsernameChange = async (e) => {
    const val = e.target.value;
    setUsername(val);

    if (val.length < 3) {
      setIsAvailable(null);
      return;
    }

    setChecking(true);
    try {
      const res = await axiosInstance.get(`/auth/check-username/${val}`);
      setIsAvailable(res.data.available);
    } catch (error) {
      setIsAvailable(false);
    } finally {
      setChecking(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAvailable) {
      toast.error("Please choose an available username.");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.put("/auth/set-username", { newUsername: username });
      
      // Update local context
      const updatedUser = { ...authUser, username: res.data.username, isUsernameSet: true };
      localStorage.setItem("chat-user", JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      
      toast.success("Username set successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to set username");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto"
    >
      <div className="w-full p-8 sm:p-10 glass-card hover-glow">
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-extrabold gradient-text mb-3 tracking-tight"
          >
            Welcome!
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-sm text-base-content/60 font-medium"
          >
            Almost there. Please choose a unique username<br/>
            for your workspace.
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="form-control">
            <label className="label">
              <span className="label-text text-base-content/80 font-semibold tracking-wide text-xs uppercase">Choose Username</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter unique username"
                className={`input input-bordered w-full pl-10 pr-10 bg-base-300/40 focus:bg-base-300/80 border-none ring-1 transition-all text-base-content ${
                  isAvailable === true 
                    ? "ring-success/50 focus:ring-success" 
                    : isAvailable === false && username.length >= 3
                    ? "ring-error/50 focus:ring-error"
                    : "ring-white/5 focus:ring-primary/50"
                }`}
                value={username}
                onChange={handleUsernameChange}
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {checking ? (
                  <span className="loading loading-spinner loading-sm text-primary"></span>
                ) : isAvailable === true ? (
                  <CheckCircle className="w-5 h-5 text-success" />
                ) : isAvailable === false && username.length >= 3 ? (
                  <AlertCircle className="w-5 h-5 text-error" />
                ) : null}
              </div>
            </div>
            {isAvailable === false && username.length >= 3 && (
              <span className="text-error text-xs mt-2 ml-1 font-medium">This username is already taken.</span>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <button
              className="btn btn-gradient w-full mt-4 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 border-0"
              disabled={loading || isAvailable !== true}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Complete Setup"
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default SetUsername;
