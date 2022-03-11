exports.creditAccountBalance =
  "UPDATE accounts SET value = :value WHERE number = :number";

exports.debitAccountBalance =
  "UPDATE accounts SET value = :value WHERE number = :number";
