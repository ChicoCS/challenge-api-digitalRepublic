const accountsData = require("../../data/accounts/accountsData");
const utils = require("../../utils/utils");

exports.getAccounts = async function () {
  const accounts = await accountsData.getAccounts();

  if (!accounts) {
    throw new Error("Failed to get accounts.");
  }

  return accounts;
};

exports.getAccountByCpf = async function (cpf) {
  const account = await accountsData.getAccountByCpf(cpf);

  if (!account) {
    throw new Error("Failed to get account.");
  }

  return account;
};

exports.createAccount = async function (data) {
  const cpfIsValid = utils.validateCpf(data.cpf);

  if (cpfIsValid && data.name != "") {
    const checkIfAccountExists = await accountsData.checkIfAccountExists(
      data.cpf
    );
    if (checkIfAccountExists) {
      throw new Error("User already has an account.");
    }

    user = await accountsData.createUser(data);
  } else {
    throw new Error(
      "Invalid data. Check that the data has been filled in correctly."
    );
  }

  const newNumberAccount = utils.generateNumberAccount();
  await accountsData.createAccount(newNumberAccount, user[0].id);
};

exports.deleteAccount = async function (uid) {
  const account = await accountsData.getAccountByUID(uid);

  await accountsData.deleteAccount(account.id);
  await accountsData.deleteUser(account.id);
};
