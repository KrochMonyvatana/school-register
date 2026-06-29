// db.js
// This file sets up the SQLite database and creates the "students" table
// if it doesn't already exist.

const Database = require("better-sqlite3");
const path = require("path");

// This creates (or opens, if it already exists) a file called school.db
// in the backend folder. That file IS your database.
const db = new Database(path.join(__dirname, "school.db"));

// Create the students table if it doesn't exist yet.
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    class TEXT NOT NULL
  )
`);

module.exports = db;
