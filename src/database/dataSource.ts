import 'reflect-metadata';
import { join } from 'node:path';

import { DataSource } from 'typeorm';

const {
  env: { DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_SCHEMA, DB_PORT },
} = process;

const port = typeof DB_PORT === 'string' ? Number.parseInt(DB_PORT, 10) : undefined;

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: DB_SERVER,
  port,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_SCHEMA,
  options: {
    encrypt: false,
  },
  entities: [join(__dirname, '**', 'entities', '*.{ts,js}')],
  migrations: [join(__dirname, '**', 'migrations', '*.{ts,js}')],
  migrationsTableName: 'migrations',
});
