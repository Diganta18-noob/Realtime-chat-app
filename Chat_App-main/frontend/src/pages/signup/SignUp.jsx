import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import useAvailabilityCheck from "../../hooks/useAvailabilityCheck";
import { HiOutlineUser, HiOutlineLockClosed, HiOutlineUserAdd, HiOutlineMail, HiEye, HiEyeOff, HiCheckCircle, HiXCircle } from "react-icons/hi";

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
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-success animate-fade-in-up">
        <HiCheckCircle className="text-lg" />
      </div>
    );
  }
  return (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-error animate-pulse">
      <HiXCircle className="text-lg" />
    </div>
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

  // Block submission if check is pending or failed
  const isSubmitDisabled = 
    loading || 
    usernameStatus === "checking" || usernameStatus === "taken" || usernameStatus === "error";

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto animate-fade-in-up my-4">
      <div className="w-full p-6 sm:p-8 glass-card">
        {/* Brand */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
            ChatApp
          </h1>
          <p className="text-sm text-base-content/60">
            Create your account to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Full Name */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-base-content/80 font-medium">Full Name</span>
            </label>
            <div className="relative">
              <HiOutlineUserAdd className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
              <input
                type="text"
                placeholder="Enter Full Name"
                className="input input-sm h-10 input-bordered input-primary w-full pl-10 bg-base-200/50 focus:bg-base-200"
                value={inputs.fullName}
                onChange={(e) =>
                  setInputs({ ...inputs, fullName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Email (Optional) */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-base-content/80 font-medium">Email <span className="text-base-content/40 font-normal">(optional, for password recovery)</span></span>
            </label>
            <div className="relative">
              <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-sm h-10 input-bordered input-primary w-full pl-10 bg-base-200/50 focus:bg-base-200"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Username */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-base-content/80 font-medium">Username</span>
            </label>
            <div className={`relative ${usernameStatus === "taken" ? "animate-[shake_0.5s_ease-in-out]" : ""}`}>
              <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
              <input
                type="text"
                placeholder="Enter username"
                className={`input input-sm h-10 input-bordered w-full pl-10 pr-10 bg-base-200/50 focus:bg-base-200 transition-colors ${
                  usernameStatus === "taken" ? "input-error" : usernameStatus === "available" ? "input-success" : "input-primary"
                }`}
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
              <StatusIndicator status={usernameStatus} />
            </div>
            {/* Username availability feedback */}
            {usernameStatus !== "idle" && (
              <p className={`text-[11px] mt-1 transition-colors ${usernameStatus === "available" ? "text-success/80" : usernameStatus === "checking" ? "text-base-content/50" : "text-error/80"}`}>
                {usernameMessage}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-base-content/80 font-medium">Password</span>
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="input input-sm h-10 input-bordered input-primary w-full pl-10 pr-10 bg-base-200/50 focus:bg-base-200"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/80 text-lg transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-base-content/80 font-medium">Confirm Password</span>
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="input input-sm h-10 input-bordered input-primary w-full pl-10 pr-10 bg-base-200/50 focus:bg-base-200"
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/80 text-lg transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>

          {/* Gender */}
          <div className="pt-2">
            <GenderCheckbox
              onCheckboxChange={handleCheckboxChange}
              selectedGender={inputs.gender}
            />
          </div>

          {/* Submit */}
          <button
            className="btn btn-gradient w-full mt-4 text-base font-semibold"
            disabled={isSubmitDisabled}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-sm text-secondary hover:text-accent transition-colors"
          >
            Already have an account? <span className="font-semibold underline">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
