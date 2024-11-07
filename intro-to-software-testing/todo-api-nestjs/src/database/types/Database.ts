import { MySqlDatabase } from 'drizzle-orm/mysql-core';
import {
  MySql2QueryResultHKT,
  MySql2PreparedQueryHKT,
} from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import { schema } from '../schemas';

export type Database = {
  connection: mysql.Pool | mysql.Connection;
  db: MySqlDatabase<
    MySql2QueryResultHKT,
    MySql2PreparedQueryHKT,
    typeof schema
  >;
};
