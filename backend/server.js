const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

// ✅ IMPORTANT: Render needs process.env.PORT
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * FAKE LOGIN
 * username: admin
 * password: 1234
 */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    return res.json({
      success: true,
      message: "Login successful",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid username or password",
  });
});

/**
 * GET ALL STUDENTS
 */
app.get("/students", (req, res) => {
  try {
    const students = db
      .prepare("SELECT * FROM students ORDER BY id DESC")
      .all();

    res.json(students);
  } catch (err) {
    console.error("GET /students error:", err);
    res.status(500).json({ message: "Failed to fetch students" });
  }
});

/**
 * ADD STUDENT
 */
app.post("/students", (req, res) => {
  const { name, age, class: studentClass } = req.body;

  if (!name || !age || !studentClass) {
    return res.status(400).json({
      message: "name, age, and class are required",
    });
  }

  try {
    const stmt = db.prepare(
      "INSERT INTO students (name, age, class) VALUES (?, ?, ?)"
    );

    const result = stmt.run(name, age, studentClass);

    const newStudent = db
      .prepare("SELECT * FROM students WHERE id = ?")
      .get(result.lastInsertRowid);

    res.status(201).json(newStudent);
  } catch (err) {
    console.error("POST /students error:", err);
    res.status(500).json({ message: "Failed to add student" });
  }
});

/**
 * START SERVER
 */
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});