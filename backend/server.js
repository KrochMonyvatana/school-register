const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

/* ---------------- LOGIN (same as before) ---------------- */
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

/* ---------------- GET STUDENTS ---------------- */
app.get("/students", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students ORDER BY id DESC");

    res.json(result.rows);
  } catch (err) {
    console.error("GET /students error:", err);
    res.status(500).json({ message: "Failed to fetch students" });
  }
});

/* ---------------- ADD STUDENT ---------------- */
app.post("/students", async (req, res) => {
  const { name, age, class: studentClass } = req.body;

  if (!name || !age || !studentClass) {
    return res.status(400).json({
      message: "name, age, and class are required",
    });
  }

  try {
    const result = await db.query(
      "INSERT INTO students (name, age, class) VALUES ($1, $2, $3) RETURNING *",
      [name, age, studentClass],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /students error:", err);
    res.status(500).json({ message: "Failed to add student" });
  }
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
