const db = require("../../database/index");
const sql = require("./sql");

exports.getAccounts = function () {
  return db.query(sql.getAccounts, { type: db.QueryTypes.SELECT });
};

exports.getAccountByCpf = function (cpf) {
  return db.query(sql.getAccountByCpf, {
    type: db.QueryTypes.SELECT,
    plain: true,
    replacements: {
      cpf: cpf,
    },
  });
};

exports.getAccountByUID = function (uid) {
  return db.query(sql.getAccountByUID, {
    type: db.QueryTypes.SELECT,
    plain: true,
    replacements: {
      uid: uid,
    },
  });
};

exports.getAccountByAccountNumber = function (accountNumber) {
  return db.query(sql.getAccountByAccountNumber, {
    type: db.QueryTypes.SELECT,
    plain: true,
    replacements: {
      number: accountNumber,
    },
  });
};

exports.createUser = function (data) {
  const userId = db.query(sql.createUser, {
    type: db.QueryTypes.INSERT,
    plain: true,
    replacements: {
      name: data.name,
      cpf: data.cpf,
    },
  });
  return userId;
};

exports.createAccount = function (numberAccount, user_id) {
  return db.query(sql.createAccount, {
    type: db.QueryTypes.INSERT,
    plain: true,
    replacements: {
      user_id: user_id,
      number: numberAccount,
    },
  });
};

exports.deleteAccount = function (id) {
  return db.query(sql.deleteAccount, {
    type: db.QueryTypes.DELETE,
    replacements: {
      user_id: id,
    },
  });
};

exports.deleteUser = function (id) {
  return db.query(sql.deleteUser, {
    type: db.QueryTypes.DELETE,
    replacements: {
      id: id,
    },
  });
};

exports.checkIfAccountExists = function (cpf) {
  return db.query(sql.checkIfAccountExists, {
    type: db.QueryTypes.SELECT,
    plain: true,
    replacements: {
      cpf: cpf,
    },
  });
};