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

  for (let index = 1; index <= 50; index++) {
    console.log("row create   " + index);
    let catid = randomCat();
    let sql = `UPDATE nadish_site.faq SET catid=${catid}  where faqid=${index};`;

    dataBase.execute(sql, (err, results) => {
      if (err) console.log(err);
      console.log("row create   ");
      console.log("catid " + catid);
    });
  }
}

function randomCat() {
  let faqidMax = 17;
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
