const express = require("express");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use(routes);
app.use(function (error, req, res, next) {
  if (error.message === "User already has an account.") {
    return res.status(409).send(error.message);
  }
  if (error.message === "Failure to create user.") {
    return res.status(409).send(error.message);
  }
  if (error.message === "Failed to get account.") {
    return res.status(409).send(error.message);
  }
  if (error.message === "Insufficient Balance.") {
    return res.status(409).send(error.message);
  }
  if (error.message === "Failed when trying to get accounts.") {
    return res.status(409).send(error.message);
  }
  if (error.message === "You cannot make a transfer to the same account.") {
    return res.status(409).send(error.message);
  }
  if (
    error.message ===
    "Invalid data. Check that the data has been filled in correctly."
  ) {
    return res.status(400).send(error.message);
  }
  if (error.message === "The amount to deposit cannot be negative.") {
    return res.status(400).send(error.message);
  }
  if (error.message === "The amount to transfer cannot be negative.") {
    return res.status(400).send(error.message);
  }
  if (error.message === "The amount to deposit cannot be more than 2000.00.") {
    return res.status(400).send(error.message);
  }
  res.status(500).send(error.message);
});
app.listen(3000);
