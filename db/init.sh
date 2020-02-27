#!/bin/bash

pushd $(dirname $0)
mysql -u$HACK_U_App_MYSQL_USER -p$HACK_U_App_MYSQL_PASSWORD hack_u_db <./create_table.sql
mysql -u$HACK_U_App_MYSQL_USER -p$HACK_U_App_MYSQL_PASSWORD hack_u_db <./data.sql
popd