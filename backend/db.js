const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "school_register",
  password: "2025db", // 👈 change this
  port: 5432,
});

module.exports = pool;
