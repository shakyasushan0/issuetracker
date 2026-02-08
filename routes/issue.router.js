import express from "express";
import auth from "../middlewares/auth.js";
import {
  createIssue,
  getIssuesByProject,
  getMyIssues,
  reportedByMe,
  updateIssue,
  updateIssueStatus,
} from "../controllers/issue.controller.js";

const router = express.Router();

router.post("/", auth, createIssue);
router.get("/myissues", auth, getMyIssues);
router.get("/reportedbyme", auth, reportedByMe);
router.get("/:projectId", auth, getIssuesByProject);
router.put("/:id", auth, updateIssue);
router.put("/:id/updatestatus", auth, updateIssueStatus);

export default router;
