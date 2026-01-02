import express from "express";
import connectDB from "./db/connect.js";
import userRouter from "./routes/user.router.js";

const app = express();
app.use(express.json());
connectDB().then(() => {
  app.listen(3000, () => {
    console.log(`Server is up and running on http://localhost:3000`);
  });
});

app.use("/api/auth", userRouter);
