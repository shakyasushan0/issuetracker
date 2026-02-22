import express from "express";
import connectDB from "./db/connect.js";
import userRouter from "./routes/user.router.js";
import projectRouter from "./routes/project.router.js";
import issueRouter from "./routes/issue.router.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
//app.use(auth)
connectDB().then(() => {
  app.listen(3000, () => {
    console.log(`Server is up and running on http://localhost:3000`);
  });
});

app.use("/api/auth", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/issues", issueRouter);
