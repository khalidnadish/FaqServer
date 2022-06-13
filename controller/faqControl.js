import { dataBase } from "../controller/database.js";
import { configData } from "../helpeer/config.js";

export function getAll(req, res) {
  console.log(req.cookies);
  res.cookie("sky", "nadish", { httpOnly: true });

  const newsqlStatment = `Select f.faq, f.userid, f.sututes, f.create_at, f.update_at, a.faqid, count(*) As rowcount,
  u1.userid As userid, u1.username As autherName, u1.avatar, category.catName, category.catid,
  f.faqid As faqid1 From faq f 
  Inner Join answers a On f.faqid = a.faqid 
  Inner Join user u1 On f.userid = u1.userid 
  Inner Join category On f.catId = category.catid 
  Group By f.faq, f.userid, f.sututes, f.create_at, 
  f.update_at, a.faqid, u1.userid, u1.username, u1.avatar, 
  category.catName, category.catid, f.faqid`;

  let sqlQuryWithCount = `SELECT f.faqid, f.faq, f.userid, f.sututes, f.create_at, f.update_at,
   a.faqid, count(*) as rowcount, u1.userid  AS userid, u1.username AS autherName, u1.avatar
  FROM faq f 
    INNER JOIN answers a ON ( f.faqid = a.faqid  )  
    INNER JOIN user u1 ON ( f.userid = u1.userid  )  
    GROUP BY 
     f.faqid, f.faq, f.userid, f.sututes, f.create_at, f.update_at, 
     a.faqid, u1.userid, u1.username, u1.avatar`;

  dataBase.execute(newsqlStatment, (err, data) => {
    if (err) {
      console.log(err);
    }
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

  console.log("env user: " + configData.avatarUrl);

  let sqlQury = `SELECT faq.faqid ,faq.create_at,faq.faq,user.username,user.email AS email ,user.avatar AS avatar 
                 FROM 
                    faq 
                 INNER JOIN 
                    user
                 ON 
                  faq.faqid = user.userid 
                where faq.faqid=?`;

  dataBase.query(sqlQury, [idToGet], (err, data) => {
    if (err) {
      console.log(err);
    }

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

  console.log("env user: " + configData.avatarUrl);
  let queryCount = `SELECT count(ansid) as count FROM
                  answers s where s.faqid=1`;

  let sqlQuery = `SELECT a.ansid, a.userid, a.faqid, a.answer, a.create_at, a.update_at, u1.userid, u1.username, u1.avatar, f1.faqid
  FROM answers a 
    INNER JOIN user u1 ON ( a.userid = u1.userid  )  
    INNER JOIN faq f1 ON ( a.faqid = f1.faqid  )  
  WHERE a.faqid = ?`;

  dataBase.query(sqlQuery, [idToGet], (err, data) => {
    if (err) {
      console.log(err);
    }

    console.log("data is :" + req.params.faqid);
    console.log(data);

    res.status(200).send({ data });
    // res.json({ data });
  });
}
export function getAnswerCountByfaqid(req, res) {
  const idToGet = parseInt(req.params.faqid);

  let queryCount = `SELECT count(ansid) as rowcount FROM
                    answers s where s.faqid=?`;

  dataBase.query(queryCount, [idToGet], (err, data) => {
    if (err) {
      console.log(err);
    }

    console.log("data is :" + req.params.faqid);
    console.log("Row count :" + data);

    res.status(200).send({ data });
    // res.json({ data });
  });
}

export function getCategory(req, res) {
  // let sqlQury = `SELECT *  FROM category`;
  const sqlSelect = `SELECT  c.catid, c.catName,  count(*) faqrowcount
FROM category c `;
  const sqlJoin = ` JOIN faq f ON ( c.catid = f.catId  )  `;
  const sqlGroup = ` GROUP BY  c.catid, c.catName,  f.catId`;
  const sqlWhere = ``;
  const sqlOreder = ` order by faqrowcount desc`;

  const catSqlQury = sqlSelect + sqlJoin + sqlGroup + sqlWhere + sqlOreder;

  dataBase.execute(catSqlQury, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.status(200).send(data);
  });
}

export function getAllByGroup(req, res) {
  console.log(req.cookies);
  res.cookie("sky", "nadish", { httpOnly: true });

  const filtercodeIs = parseInt(req.params.filterx);
  console.log("filter code >>>>>> :" + filtercodeIs);

  const newsqlStatment = `Select f.faq, f.userid, f.sututes, f.create_at, f.update_at, a.faqid, count(*) As rowcount,
  u1.userid As userid, u1.username As autherName, u1.avatar, category.catName, category.catid,
  f.faqid As faqid1 From faq f 
  Inner Join answers a On f.faqid = a.faqid 
  Inner Join user u1 On (f.userid = u1.userid )
  Inner Join category On (f.catId = category.catid )
  where f.catid=?
  Group By f.faq, f.userid, f.sututes, f.create_at, 
  f.update_at, a.faqid, u1.userid, u1.username, u1.avatar, 
  category.catName, category.catid, f.faqid`;

  let sqlQuryWithCount = `SELECT f.faqid, f.faq,f.catId,f.userid, f.sututes, f.create_at, f.update_at,
  a.faqid, count(*) as rowcount, u1.userid  AS userid, u1.username AS autherName, u1.avatar
 FROM faq f 
   INNER JOIN answers a ON ( f.faqid = a.faqid  )  
   INNER JOIN user u1 ON ( f.userid = u1.userid  )  
  where f.catid=?
 GROUP BY f.faqid, f.faq, f.userid, f.sututes, f.create_at, f.update_at, a.faqid, u1.userid, u1.username, u1.avatar
 ;
`;
  dataBase.execute(newsqlStatment, [filtercodeIs], (err, data) => {
    if (err) {
      console.log(err);
    }
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
