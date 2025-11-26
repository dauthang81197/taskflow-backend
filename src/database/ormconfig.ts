import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";
import logger from "../config/logger";
import { SeederOptions } from "typeorm-extension";
dotenv.config();

// 👇 Config TypeORM
const connectionOptions: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "taskflow",
  synchronize: false,
  logging: true,

  entities: [
    path.resolve(__dirname, "../shareds/entities/**/*.entity.{ts,js}"),
    path.resolve(__dirname, "../shareds/entities/*.{ts,js}"),
  ],

  migrations: [path.resolve(__dirname, "./migrations/*.{ts,js}")],
  seeds: [path.resolve(__dirname, "database/seeds/*.seeder.{ts,js}")],
  migrationsTableName: "migrations",
};

export const AppDataSource = new DataSource(connectionOptions);

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    logger.info("✅ Database connected successfully!");
  } catch (error) {
    logger.info("❌ Database connection error: " + error);
    process.exit(1);
  }
};

export { connectionOptions };
