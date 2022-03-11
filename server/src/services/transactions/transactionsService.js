const transactionsData = require("../../data/transactions/transactionsData");
const accountsData = require("../../data/accounts/accountsData");

exports.makeDeposit = async function (accountNumber, value) {
  let account;

  if (Math.sign(value) !== 1) {
    throw new Error("The amount to deposit cannot be negative.");
  }

  if (parseFloat(value) > 2000) {
    throw new Error("The amount to deposit cannot be more than 2000.00.");
  }

  account = await accountsData.getAccountByAccountNumber(accountNumber);

  if (account) {
    const newBalanceAccount = parseFloat(value) + parseFloat(account.value);

    response = await transactionsData.creditAccountBalance(
      accountNumber,
      newBalanceAccount
    );
  }
};

exports.makeTransfer = async function (data) {
  const originAccount = await accountsData.getAccountByAccountNumber(
    data.originAccount
  );

  const destinyAccount = await accountsData.getAccountByAccountNumber(
    data.destinyAccount
  );

  if(!originAccount || !destinyAccount){
    throw new Error("Failed when trying to get accounts.");
  }

  if (originAccount.number === destinyAccount.number) {
    throw new Error("You cannot make a transfer to the same account.");
  }

  if (Math.sign(data.value) !== 1) {
    throw new Error("The amount to transfer cannot be negative.");
  }

  if (originAccount.value < data.value) {
    throw new Error("Insufficient Balance.");
  }

  const newBalanceOriginAccount =
    parseFloat(originAccount.value) - parseFloat(data.value);
  respDebitAccount = await transactionsData.debitAccountBalance(
    originAccount.number,
    newBalanceOriginAccount
  );

  if (respDebitAccount[1] === 1) {
    const newBalanceDestinyAccount =
      parseFloat(destinyAccount.value) + parseFloat(data.value);
    respCreditAccount = await transactionsData.debitAccountBalance(
      destinyAccount.number,
      newBalanceDestinyAccount
    );
  }
};
