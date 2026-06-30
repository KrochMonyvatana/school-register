import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const BASE_URL = "http://localhost:5001";

export default function StudentForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          age: Number(age),
          class: studentClass,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add student");
      }

      setSuccess("Student added successfully!");
      setName("");
      setAge("");
      setStudentClass("");

      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      console.error(err);
      setError(err.message);
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

      {/* Form Card – darker glass */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/60 shadow-2xl rounded-3xl p-8">
          {/* Header with icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Register Student</h1>
            <p className="text-gray-400 text-sm mt-1">
              Add a new student to the system
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-300 flex items-center gap-2 mb-1">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="w-full px-4 py-3 rounded-xl bg-gray-800/80 focus:bg-gray-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition border border-gray-700"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 flex items-center gap-2 mb-1">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                className="w-full px-4 py-3 rounded-xl bg-gray-800/80 focus:bg-gray-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition border border-gray-700"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 flex items-center gap-2 mb-1">
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Class
              </label>
              <input
                type="text"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                placeholder="Enter class (e.g. Grade 10A)"
                className="w-full px-4 py-3 rounded-xl bg-gray-800/80 focus:bg-gray-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition border border-gray-700"
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

            {success && (
              <div className="bg-green-500/20 border border-green-500/40 text-green-200 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {success}
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold transition shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Save Student
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              to="/dashboard"
              className="text-gray-400 hover:text-white text-sm transition flex items-center justify-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
