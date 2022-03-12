const express = require("express");
const routes = require("./routes");
const exceptions = require("./exceptions/exceptions");

const app = express();

app.use(express.json());
app.use(routes);
app.use(function (error, req, res, next) {
  if (exceptions.status409Exceptions.includes(error.message)) {
    return res.status(409).send(error.message);
  }
  if (exceptions.status400Exceptions.includes(error.message)) {
    return res.status(400).send(error.message);
  }
  res.status(500).send(error.message);
});
app.listen(3000);
