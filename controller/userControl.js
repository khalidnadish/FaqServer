import dataBase from "./database.js";
import { cnf } from "../helpeer/config.js";

export function newUser(req, res) {
  const { username, email, password, phone } = req.body;
  console.log("email row ais : " + email);

  console.log("row ais : " + ckeckUser(email));

  let inset_date = `INSERT INTO user SET username=?,email=?,password=?,phone=?`;
  dataBase.execute(
    inset_date,
    [username, email, password, phone],
    (err, results) => {
      if (err) throw err;

      console.log("row create  dfsfsfs");

      // console.log(results);
      res.send({ msgs: true });
    }
  );
}

function ckeckUser(email) {
  // let xx = "";
  let chek_data = `SELECT email from user WHERE email=?`;
  let xx = dataBase.execute(chek_data, [email], (err, results) => {
    if (err) throw err;
    console.log("dublicate row   :" + results.length);
    xx = results.length;
    // return xx;
  });
  return xx;
}

export function getAlluser(req, res) {
  console.log(req.cookies);
  // res.cookie("sky", "nadish", { httpOnly: true });

  dataBase.execute("SELECT * FROM user", (err, data) => {
    if (err) throw err;
    console.log(data);

    res.send({ data });
  });
}

export function createUser(req, res) {
  const { username, email, password, phone } = req.body;
  dataBase.execute(
    `SELECT email FROM user WHERE email=?`,
    [email],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        console.log("exist");
        return res.send({ message: false });
      }

      let inset_date = `INSERT INTO user SET username=?,email=?,password=?,phone=?`;
      dataBase.execute(
        inset_date,
        [username, email, password, phone],
        (err, results) => {
          if (err) throw err;

          res.send({ message: true });
        }
      );
    }
  );
}

export function avatarUpload(req, res) {
  console.log(" userId is " + req.params.userId);
  // let avatraPath = "http://localhost:3001/images/avatar/";
  let avatarImgae = cnf.avatarUrl + req.file.filename;
  const sqlQuery = `UPDATE user
  SET avatar = ?  WHERE userid = ?`;

  // TODO:   check if the user exisit or not problem : image dublicated

  dataBase.execute(sqlQuery, [avatarImgae, req.params.userId], (err, data) => {
    if (err) throw err;
    console.log({ data });
    console.log("env user: " + cnf.avatarUrl);
    res.send({ data });
  });
}

export function loginUser(req, res) {
  const { email, password } = req.body;
  dataBase.execute(
    `SELECT email FROM user WHERE email=? and password=?`,
    [email, password],
    (error, result) => {
      if (error) {
        console.log(error);
      }

      if (result.length === 0) {
        console.log("Not Exist");
        return res.send({ message: false });
      }
      return res.send({ message: true });
    }
  );
}

export function showFlloer(req, res) {
  console.log(" userId is " + req.params.userId);

  let userId = req.params.userId;

  let sqlQuery = `SELECT m.userid, m.followuser, linkwith_main.username main_user,
                          linkwith_flower.username, linkwith_flower.avatar
      FROM nadish_site.myflower m 
        INNER JOIN nadish_site.user linkwith_main ON ( m.userid = linkwith_main.userid  )  
        INNER JOIN nadish_site.user linkwith_flower ON ( m.followuser = linkwith_flower.userid  )  
      WHERE 
        m.userid = ?
      GROUP BY 
        m.userid, m.followuser, linkwith_main.username, linkwith_flower.username, linkwith_flower.avatar`;

  dataBase.execute(sqlQuery, [userId], (err, data) => {
    if (err) throw err;
    console.log({ data });
    console.log("floower  user: " + userId);
    res.send(data);
  });
}

export default {
  newUser,
  getAlluser,
  createUser,
  loginUser,
  avatarUpload,
  showFlloer,
};
