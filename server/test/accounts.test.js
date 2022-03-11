const axios = require("axios");
const utils = require("../src/utils/utils");
const accountsService = require("../src/services/accounts/accountsService");

const request = function (url, method, data) {
  return axios({ url, method, data });
};

test("Should get accounts", async function () {
  const data1 = { name: utils.generateName(), cpf: utils.generateCPF(false) };
  const data2 = { name: utils.generateName(), cpf: utils.generateCPF(false) };
  const data3 = { name: utils.generateName(), cpf: utils.generateCPF(false) };

  await accountsService.createAccount(data1);
  await accountsService.createAccount(data2);
  await accountsService.createAccount(data3);

  const response = await request("http://localhost:3000/accounts", "get");

  const data1Account = await accountsService.getAccountByCpf(data1.cpf);
  const data2Account = await accountsService.getAccountByCpf(data2.cpf);
  const data3Account = await accountsService.getAccountByCpf(data3.cpf);

  expect(response).toBeDefined();

  await accountsService.deleteAccount(data1Account.uid);
  await accountsService.deleteAccount(data2Account.uid);
  await accountsService.deleteAccount(data3Account.uid);
});

test("Should get a account by cpf", async function () {
  const data1 = { name: utils.generateName(), cpf: utils.generateCPF(false) };
  await accountsService.createAccount(data1);

  const response = await request(
    `http://localhost:3000/accounts/${data1.cpf}`,
    "get"
  );

  const get = response.data;

  expect(get).toBeDefined();
  expect(get.name).toBe(data1.name);
  expect(get.cpf).toBe(data1.cpf);

  await accountsService.deleteAccount(get.uid);
});

test("Should create user and account", async function () {
  const data = { name: utils.generateName(), cpf: utils.generateCPF(false) };

  const response = await request(
    "http://localhost:3000/accounts",
    "post",
    data
  );

  const testAccount = await accountsService.getAccountByCpf(data.cpf);

  expect(response).toBeDefined();
  expect(testAccount.name).toBe(data.name);
  expect(testAccount.cpf).toBe(data.cpf);

  await accountsService.deleteAccount(testAccount.uid);
});
