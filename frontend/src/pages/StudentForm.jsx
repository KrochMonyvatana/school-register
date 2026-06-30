import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const BASE_URL = "https://school-register-5e82.onrender.com";

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
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-slate-800">Add Student</h1>
          <Link to="/dashboard" className="text-sm text-indigo-600 hover:underline">
            ← Back to dashboard
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          <input
            type="text"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            placeholder="Class"
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
              {error}
            </p>
          )}

          {success && (
            <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg"
          >
            Save Student
          </button>

        </form>

      </div>
    </div>
  );
}