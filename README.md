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

## Make Migrations

```
npx sequelize-cli db:migrate 
```

## Install node_modules

```
npm install
```

## Start node server

```
Enter the src folder
run in cmd node server.js
```

## Create account
```
http://localhost:3000/accounts

content-type: application/json
method: POST

 {
  "nome_completo": "Francisco de Assis Alcântara Neto",
  "cpf": "06253732005"
 }
```

## Get accounts
```
http://localhost:3000/accounts/

method: GET
```

## Get account
```
http://localhost:3000/accounts/10324104421

method: GET
```

## Make deposit
```
http://localhost:3000/transactions/deposit

content-type: application/json
method: PUT

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