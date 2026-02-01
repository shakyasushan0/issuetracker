import express from "express";
import {
  addProject,
  getProjectById,
  getProjects,
} from "../controllers/project.controller.js";
import auth from "../middlewares/auth.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.post("/", auth, authorize(["admin"]), addProject);
router.get("/", auth, getProjects);
router.get("/:id", auth, getProjectById);

export default router;
