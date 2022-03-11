const axios = require("axios");
const utils = require("../src/utils/utils");
const accountsService = require("../src/services/accounts/accountsService");
const transactionsService = require("../src/services/transactions/transactionsService");

const request = function (url, method, data) {
  return axios({ url, method, data, validateStatus: false });
};

test("Should make deposit - Case Success", async function () {
  const data = { name: utils.generateName(), cpf: utils.generateCPF(false) };
  await accountsService.createAccount(data);
  const testAccount = await accountsService.getAccountByCpf(data.cpf);

  const deposit = {
    account_number: testAccount.number,
    value: 500,
  };

  const response = await request(
    "http://localhost:3000/transactions/deposit",
    "put",
    deposit
  );

  const testAccountAfter = await accountsService.getAccountByCpf(
    testAccount.cpf
  );

  expect(response).toBeDefined();
  expect(response.status).toBe(204);
  expect(parseFloat(testAccountAfter.value)).toBe(parseFloat(500));

  await accountsService.deleteAccount(testAccountAfter.uid);
});

test("Should make deposit - Case Failure - Invalid data, negative number", async function () {
  const data = { name: utils.generateName(), cpf: utils.generateCPF(false) };
  await accountsService.createAccount(data);
  const testAccount = await accountsService.getAccountByCpf(data.cpf);

  const deposit = {
    account_number: testAccount.number,
    value: -50,
  };

  const response = await request(
    "http://localhost:3000/transactions/deposit",
    "put",
    deposit
  );

  expect(response.status).toBe(400);

  await accountsService.deleteAccount(testAccount.uid);
});

test("Should make deposit - Case Failure - Invalid data, deposit greater than 2000", async function () {
  const data = { name: utils.generateName(), cpf: utils.generateCPF(false) };
  await accountsService.createAccount(data);
  const testAccount = await accountsService.getAccountByCpf(data.cpf);

  const deposit = {
    account_number: testAccount.number,
    value: 2000.01,
  };

  const response = await request(
    "http://localhost:3000/transactions/deposit",
    "put",
    deposit
  );

  expect(response.status).toBe(400);

  await accountsService.deleteAccount(testAccount.uid);
});

test("Should make transfer between accounts - Case Success", async function () {
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
    origin_account: originAccountBefore.number,
    destiny_account: destinyAccountBefore.number,
    value: 250,
  };

  const response = await request(
    "http://localhost:3000/transactions",
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
  expect(response.status).toBe(204);
  expect(parseFloat(originAccountAfter.value)).toBe(parseFloat(250));
  expect(parseFloat(destinyAccountAfter.value)).toBe(parseFloat(250));

  await accountsService.deleteAccount(originAccountAfter.uid);
  await accountsService.deleteAccount(destinyAccountAfter.uid);
});

test("Should make transfer between accounts - Case Failure - Insufficient Balance", async function () {
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

  const transferData = {
    origin_account: originAccountBefore.number,
    destiny_account: destinyAccountBefore.number,
    value: 250,
  };

  const response = await request(
    "http://localhost:3000/transactions",
    "put",
    transferData
  );

  expect(response).toBeDefined();
  expect(response.status).toBe(409);

  await accountsService.deleteAccount(originAccountBefore.uid);
  await accountsService.deleteAccount(destinyAccountBefore.uid);
});

test("Should make transfer between accounts - Case Failure - Invalid data, negative number", async function () {
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

  const transferData = {
    origin_account: originAccountBefore.number,
    destiny_account: destinyAccountBefore.number,
    value: -50,
  };

  const response = await request(
    "http://localhost:3000/transactions",
    "put",
    transferData
  );

  expect(response).toBeDefined();
  expect(response.status).toBe(400);

  await accountsService.deleteAccount(originAccountBefore.uid);
  await accountsService.deleteAccount(destinyAccountBefore.uid);
});

test("Should make transfer between accounts - Case Failure - Fails to find account", async function () {
  const originAccountData = {
    name: "OriginAccount",
    cpf: utils.generateCPF(false),
  };

  await accountsService.createAccount(originAccountData);

  const originAccountBefore = await accountsService.getAccountByCpf(
    originAccountData.cpf
  );

  const transferData = {
    origin_account: originAccountBefore.number,
    destiny_account: "",
    value: 250,
  };

  const response = await request(
    "http://localhost:3000/transactions",
    "put",
    transferData
  );

  expect(response).toBeDefined();
  expect(response.status).toBe(409);

  await accountsService.deleteAccount(originAccountBefore.uid);
});

test("Should make transfer between accounts - Case Failure - Try transfer to the same account", async function () {
  const originAccountData = {
    name: "OriginAccount",
    cpf: utils.generateCPF(false),
  };

  await accountsService.createAccount(originAccountData);

  const originAccountBefore = await accountsService.getAccountByCpf(
    originAccountData.cpf
  );

  const transferData = {
    origin_account: originAccountBefore.number,
    destiny_account: originAccountBefore.number,
    value: 250,
  };

  const response = await request(
    "http://localhost:3000/transactions",
    "put",
    transferData
  );

  expect(response).toBeDefined();
  expect(response.status).toBe(409);

  await accountsService.deleteAccount(originAccountBefore.uid);
});