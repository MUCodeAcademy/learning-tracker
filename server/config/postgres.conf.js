const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

pool.connect((err, client, done) => {
  if (err) {
    console.log("Pool encountered connection error:", err);
  }
});

pool.on("error", (err, client) => console.log("Pool error:", err));

module.exports.pool = pool;
