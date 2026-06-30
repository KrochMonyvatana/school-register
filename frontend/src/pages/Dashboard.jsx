import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// ✅ YOUR BACKEND URL (Render)
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
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">
          📋 School Register Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Log Out
        </button>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-700">
            Registered Students ({students.length})
          </h2>

          <Link
            to="/add-student"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
          >
            + Add Student
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading ? (
            <p className="p-6 text-slate-500">Loading students...</p>
          ) : error ? (
            <p className="p-6 text-red-600">{error}</p>
          ) : students.length === 0 ? (
            <p className="p-6 text-slate-500">
              No students yet. Click "Add Student".
            </p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-sm">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Age</th>
                  <th className="px-4 py-3">Class</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 text-slate-500">{s.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {s.name}
                    </td>
                    <td className="px-4 py-3">{s.age}</td>
                    <td className="px-4 py-3">{s.class}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}