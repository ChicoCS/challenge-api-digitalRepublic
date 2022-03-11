const db = require("../../database/index");
const sql = require("./sql");

exports.creditAccountBalance = function (accountNumber, value) {
  return db.sequelize.query(sql.creditAccountBalance, {
    type: db.sequelize.QueryTypes.UPDATE,
    plain: true,
    replacements: {
      number: accountNumber,
      value: value,
    },
  });
};

exports.debitAccountBalance = function (accountNumber, value) {
  return db.sequelize.query(sql.debitAccountBalance, {
    type: db.sequelize.QueryTypes.UPDATE,
    plain: true,
    replacements: {
      number: accountNumber,
      value: value,
    },
  });
};

