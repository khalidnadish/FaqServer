import db from "mysql2";
import { configData, mode } from "../helpeer/config.js";

let dataBase = "";
console.log(mode);
// const mode = "devlopment";

if (mode === "devlopment") {
  dataBase = db.createPool({
    host: "localhost",
    database: "nadish_site",
    user: "nadish",
    password: "Leno_1972",
    // connectTimeout: 30000,
    // connectionLimit: 10,
  });
}

if (mode === "production") {
  dataBase = db.createPool({
    host: "us-cdbr-east-05.cleardb.net",
    database: "heroku_eaa8275903daac8",
    user: "b439f2e618e26d",
    password: "a68ca059",
    // connectTimeout: 30000,
    // connectionLimit: 10,
  });
}

export { dataBase };

// mysql://b439f2e618e26d:a68ca059@us-cdbr-east-05.cleardb.net/heroku_eaa8275903daac8?reconnect=true
// CLEARDB_DATABASE_URL => mysql://[username]:[password]@[host]/[database name]?reconnect=true

// LOCAL CONFIG FOR DATABASE
