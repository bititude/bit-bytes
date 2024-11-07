import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: 'src/database/migrations',
  dialect: 'mysql',
  schema: 'src/database/schemas/index.ts',
  schemaFilter: 'public',
  dbCredentials: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
  },
});
