import db from "mysql2";
import { cnf } from "../helpeer/config.js";

const dataBase = db.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b439f2e618e26d",
  database: "heroku_eaa8275903daac8",
  password: "a68ca059",
  connectTimeout: 30000,
  connectionLimit: 10,
});
export default dataBase;

// mysql://b439f2e618e26d:a68ca059@us-cdbr-east-05.cleardb.net/heroku_eaa8275903daac8?reconnect=true

// LOCAL CONFIG FOR DATABASE

// const dataBase = db.createPool({
//   host: cnf.host,
//   user: cnf.user,
//   database: cnf.dataBase,
//   password: cnf.password,
//   connectTimeout: 30000,
//   connectionLimit: 10,
// });
