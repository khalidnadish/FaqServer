import dotenv from "dotenv";
dotenv.config();

const mode = "devlopment";
// const mode = "production";
let configData = "";

if (mode === "production") {
  configData = {
    port: process.env.PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    base_url: process.env.BASE_URL + process.env.PORT + "/",
    avatarUrl: process.env.BASE_URL + process.env.PORT + "/images/avatar/",
  };
}

if (mode === "devlopment") {
  configData = {
    port: 3001,
    host: "localhost",
    user: "nadish",
    password: "Leno_1972",
    database: "nadish_site",
    base_url: "http://localhost:3001/",
    avatarUrl: "http://localhost:3001/images/avatar/",
  };
}
export { configData, mode };
