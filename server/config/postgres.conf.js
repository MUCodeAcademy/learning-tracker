const { Pool, Client } = require("pg");

console.log(process.env.PORT)

const client = new Client({
  connectionString: process.env.POSTGRES_URL,
  ssl: true
});

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: true
});

pool.connect((err, client, done) => {
  if (err) {
    console.log("Pool encountered connection error:", err);
  }
});

client.connect(err => {
  if (err) {
    console.log("Client encountered error on connect:", err);
  }
});

pool.on("error", (err, client) => console.log("Pool error:", err));

module.exports.client = client;
module.exports.pool = pool;
