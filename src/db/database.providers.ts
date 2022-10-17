import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'TODO_APP',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + './migrations/*{.ts,.js}'],
        synchronize: true,
        logging: true,
      });
      return dataSource.initialize();
    },
  },
];
