const express = require("express");
const router = express.Router();
const accountsService = require("./services/accounts/accountsService");

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

// //depositar valor
// router.put("/accounts/:id", async function (req, res) {});

// //realizar transferencia entre contas
// router.put("/transactions/", async function (req, res) {});

module.exports = router;
