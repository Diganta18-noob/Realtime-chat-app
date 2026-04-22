import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import useAvailabilityCheck from "../../hooks/useAvailabilityCheck";
import { User, Lock, UserPlus, Mail, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const StatusIndicator = ({ status }) => {
  if (status === "idle") return null;
  if (status === "checking") {
    return (
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <span className="loading loading-spinner loading-xs text-base-content/50"></span>
      </div>
    );
  }
  if (status === "available") {
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-3 top-1/2 -translate-y-1/2 text-success">
        <CheckCircle2 className="w-5 h-5" />
      </motion.div>
    );
  }
  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-3 top-1/2 -translate-y-1/2 text-error animate-pulse">
      <XCircle className="w-5 h-5" />
    </motion.div>
  );
};

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, signup } = useSignup();

  // Real-time duplicate check for username
  const { status: usernameStatus, message: usernameMessage } = useAvailabilityCheck(inputs.username, "/auth/check-username");

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  const isSubmitDisabled = 
    loading || 
    usernameStatus === "checking" || usernameStatus === "taken" || usernameStatus === "error";

  const itemAnim = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto my-6"
    >
      <div className="w-full p-8 sm:p-10 glass-card hover-glow">
        {/* Brand */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-extrabold gradient-text mb-3 tracking-tight"
          >
            Workspace
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-sm text-base-content/60 font-medium"
          >
            Create your account to connect your team.
          </motion.p>
        </div>

        <motion.form 
          initial="hidden" animate="show" transition={{ staggerChildren: 0.05, delayChildren: 0.3 }}
          onSubmit={handleSubmit} className="space-y-4"
        >
          {/* Full Name */}
          <motion.div variants={itemAnim} className="form-control">
            <label className="label py-1">
              <span className="label-text text-base-content/80 font-semibold tracking-wide text-xs uppercase">Full Name</span>
            </label>
            <div className="relative">
              <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 w-4 h-4" />
              <input
                type="text"
                placeholder="Enter Full Name"
                className="input input-sm h-10 input-bordered w-full pl-10 bg-base-300/40 focus:bg-base-300/80 border-none ring-1 ring-white/5 focus:ring-primary/50 transition-all text-base-content"
                value={inputs.fullName}
                onChange={(e) =>
                  setInputs({ ...inputs, fullName: e.target.value })
                }
              />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div variants={itemAnim} className="form-control">
            <label className="label py-1">
              <span className="label-text text-base-content/80 font-semibold tracking-wide text-xs uppercase">Email <span className="text-base-content/40 lowercase font-normal">(optional)</span></span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 w-4 h-4" />
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-sm h-10 input-bordered w-full pl-10 bg-base-300/40 focus:bg-base-300/80 border-none ring-1 ring-white/5 focus:ring-primary/50 transition-all text-base-content"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
              />
            </div>
          </motion.div>

          {/* Username */}
          <motion.div variants={itemAnim} className="form-control">
            <label className="label py-1">
              <span className="label-text text-base-content/80 font-semibold tracking-wide text-xs uppercase">Username</span>
            </label>
            <div className={`relative ${usernameStatus === "taken" ? "animate-[shake_0.5s_ease-in-out]" : ""}`}>
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 w-4 h-4" />
              <input
                type="text"
                placeholder="Enter username"
                className={`input input-sm h-10 input-bordered w-full pl-10 pr-10 border-none ring-1 ring-white/5 transition-all text-base-content ${
                  usernameStatus === "taken" ? "bg-error/10 ring-error/50 focus:ring-error focus:bg-error/20" : usernameStatus === "available" ? "bg-success/10 ring-success/50 focus:ring-success focus:bg-success/20" : "bg-base-300/40 focus:bg-base-300/80 focus:ring-primary/50"
                }`}
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
              <StatusIndicator status={usernameStatus} />
            </div>
            {usernameStatus !== "idle" && (
              <p className={`text-[11px] mt-1 font-medium transition-colors ${usernameStatus === "available" ? "text-success/80" : usernameStatus === "checking" ? "text-base-content/50" : "text-error/80"}`}>
                {usernameMessage}
              </p>
            )}
          </motion.div>

          {/* Password */}
          <motion.div variants={itemAnim} className="form-control">
            <label className="label py-1">
              <span className="label-text text-base-content/80 font-semibold tracking-wide text-xs uppercase">Password</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 w-4 h-4" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="input input-sm h-10 input-bordered w-full pl-10 pr-10 bg-base-300/40 focus:bg-base-300/80 border-none ring-1 ring-white/5 focus:ring-primary/50 transition-all text-base-content"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/80 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>

          {/* Confirm Password */}
          <motion.div variants={itemAnim} className="form-control">
            <label className="label py-1">
              <span className="label-text text-base-content/80 font-semibold tracking-wide text-xs uppercase">Confirm Password</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 w-4 h-4" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="input input-sm h-10 input-bordered w-full pl-10 pr-10 bg-base-300/40 focus:bg-base-300/80 border-none ring-1 ring-white/5 focus:ring-primary/50 transition-all text-base-content"
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/80 transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>

          {/* Gender */}
          <motion.div variants={itemAnim} className="pt-2">
            <GenderCheckbox
              onCheckboxChange={handleCheckboxChange}
              selectedGender={inputs.gender}
            />
          </motion.div>

          {/* Submit */}
          <motion.div variants={itemAnim}>
            <button
              className="btn btn-gradient w-full mt-2 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 border-0"
              disabled={isSubmitDisabled}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </motion.div>
        </motion.form>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-center mt-6 pt-4 border-t border-white/10">
          <Link
            to="/login"
            className="text-sm text-base-content/60 hover:text-base-content transition-colors font-medium"
          >
            Already have an account? <span className="text-primary hover:underline decoration-primary/50 underline-offset-4 ml-1">Sign In</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SignUp;
