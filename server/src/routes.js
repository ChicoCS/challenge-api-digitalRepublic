const express = require("express");
const router = express.Router();
const accountsService = require("./services/accounts/accountsService");
const transactionsService = require("./services/transactions/transactionsService");

router.get("/accounts", async function (req, res) {
  const accounts = await accountsService.getAccounts();
  res.json(accounts);
});

router.get("/accounts/:cpf", async function (req, res) {
  const account = await accountsService.getAccountByCpf(req.params.cpf);
  res.json(account);
});

router.post("/accounts", async function (req, res) {
  const data = req.body;
  const resp = await accountsService.createAccount(data);
  res.json(resp);
});

router.put("/accounts/deposit/:id", async function (req, res) {
  const data = req.body;
  const resp = await transactionsService.makeDeposit(req.params.id, data.value)
  res.send(resp)
});

router.put("/transactions/", async function (req, res) {
  const data = req.body;
  const resp = await transactionsService.makeTransfer(data)
  res.end(resp);
});

module.exports = router;
