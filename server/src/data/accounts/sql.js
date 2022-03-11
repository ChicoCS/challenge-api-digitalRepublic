exports.getAccounts =
  "SELECT us.uid, us.name, us.cpf, acc.number, acc.value FROM users us LEFT JOIN accounts acc ON acc.user_id = us.id";

exports.getAccountByCpf =
  "SELECT us.uid, us.name, us.cpf, acc.number, acc.value FROM users us LEFT JOIN accounts acc ON acc.user_id = us.id WHERE us.cpf = :cpf";

exports.createUser =
  "INSERT INTO users(name, cpf) VALUES (:name, :cpf) RETURNING id";

exports.createAccount =
  "INSERT INTO accounts(user_id, number) VALUES (:user_id, :number)";

exports.deleteAccount = "DELETE FROM accounts WHERE user_id = :user_id";

exports.deleteUser = "DELETE FROM users WHERE id = :id";
