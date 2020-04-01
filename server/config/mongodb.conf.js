const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  keepAlive: true,
  autoIndex: false,
  keepAliveInitialDelay: 300000
};

mongoose.connect(process.env.MGDB_URI, options).then(
  res => {
    return;
  },
  err => console.log(err)
);

const pool = mongoose.connection;

function gracefulExit() {
  mongoose.connection.close(() => {
    console.log(`Mongoose connection has disconnected through app termination`);
    process.exit(0);
  });
}

mongoose.connection.on("connected", ref => {
  console.log(
    `Successfully connected to ${process.env.MGDB} database on startup `
  );
});

// If the connection throws an error
mongoose.connection.on("error", err => {
  console.error(
    `Failed to connect to ${process.env.MGDB} database on startup `,
    err
  );
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log(
    `Mongoose default connection to ${process.env.MGDB} database disconnected`
  );
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", gracefulExit).on("SIGTERM", gracefulExit);

module.exports.pool = pool;
