import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { LogIn, User, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "../../api/axiosInstance";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, login } = useLogin();
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axiosInstance.post("/auth/google", {
        token: credentialResponse.credential,
      });
      localStorage.setItem("chat-user", JSON.stringify(res.data));
      setAuthUser(res.data);
      toast.success("Signed in with Google!");
      
      if (res.data.isUsernameSet === false) {
        navigate("/set-username");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Google sign-in failed");
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
        {/* Brand */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-extrabold gradient-text mb-3 tracking-tight"
          >
            Command
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-sm text-base-content/60 font-medium"
          >
            Professional communication, simplified.<br/>
            Sign in to access your workspace.
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="form-control">
            <label className="label">
              <span className="label-text text-base-content/80 font-semibold tracking-wide text-xs uppercase">Username</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter username"
                className="input input-bordered input-primary w-full pl-10 bg-base-300/40 focus:bg-base-300/80 border-none ring-1 ring-white/5 focus:ring-primary/50 transition-all text-base-content"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="form-control">
            <label className="label">
              <span className="label-text text-base-content/80 font-semibold tracking-wide text-xs uppercase">Password</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="input input-bordered input-primary w-full pl-10 pr-10 bg-base-300/40 focus:bg-base-300/80 border-none ring-1 ring-white/5 focus:ring-primary/50 transition-all text-base-content"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/80 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex justify-between items-center mt-3">
              <Link
                to="/reset-password-username"
                className="text-xs text-secondary hover:text-secondary-focus transition-colors font-medium opacity-70"
              >
                Force Reset
              </Link>
              <Link
                to="/forgot-password"
                className="text-xs text-primary hover:text-primary-focus transition-colors font-medium"
              >
                Forgot Password?
              </Link>
            </div>
          </motion.div>

          {/* Submit */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <button
              className="btn btn-gradient w-full mt-4 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 border-0"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" /> Sign In securely
                </>
              )}
            </button>
          </motion.div>
        </form>

        {/* Google OAuth Divider */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="flex items-center gap-3 mt-6">
          <div className="flex-1 border-t border-white/10"></div>
          <span className="text-xs text-base-content/40 font-medium uppercase tracking-wider">or</span>
          <div className="flex-1 border-t border-white/10"></div>
        </motion.div>

        {/* Google Login Button */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google sign-in failed")}
            theme="filled_black"
            size="large"
            width="100%"
            text="continue_with"
            shape="pill"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} className="text-center mt-8 pt-6 border-t border-white/10">
          <Link
            to="/signup"
            className="text-sm text-base-content/60 hover:text-base-content transition-colors font-medium"
          >
            Don&apos;t have an account? <span className="text-primary hover:underline decoration-primary/50 underline-offset-4 ml-1">Create workspace</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
