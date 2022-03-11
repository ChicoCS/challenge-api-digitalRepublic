const transactionsData = require("../../data/transactions/transactionsData");
const accountsData = require("../../data/accounts/accountsData");

exports.makeDeposit = async function (accountNumber, value) {
  let response;
  let account;

  if (Math.sign(value) === 1 && parseFloat(value) <= 2000) {
    account = await accountsData.getAccountByAccountNumber(accountNumber);
  } else {
    return console.warn(
      "O valor a ser depositado não pode ser negativo e nem maior que 2000"
    );
  }

  if (account) {
    const newBalanceAccount = parseFloat(value) + parseFloat(account.value);

    response = await transactionsData.creditAccountBalance(
      accountNumber,
      newBalanceAccount
    );
  }

  return response;
};

exports.makeTransfer = async function (data) {
  const originAccount = await accountsData.getAccountByAccountNumber(
    data.originAccount
  );
  const destinyAccount = await accountsData.getAccountByAccountNumber(
    data.destinyAccount
  );

  if (originAccount.value >= data.value) {
    const newBalanceOriginAccount =
      parseFloat(originAccount.value) - parseFloat(data.value);
    respDebitAccount = await transactionsData.debitAccountBalance(
      originAccount.number,
      newBalanceOriginAccount
    );
  }

  if (respDebitAccount[1] === 1) {
    const newBalanceDestinyAccount =
      parseFloat(destinyAccount.value) + parseFloat(data.value);
    respCreditAccount = await transactionsData.debitAccountBalance(
      destinyAccount.number,
      newBalanceDestinyAccount
    );
  }

  return;
};
