import { Pool } from "pg";
import { dbDatabase, dbHost, dbPassword, dbPort, dbUser, } from "./env"

export const pool = new Pool({
  host: dbHost,
  port: Number(dbPort),
  user: dbUser,
  password: dbPassword,
  database: dbDatabase,
});
