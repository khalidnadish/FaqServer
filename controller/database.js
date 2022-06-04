import db from "mysql2";

const dataBase = db.createPool({
  host: "localhost",
  user: "nadish",
  database: "nadish_site",
  password: "Leno_1972",
  connectTimeout: 30000,
  connectionLimit: 10,
});
export default dataBase;
