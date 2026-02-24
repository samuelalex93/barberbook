import "dotenv";

export const {
  PORT: port= "3000",
  DB_HOST: dbHost,
  DB_PORT: dbPort,
  DB_USER: dbUser,
  DB_PASS: dbPassword,
  DB_NAME: dbDatabase,
  JWT_SECRET: jwtSecret = "kfhieo4h45ndlksh4546"
} = process.env