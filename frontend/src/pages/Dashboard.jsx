import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const BASE_URL = "https://school-register-5e82.onrender.com";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/students`);
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
      setError("Could not load students. Check backend connection.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("loggedIn");
    navigate("/");
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Dark glass header */}
        <header className="bg-gray-900/60 backdrop-blur-xl border-b border-gray-700/60 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">📋</span>
            </div>
            <h1 className="text-xl font-bold text-white">School Register</h1>
          </div>

          <button
            onClick={handleLogout}
            className="text-sm text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-xl transition flex items-center gap-2 border border-gray-700"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Log Out
          </button>
        </header>

        {/* Main area */}
        <main className="flex-1 max-w-5xl w-full mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="bg-gray-800/70 px-3 py-1 rounded-full text-sm text-indigo-400 border border-gray-700">
                {students.length}
              </span>
              Registered Students
            </h2>

            <Link
              to="/add-student"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-lg hover:shadow-indigo-500/20 transition flex items-center gap-2"
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
              Add Student
            </Link>
          </div>

          {/* Dark glass table card */}
          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/60 rounded-2xl shadow-2xl overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="text-gray-400 text-sm flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading students...
                </div>
              </div>
            ) : error ? (
              <div className="p-8 text-red-400 text-center">{error}</div>
            ) : students.length === 0 ? (
              <div className="p-8 text-gray-400 text-center">
                No students yet. Click{" "}
                <span className="text-indigo-400">“Add Student”</span> to get
                started.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-800/50 backdrop-blur-sm text-gray-400 text-sm uppercase border-b border-gray-700/60">
                    <tr>
                      <th className="px-6 py-4 font-medium">ID</th>
                      <th className="px-6 py-4 font-medium">Name</th>
                      <th className="px-6 py-4 font-medium">Age</th>
                      <th className="px-6 py-4 font-medium">Class</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s, index) => (
                      <tr
                        key={s.id}
                        className={`border-t border-gray-700/40 hover:bg-gray-800/30 transition ${
                          index % 2 === 0 ? "bg-gray-800/20" : ""
                        }`}
                      >
                        <td className="px-6 py-4 text-gray-500 text-sm">
                          {s.id}
                        </td>
                        <td className="px-6 py-4 font-medium text-white">
                          {s.name}
                        </td>
                        <td className="px-6 py-4 text-gray-300">{s.age}</td>
                        <td className="px-6 py-4 text-gray-300">{s.class}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
