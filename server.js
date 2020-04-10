import express from "express";
import bodyParser from 'body-parser'
const app = express();
const https = require("https");
const fs = require("fs");
import mongoose from 'mongoose'
import retention from './server/routes/retention.routes'
import cohorts from './server/routes/cohort.routes'
import questions from './server/routes/questions.routes'
import users from './server/routes/user.routes'
import lessons from './server/routes/lessons.routes'
import notes from './server/routes/notes.routes'
import quiz from './server/routes/quiz.routes'
import log from './server/middleware/logging.middleware'

import mongooseConf from "./server/config/mongodb.conf";
mongooseConf(mongoose);

const port = process.env.PORT;
app.use(log())
app.use(bodyParser.json())
app.use(express.static(__dirname + "/dist"));

app.use('/api/retention/', retention);
app.use('/api/cohorts/', cohorts);
app.use('/api/questions/', questions);
app.use('/api/lessons/', lessons);
app.use('/api/users/', users);
app.use('/api/notes/', notes);
app.use("/api/quiz/", quiz);

// Allows for angular routing to take precedent
app.get("*", (req, res) =>
  res.sendFile("/dist/index.html", { root: __dirname + "/" })
);

let httpOpts = process.env.ENV == "PROD" ? {}  :   {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
  passphrase: "M1dC0d3"
}
https
  .createServer(
    httpOpts,
    app
  )
  .listen(port);
console.log("App listening on port:", process.env.PORT)

