const db = require("../../database/index");
const sql = require("./sql");

exports.getAccounts = function () {
  return db.sequelize.query(sql.getAccounts, { type: db.sequelize.QueryTypes.SELECT });
};

exports.getAccountByCpf = async function (cpf) {
  const data = await db.sequelize.query(sql.getAccountByCpf, {
    type: db.sequelize.QueryTypes.SELECT,
    plain: true,
    replacements: {
      cpf: cpf,
    },
  });
  return data
};

exports.getAccountByUID = function (uid) {
  return db.sequelize.query(sql.getAccountByUID, {
    type: db.sequelize.QueryTypes.SELECT,
    plain: true,
    replacements: {
      uid: uid,
    },
  });
};

exports.getAccountByAccountNumber = function (accountNumber) {
  return db.sequelize.query(sql.getAccountByAccountNumber, {
    type: db.sequelize.QueryTypes.SELECT,
    plain: true,
    replacements: {
      number: accountNumber,
    },
  });
};

exports.createUser = function (data) {
  const userId = db.sequelize.query(sql.createUser, {
    type: db.sequelize.QueryTypes.INSERT,
    plain: true,
    replacements: {
      name: data.name,
      cpf: data.cpf,
    },
  });
  return userId;
};

exports.createAccount = function (numberAccount, user_id) {
  return db.sequelize.query(sql.createAccount, {
    type: db.sequelize.QueryTypes.INSERT,
    plain: true,
    replacements: {
      user_id: user_id,
      number: numberAccount,
    },
  });
};

exports.deleteAccount = function (id) {
  return db.sequelize.query(sql.deleteAccount, {
    type: db.sequelize.QueryTypes.DELETE,
    replacements: {
      user_id: id,
    },
  });
};

exports.deleteUser = function (id) {
  return db.sequelize.query(sql.deleteUser, {
    type: db.sequelize.QueryTypes.DELETE,
    replacements: {
      id: id,
    },
  });
};

exports.checkIfAccountExists = function (cpf) {
  return db.sequelize.query(sql.checkIfAccountExists, {
    type: db.sequelize.QueryTypes.SELECT,
    plain: true,
    replacements: {
      cpf: cpf,
    },
  });
};