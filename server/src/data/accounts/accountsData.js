const db = require("../../database/index");
const sql = require("./sql");

exports.getAccounts = function () {
  return db.query(sql.getAccounts, { type: db.QueryTypes.SELECT });
};

exports.getAccountByCpf = function (cpf) {
  return db.query(sql.getAccountByCpf, {
    type: db.QueryTypes.SELECT,
    replacements: {
      cpf: cpf
    },
    plain: true
  });
};

exports.createUser = function (data) {
  const userId = db.query(sql.createUser, {
    type: db.QueryTypes.INSERT,
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
