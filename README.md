# Challenge Backend Digital Republic

The challenge aims to create an API with some essential functions related to bank account management.


# Initial settings

## Postgres Config

```
docker volume create db_digital_republic

docker container run -d --name postgres_digital_republic -p 5436:5432 -v db_digital_republic:/var/lib/postgresql/data --restart always -e POSTGRES_PASSWORD=postgres007 postgres:12.10
```

## DATABASE

```
docker run --rm -ti \
--link postgres_digital_republic:db \
-e PGPASSWORD=postgres007 \
-v $PWD:/bkp -w /bkp postgres:12.10 psql -h db -U postgres -c "CREATE DATABASE digitalrepublic"
```

## Install node_modules

```
Enter folder server
npm install
```

## Make Migrations

```
Enter the src folder and run in cmd
npx sequelize-cli db:migrate 
```

## Start node server

```
Enter the src folder and run in cmd
node server.js
```

## Create account
```
http://localhost:3000/accounts

content-type: application/json
method: POST

 {
  "name": "Francisco de Assis Alcântara Neto",
  "cpf": "06253732005"
 }
```

## Get accounts
```
http://localhost:3000/accounts/

method: GET
```

## Get account by CPF
```
http://localhost:3000/accounts/10324104421

method: GET
```

## Make deposit
```
http://localhost:3000/transactions/deposit

content-type: application/json
method: POST

 {
  "account_number": "927027",
  "value": 50
 }
```

## Make transfer
```
http://localhost:3000/transactions

content-type: application/json
method: PUT

 {
  "origin_account": "927027",
  "destiny_account": "223945",
  "value": 20
 }
```