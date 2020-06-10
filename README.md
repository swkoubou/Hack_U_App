# 車椅子レンタル検索アプリ

本アプリは、車椅子のレンタルできる場所を検索する地図アプリです。

## build

```
go get
# 環境変数の登録
export Google_Map_API_KEY=<YourApiKey>
export HACK_U_App_MYSQL_PASSWORD=<YourDBPass>
export HACK_U_App_MYSQL_USER="hack_u_controllor"
# データベースの用意
sudo mysql -uroot -p -e"create user $HACK_U_App_MYSQL_USER@localhost identified by '$HACK_U_App_MYSQL_PASSWORD';"
sudo mysql -uroot -p -e"create database hack_u_db;"
sudo mysql -uroot -p -e"grant all on hack_u_db.* to $HACK_U_App_MYSQL_USER@localhost;"```
db/init.sh
go run main.go
```

## Requirement

* go version go1.11.6 linux/amd64
* mariadb  Ver 15.1 Distrib 10.3.22-MariaDB, for debian-linux-gnu (x86_64) using readline 5.2
