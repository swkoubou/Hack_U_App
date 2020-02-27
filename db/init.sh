#!/bin/bash

mysql -u$HACK_U_App_MYSQL_USER -p$HACK_U_App_MYSQL_PASSWORD hack_u_db < ./create_table.sql