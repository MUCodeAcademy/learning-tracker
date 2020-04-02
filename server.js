import dotenv from 'dotenv';
const env = dotenv.config()
console.log(process.env.PORT, "in server")
import express from "express";
const app = express();
const https = require("https");
const fs = require("fs");
import cohorts from './server/routes/cohort.routes'

const port = process.env.PORT || 3000;
app.use(express.static(__dirname + "/dist"));

app.use('/api/cohorts/', cohorts);

// Allows for angular routing to take precedent
app.get("*", (req, res) =>
  res.sendFile("/dist/index.html", { root: __dirname + "/" })
);

https
  .createServer(
    {
      key: fs.readFileSync("./key.pem"),
      cert: fs.readFileSync("./cert.pem"),
      passphrase: "M1dC0d3"
    },
    app
  )
  .listen(port);
