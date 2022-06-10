import dataBase from "../controller/database.js";
import express from "express";

import { cnf } from "../helpeer/config.js";

export function getAll(req, res) {
  console.log(req.cookies);
  res.cookie("sky", "nadish", { httpOnly: true });
  let sqlQuryWithCount = `SELECT f.faqid, f.faq, f.userid, f.sututes, f.create_at, f.update_at,
   a.faqid, count(*) as rowcount, u1.userid  AS userid, u1.username AS autherName, u1.avatar
  FROM nadish_site.faq f 
    INNER JOIN nadish_site.answers a ON ( f.faqid = a.faqid  )  
    INNER JOIN nadish_site.user u1 ON ( f.userid = u1.userid  )  
  GROUP BY f.faqid, f.faq, f.userid, f.sututes, f.create_at, f.update_at, a.faqid, u1.userid, u1.username, u1.avatar`;

  let sqlQury = `SELECT faq.faqid ,faq.create_at,faq.faq,user.username AS autherName ,user.avatar AS avatar ,user.userid AS userid
                 FROM 
                    faq 
                 INNER JOIN 
                    user
                 ON 
                   faq.userid = user.userid ORDER BY faq.faqid`;

  dataBase.execute(sqlQuryWithCount, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.status(200).send({ data });
    // res.send({ data });
  });
}

export function getfaqid(req, res) {
  // let dd = res.send("dadadad    :" + req.params.faq);
  console.log("we in");
  console.log(typeof req.params.faqid);
  const idToGet = parseInt(req.params.faqid);

  console.log("env user: " + cnf.avatarUrl);

  let sqlQury = `SELECT faq.faqid ,faq.create_at,faq.faq,user.username,user.email AS email ,user.avatar AS avatar 
                 FROM 
                    faq 
                 INNER JOIN 
                    user
                 ON 
                  faq.faqid = user.userid 
                where faq.faqid=?`;

  dataBase.query(sqlQury, [idToGet], (err, data) => {
    if (err) throw err;

    console.log("data is :" + req.params.faqid);
    console.log(data);

    res.status(200).send({ data });
    // res.json({ data });
  });
}

export function getAnswerByfaqid(req, res) {
  // let dd = res.send("dadadad    :" + req.params.faq);
  console.log("we in");
  console.log(typeof req.params.faqid);
  const idToGet = parseInt(req.params.faqid);

  console.log("env user: " + cnf.avatarUrl);
  let queryCount = `SELECT count(ansid) as count FROM
                  nadish_site.answers s where s.faqid=1`;

  let sqlQuery = `SELECT a.ansid, a.userid, a.faqid, a.answer, a.create_at, a.update_at, u1.userid, u1.username, u1.avatar, f1.faqid
  FROM nadish_site.answers a 
    INNER JOIN nadish_site.user u1 ON ( a.userid = u1.userid  )  
    INNER JOIN nadish_site.faq f1 ON ( a.faqid = f1.faqid  )  
  WHERE a.faqid = ?`;

  dataBase.query(sqlQuery, [idToGet], (err, data) => {
    if (err) throw err;

    console.log("data is :" + req.params.faqid);
    console.log(data);

    res.status(200).send({ data });
    // res.json({ data });
  });
}
export function getAnswerCountByfaqid(req, res) {
  const idToGet = parseInt(req.params.faqid);

  let queryCount = `SELECT count(ansid) as rowcount FROM
                    nadish_site.answers s where s.faqid=?`;

  dataBase.query(queryCount, [idToGet], (err, data) => {
    if (err) throw err;

    console.log("data is :" + req.params.faqid);
    console.log("Row count :" + data);

    res.status(200).send({ data });
    // res.json({ data });
  });
}

export function getCategory(req, res) {
  let sqlQury = `SELECT *  FROM category`;
  let catSqlQury = `SELECT   c.catid, c.catName,     count(*) faqrowcount
  FROM nadish_site.category c 
       JOIN nadish_site.faq f ON ( c.catid = f.catId  )  
  GROUP BY  c.catid, c.catName,  f.catId
  order by faqrowcount desc`;

  dataBase.execute(catSqlQury, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.status(200).send(data);
  });
}

export function getAllByGroup(req, res) {
  console.log(req.cookies);
  res.cookie("sky", "nadish", { httpOnly: true });

  const filtercodeIs = parseInt(req.params.filterx);
  console.log("filter code >>>>>> :" + filtercodeIs);
  let sqlQuryWithCount = `SELECT f.faqid, f.faq,f.catId,f.userid, f.sututes, f.create_at, f.update_at,
  a.faqid, count(*) as rowcount, u1.userid  AS userid, u1.username AS autherName, u1.avatar
 FROM nadish_site.faq f 
   INNER JOIN nadish_site.answers a ON ( f.faqid = a.faqid  )  
   INNER JOIN nadish_site.user u1 ON ( f.userid = u1.userid  )  
  where f.catid=?
 GROUP BY f.faqid, f.faq, f.userid, f.sututes, f.create_at, f.update_at, a.faqid, u1.userid, u1.username, u1.avatar
 ;
`;
  dataBase.execute(sqlQuryWithCount, [filtercodeIs], (err, data) => {
    if (err) throw err;
    console.log(data);
    res.status(200).send({ data });
    // res.send({ data });
  });
}

export default {
  getAll,
  getfaqid,
  getAnswerByfaqid,
  getAnswerCountByfaqid,
  getCategory,
  getAllByGroup,
};
