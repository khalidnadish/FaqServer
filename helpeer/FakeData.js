import express from "express";
import dataBase from "../controller/database.js";
// const cnf = require("./helpeer/config");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = 3002;
app.use(express.json());

const server = app.listen(port, () => {
  console.log(` app listening on port ${port}`);
  ansewrData();
});

function ansewrData() {
  console.log("user data");

  for (let index = 0; index < 10000; index++) {
    console.log("row create   " + index);
    let faqid = randomFaq();
    let userid = randomUser();
    let answer = `Fake data with user : ${userid} and faq : ${faqid}`;

    let sq = "INSERT INTO answers  (userid, faqid, answer) VALUES (?,?,?)";

    dataBase.execute(sq, [userid, faqid, answer], (err, results) => {
      if (err) console.log(err);
      console.log("row create   ");
      console.log("faqid " + faqid);
      console.log("userid " + userid);
      // res.send({ msgs: true });
    });
  }
}

function randomFaq() {
  let faqidMax = 50;
  let faqidMin = 1;
  let faqid = Math.floor(Math.random() * (faqidMax - faqidMin) + faqidMin);
  return faqid;
}

function randomUser() {
  let useridMax = 50;
  let useridMin = 1;
  let userid = Math.floor(Math.random() * (useridMax - useridMin) + useridMin);
  return userid;
}
