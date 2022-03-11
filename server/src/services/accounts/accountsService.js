const accountsData = require("../../data/accounts/accountsData");
const utils = require("../../utils/utils");

exports.getAccounts = function () {
  return accountsData.getAccounts();
};

exports.getAccountByCpf = function (cpf) {
  return accountsData.getAccountByCpf(cpf)
}

exports.createAccount = async function (data) {
  if (data.name != "" && data.cpf != "") {
    newUser = await accountsData.createUser(data);
    if (!newUser) {
      return null;
    }
  } else {
    return null;
  }

  const newNumberAccount = utils.generateNumberAccount();

  const err = accountsData.createAccount(newNumberAccount, newUser[0][0].id);

  return newUser;
};


exports.deleteAccount = async function (id) {
  await accountsData.deleteAccount(id);
  await accountsData.deleteUser(id);

  return null;
};
