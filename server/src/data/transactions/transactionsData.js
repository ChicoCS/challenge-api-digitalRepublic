const db = require("../../database/index");
const sql = require("./sql");

exports.creditAccountBalance = function (accountNumber, value) {
  return db.query(sql.creditAccountBalance, {
    type: db.QueryTypes.UPDATE,
    plain: true,
    replacements: {
      number: accountNumber,
      value: value,
    },
  });
};

exports.debitAccountBalance = function (accountNumber, value) {
  return db.query(sql.debitAccountBalance, {
    type: db.QueryTypes.UPDATE,
    plain: true,
    replacements: {
      number: accountNumber,
      value: value,
    },
  });
};

