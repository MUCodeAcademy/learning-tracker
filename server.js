import express from "express";
import bodyParser from 'body-parser'
const app = express();
const https = require("https");
const fs = require("fs");
import cohorts from './server/routes/cohort.routes'
import questions from './server/routes/questions.routes'
import users from './server/routes/user.routes'

const port = process.env.PORT || 3000;
app.use(bodyParser.json())
app.use(express.static(__dirname + "/dist"));

app.use('/api/cohort/', cohorts);
app.use('/api/question/', questions);
app.use('/api/user/', users);

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
