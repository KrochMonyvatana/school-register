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
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Could not reach server. Check backend.");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* LOGIN BOX */}
      <div className="relative z-10 bg-white shadow-md rounded-xl p-8 w-full max-w-sm">

        <h1 className="text-2xl font-bold text-slate-800 mb-1 text-center">
          School Register
        </h1>

        <p className="text-sm text-slate-500 text-center mb-6">
          Sign in to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="1234"
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg"
          >
            Log In
          </button>

        </form>

        <p className="text-xs text-slate-400 text-center mt-6">
          admin / 1234
        </p>

      </div>
    </div>
  );
}