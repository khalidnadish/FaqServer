import express from "express";
import cors from "cors";
import faqRoutes from "./routes/faq.js";
import userRoutes from "./routes/user.js";

// import cookieParser from "cookie-Parser";
import { cnf } from "./helpeer/config.js";

// dotenv.config();
const app = express();
app.use(cors());
// app.use(khalid());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser());

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

const server = app.listen(process.env.PORT || 3001, () => {
  console.log(` app listening on port  `);
});

server.timeout = 1000 * 60 * 10; // 10 minutes
