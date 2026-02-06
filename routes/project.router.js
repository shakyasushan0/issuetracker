import express from "express";
import {
  addMember,
  addProject,
  getProjectById,
  getProjects,
  removeMember,
} from "../controllers/project.controller.js";
import auth from "../middlewares/auth.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.post("/", auth, authorize(["admin"]), addProject);
router.get("/", auth, getProjects);
router.get("/:id", auth, getProjectById);
router.put("/:id/addmember", auth, authorize(["admin", "manager"]), addMember);
router.put(
  "/:id/removemember",
  auth,
  authorize(["admin", "manager"]),
  removeMember,
);
export default router;
