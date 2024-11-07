import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import * as mysql from 'mysql2/promise';
import connectionOptions from '../config/database.config';

async function runMigration() {
  const connection = await mysql.createConnection(connectionOptions);
  const db = drizzle(connection);
  /* eslint-disable no-console */
  console.log('Running migrations....');
  await migrate(db, {
    migrationsFolder: 'src/database/migrations',
    migrationsTable: 'migrations',
  });
  console.log('Migration Successfull!');
  await connection.end();
  process.exit();
}

runMigration();
