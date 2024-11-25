import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

mongoose
  .connect(process.env.MONGODB_URI, {
  })
  .then(() => app.listen(5000))
  .then(() => console.log("Connected to Database on localhost 5000"))
  .catch((err) => console.log(err));
