const accountsData = require("../../data/accounts/accountsData");
const utils = require("../../utils/utils");

exports.getAccounts = function () {
  return accountsData.getAccounts();
};

exports.getAccountByCpf = function (cpf) {
  return accountsData.getAccountByCpf(cpf);
};

exports.createAccount = async function (data) {
  const cpfIsValid = utils.validateCpf(data.cpf);

  if (cpfIsValid && data.name != "") {
    const checkIfAccountExists = await accountsData.checkIfAccountExists(
      data.cpf
    );
    if (checkIfAccountExists) {
      return "conta ja existe";
    }

    newUser = await accountsData.createUser(data);
  } else {
    return "dados inválidos";
  }

  const newNumberAccount = utils.generateNumberAccount();
  await accountsData.createAccount(newNumberAccount, newUser[0].id);

  return newUser;
};

exports.deleteAccount = async function (uid) {
  const account = await accountsData.getAccountByUID(uid);

  await accountsData.deleteAccount(account.id);
  await accountsData.deleteUser(account.id);

  return;
};
