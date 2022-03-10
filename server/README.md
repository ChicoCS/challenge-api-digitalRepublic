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
npm install
```

## Make Migrations

```
npx sequelize-cli db:migrate 
```