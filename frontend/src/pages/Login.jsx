import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://school-register-5e82.onrender.com";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("loggedIn", "true");
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid login credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server not reachable. Try again later.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl"></div>
      </div>

      {/* Login Card – darker glass */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/60 shadow-2xl rounded-3xl p-8">
          <h1 className="text-3xl font-bold text-white text-center">
            Full-stack with Vatana
          </h1>

          <p className="text-center text-gray-400 text-sm mt-8 mb-6 flex items-center justify-center gap-2">
            Sign in here
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-300">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-800/80 focus:bg-gray-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition border border-gray-700"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-800/80 focus:bg-gray-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition border border-gray-700"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/40 text-red-200 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold transition shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-gray-500 text-xs mt-6">
            Demo: admin / 1234
          </p>
        </div>
      </div>
    </div>
  );
}
