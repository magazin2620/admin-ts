import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root-26',
  database: 'admin_ts',
  entities: ['src/entity/*.ts'],
  logging: false,
  synchronize: true,
});
