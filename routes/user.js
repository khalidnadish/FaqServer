import express from "express";
import multer from "multer";

// import cookieParser from "cookie-Parser";

import {
  getAlluser,
  createUser,
  loginUser,
  avatarUpload,
  showFlloer,
} from "../controller/userControl.js";

const router = express.Router();
// app.use("../images", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    console.log(file.path);

    cb(null, "./images/avatar/");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", createUser);
router.post("/login", loginUser);

router.post("/upload/:userId", upload.single("avatar"), avatarUpload);
// router.get("/getall",(err,data)=>{
//  if(err){
//      console.log(err)
//      return;
//  }
//  getAll

// });

router.get("/", getAlluser);
router.get("/showflower/:userId", showFlloer);

// router.post("/1000", newUser);

export default router;
