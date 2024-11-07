import { Module } from '@nestjs/common';
import { DB } from './database.constants';
import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import connectionOptions from './config/database.config';
import { DatabaseService } from './database.service';
import { schema } from './schemas';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Env } from '../env.interface';
import { repositories } from './respositories';
import { Database } from './types/Database';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DB,
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<Env>,
      ): Promise<Database> => {
        const connection =
          configService.get('NODE_ENV') == 'testing'
            ? await mysql.createConnection(connectionOptions)
            : mysql.createPool(connectionOptions);
        return {
          connection,
          db: drizzle(connection, {
            mode: 'default',
            schema: schema,
            logger: configService.get('NODE_ENV') != 'production',
          }),
        };
      },
    },
    DatabaseService,
    ...repositories,
  ],
  exports: [DB, DatabaseService, ...repositories],
})
export class DatabaseModule {}
