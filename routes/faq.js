import express from "express";

import {
  getAll,
  getfaqid,
  getAnswerByfaqid,
  getAnswerCountByfaqid,
  getCategory,
  getAllByGroup,
} from "../controller/faqControl.js";

const router = express.Router();

router.get("/", getAll);
router.get("/category", getCategory);
router.get("/bygroup/:filterx", getAllByGroup);
router.get("/:faqid", getfaqid);
router.get("/AnswerByfaqid/:faqid", getAnswerByfaqid);
router.get("/getAnswerCountByfaqid/:faqid", getAnswerCountByfaqid);

export default router;
