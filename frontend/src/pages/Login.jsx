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
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')",
        }}
      />

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80"></div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">
          {/* TITLE */}
          <h1 className="text-3xl font-bold text-white text-center">
            Full-stack with Vatana
          </h1>

          <p className="text-center text-gray-300 text-sm mt-2 mb-8">
            Sign in to access your dashboard
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-200">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full mt-1 px-4 py-3 rounded-lg bg-white/90 focus:bg-white outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-200">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full mt-1 px-4 py-3 rounded-lg bg-white/90 focus:bg-white outline-none"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-400 text-red-200 text-sm px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition"
            >
              Log In
            </button>
          </form>

          {/* FOOTER HINT */}
          <p className="text-center text-gray-400 text-xs mt-6">
            Demo: admin / 1234
          </p>
        </div>
      </div>
    </div>
  );
}
