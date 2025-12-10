import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT!, 10) || 5432,
  username: process.env.DATABASE_USER || 'viradela',
  password: process.env.DATABASE_PASSWORD || 'dev_password_123',
  database: process.env.DATABASE_NAME || 'viradela_dev',

  entities: [__dirname + '/../**/*.entity{.ts, .js}'],

  migrations: [__dirname + '/../database/migrations/*{.ts, .js}'],

  synchronize: process.env.NODE_ENV === 'development',

  logging: process.env.NODE_ENV === 'development',

  subscribers: [],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
