import dotenv from "dotenv";
dotenv.config();

export const cnf = {
  port: process.env.PORT,
  avatarUrl: process.env.AVATAR_URL,
};

// export const avatarUrl = process.env.AVATAR_URL;
// export const port = process.env.PORT;
