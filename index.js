import express from "express";
import cors from "cors";
import faqRoutes from "./routes/faq.js";
import userRoutes from "./routes/user.js";

// import cookieParser from "cookie-Parser";
import { configData } from "./helpeer/config.js";

// dotenv.config();
const app = express();

app.use(cors());
// app.use(khalid());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser());

app.use(khalid);
app.use("/faq", faqRoutes);
app.use("/user", userRoutes);
app.use(express.json());
app.use("/images", express.static("images"));
function khalid(req, res, next) {
  console.log("khalid");
  console.log("env : " + configData.avatarUrl);
  next();
}

const server = app.listen(configData.port, () => {
  console.log(` app listening on port ${configData.port}  `);
});
787;
server.timeout = 1000 * 60 * 10; // 10 minutes
