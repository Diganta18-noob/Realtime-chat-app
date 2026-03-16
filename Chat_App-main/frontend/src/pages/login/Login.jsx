import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { BiLogIn } from "react-icons/bi";
import { HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto animate-fade-in-up">
      <div className="w-full p-6 sm:p-8 glass-card">
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
            ChatApp
          </h1>
          <p className="text-sm text-base-content/60">
            Sign in to continue your conversations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                placeholder="Enter password"
                className="input input-bordered input-primary w-full pl-10 bg-base-200/50 focus:bg-base-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            className="btn btn-gradient w-full mt-2 text-base font-semibold"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <BiLogIn className="text-xl" /> Login
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/signup"
            className="text-sm text-secondary hover:text-accent transition-colors"
          >
            Don&apos;t have an account? <span className="font-semibold underline">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
