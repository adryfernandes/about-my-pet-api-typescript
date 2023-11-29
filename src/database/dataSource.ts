import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { envConfig } from '@/utils';

const env = envConfig();
const { DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_SCHEMA } = env || {};

export const AppDataSource: DataSource = new DataSource({
  type: 'mssql',
  host: DB_SERVER,
  port: 1433,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_SCHEMA,
  options: { encrypt: false },
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  migrationsTableName: 'Migracoes',
});
