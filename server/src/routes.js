const express = require("express");
const router = express.Router();
const accountsService = require("./services/accounts/accountsService");
const transactionsService = require("./services/transactions/transactionsService");

router.get("/accounts", async function (req, res) {
  try {
    const response = await accountsService.getAccounts();
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

router.post("/accounts", async function (req, res, next) {
  const data = req.body;
  try {
    await accountsService.createAccount(data);
    res.status(201).end();
  } catch (e) {
    next(e);
  }
});

router.get("/accounts/:cpf", async function (req, res, next) {
  try {
    const response = await accountsService.getAccountByCpf(req.params.cpf);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

router.put("/transactions/", async function (req, res, next) {
  try {
    const data = req.body;
    await transactionsService.makeTransfer(data);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

router.put("/transactions/deposit/:id", async function (req, res, next) {
  try {
    const data = req.body;
    await transactionsService.makeDeposit(req.params.id, data.value);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
