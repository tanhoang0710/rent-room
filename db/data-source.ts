import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  password: '123456',
  username: 'root',
  database: 'rent_room',
  port: 3306,
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  charset: 'utf8mb4_unicode_ci',
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
