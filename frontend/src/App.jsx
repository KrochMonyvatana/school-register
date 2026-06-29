import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import StudentForm from "./pages/StudentForm.jsx";

// Very simple "is the user logged in?" check.
// We store a flag in localStorage when login succeeds.
// This is NOT secure — it's only for learning purposes.
function isLoggedIn() {
  return localStorage.getItem("loggedIn") === "true";
}

// A small wrapper component: if the user isn't logged in,
// redirect them back to the login page.
function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-student"
        element={
          <ProtectedRoute>
            <StudentForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
