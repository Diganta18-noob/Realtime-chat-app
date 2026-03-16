import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import { HiOutlineUser, HiOutlineLockClosed, HiOutlineUserAdd } from "react-icons/hi";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto animate-fade-in-up">
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content/80 font-medium">Full Name</span>
            </label>
            <div className="relative">
              <HiOutlineUserAdd className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
              <input
                type="text"
                placeholder="Enter Full Name"
                className="input input-bordered input-primary w-full pl-10 bg-base-200/50 focus:bg-base-200"
                value={inputs.fullName}
                onChange={(e) =>
                  setInputs({ ...inputs, fullName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Username */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content/80 font-medium">Username</span>
            </label>
            <div className="relative">
              <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
              <input
                type="text"
                placeholder="Enter username"
                className="input input-bordered input-primary w-full pl-10 bg-base-200/50 focus:bg-base-200"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content/80 font-medium">Password</span>
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
              <input
                type="password"
                placeholder="Enter Password"
                className="input input-bordered input-primary w-full pl-10 bg-base-200/50 focus:bg-base-200"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content/80 font-medium">Confirm Password</span>
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-lg" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered input-primary w-full pl-10 bg-base-200/50 focus:bg-base-200"
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>

          {/* Gender */}
          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          {/* Submit */}
          <button
            className="btn btn-gradient w-full mt-2 text-base font-semibold"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="text-center mt-6">
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
