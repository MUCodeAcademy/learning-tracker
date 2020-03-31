require("dotenv").config();
import express from "express";

const app = express();
const https = require("https");

const port = process.env.PORT || 3000;
app.use(express.static(__dirname + "/dist"));

// Allows for angular routing to take precedent
app.get("*", (req, res) =>
  res.sendFile("/dist/index.html", { root: __dirname + "/" })
);

https.createServer(app).listen(port);
