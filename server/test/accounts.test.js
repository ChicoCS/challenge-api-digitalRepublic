const axios = require("axios");
const utils = require("../src/utils/utils");
const accountsService = require("../src/services/accounts/accountsService");

const request = function (url, method, data) {
  return axios({ url, method, data });
};

test("Should get accounts", async function () {
  const data1 = { name: utils.generateName(), cpf: utils.generateCPF(false) };
  const test1 = await accountsService.createAccount(data1);

  const resp = await request("http://localhost:3000/accounts", "get");

  expect(resp).toBeDefined();

  await accountsService.deleteAccount(test1[0][0].id);
});

test("Should get a account by cpf", async function () {
  const data1 = { name: utils.generateName(), cpf: utils.generateCPF(false) };
  const test1 = await accountsService.createAccount(data1);

  const resp = await request(
    `http://localhost:3000/accounts/${data1.cpf}`,
    "get"
  );

  const get = resp.data;

  expect(get).toBeDefined();
  expect(get.name).toBe(data1.name);
  expect(get.cpf).toBe(data1.cpf);

  await accountsService.deleteAccount(test1[0][0].id);
});

test("Should create user and account", async function () {
  const data = { name: utils.generateName(), cpf: utils.generateCPF(false) };
  const resp = await request("http://localhost:3000/accounts", "post", data);

  const post = JSON.parse(resp.config.data);

  expect(post).toBeDefined();
  expect(post.name).toBe(data.name);
  expect(post.cpf).toBe(data.cpf);

  await accountsService.deleteAccount(resp.data[0][0].id);
});
