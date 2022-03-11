const axios = require("axios");
const utils = require("../src/utils/utils");
const accountsService = require("../src/services/accounts/accountsService");
const transactionsService = require("../src/services/transactions/transactionsService");

const request = function (url, method, data) {
  return axios({ url, method, data });
};

test("Should make deposit", async function () {
  const data = { name: utils.generateName(), cpf: utils.generateCPF(false) };
  await accountsService.createAccount(data);
  const testAccount = await accountsService.getAccountByCpf(data.cpf);

  const deposit = {
    value: 500,
  };

  const response = await request(
    `http://localhost:3000/accounts/deposit/${testAccount.number}`,
    "put",
    deposit
  );

  const testAccountAfter = await accountsService.getAccountByCpf(
    testAccount.cpf
  );

  expect(response).toBeDefined();
  expect(parseFloat(testAccountAfter.value)).toBe(parseFloat(500));

  await accountsService.deleteAccount(testAccountAfter.uid);
});

test("should make transfer between accounts", async function () {
  const originAccountData = {
    name: "OriginAccount",
    cpf: utils.generateCPF(false),
  };
  const destinyAccountData = {
    name: "DestinyAccount",
    cpf: utils.generateCPF(false),
  };

  await accountsService.createAccount(originAccountData);
  await accountsService.createAccount(destinyAccountData);

  const originAccountBefore = await accountsService.getAccountByCpf(
    originAccountData.cpf
  );
  const destinyAccountBefore = await accountsService.getAccountByCpf(
    destinyAccountData.cpf
  );

  await transactionsService.makeDeposit(originAccountBefore.number, 500);

  const transferData = {
    originAccount: originAccountBefore.number,
    destinyAccount: destinyAccountBefore.number,
    value: 250,
  };

  const response = await request(
    `http://localhost:3000/transactions/`,
    "put",
    transferData
  );

  const originAccountAfter = await accountsService.getAccountByCpf(
    originAccountData.cpf
  );
  const destinyAccountAfter = await accountsService.getAccountByCpf(
    destinyAccountData.cpf
  );

  expect(response).toBeDefined();
  expect(parseFloat(originAccountAfter.value)).toBe(parseFloat(250));
  expect(parseFloat(destinyAccountAfter.value)).toBe(parseFloat(250));

  await accountsService.deleteAccount(originAccountAfter.uid);
  await accountsService.deleteAccount(destinyAccountAfter.uid);
});
