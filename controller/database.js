import db from "mysql2";
import { cnf } from "../../server/helpeer/config.js";

const dataBase = db.createPool({
  host: cnf.host,
  user: cnf.user,
  database: cnf.dataBase,
  password: cnf.password,
  connectTimeout: 30000,
  connectionLimit: 10,
});
export default dataBase;

// host: "localhost",
//   user: "nadish",
//   database: "nadish_site",
//   password: "Leno_1972",
//   connectTimeout: 30000,
//   connectionLimit: 10,
