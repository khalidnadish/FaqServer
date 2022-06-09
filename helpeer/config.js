import dotenv from "dotenv";
dotenv.config();

export const cnf = {
  port: process.env.PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 30000,
  connectionLimit: 10,
  avatarUrl: process.env.AVATAR_URL,
};

// export const avatarUrl = process.env.AVATAR_URL;
// export const port = process.env.PORT;
