import express from "express";
import cors from "cors";
import faqRoutes from "./routes/faq.js";
import userRoutes from "./routes/user.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-Parser";
import { cnf } from "./helpeer/config.js";

// dotenv.config();
const app = express();
app.use(cors());
// app.use(khalid());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const port = cnf.port || 3001;
app.use(khalid);
app.use("/faq", faqRoutes);
app.use("/user", userRoutes);
app.use(express.json());
app.use("/images", express.static("images"));
function khalid(req, res, next) {
  console.log("khalid");
  console.log("env : " + cnf.avatarUrl);
  next();
}

// let create_table =
//   "CREATE TABLE faq ( faqID  int AUTO_INCREMENT NOT NULL primary key, faq varchar(255),    creatormail varchar(255),    datestamp varchar(255)   )";
//   conectionDb.query(create_table, (err, results) => {
//     if (err) throw err

//  console.log("row create");
//  console.log(results)
// });

const server = app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});

server.timeout = 1000 * 60 * 10; // 10 minutes
