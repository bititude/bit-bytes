import { Inject } from '@nestjs/common';
import { DB } from './database.constants';
import { Database } from './types/Database';

export class DatabaseService {
  constructor(
    @Inject(DB)
    private readonly dbObject: Database,
  ) {}

  async execute(query: string) {
    return await this.dbObject.connection.execute(query);
  }

  getDbObject() {
    return this.dbObject.db;
  }

  async close() {
    await this.dbObject.connection.destroy();
  }

  async cleanTable(tableName: string) {
    await this.dbObject.connection.execute(`DELETE FROM ${tableName};`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createTransaction(trxFn: (trx: any) => Promise<unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await this.dbObject.db.transaction((trx: any) => trxFn(trx));
  }
}
export { Database };
