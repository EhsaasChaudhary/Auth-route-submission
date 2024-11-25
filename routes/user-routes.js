import express from "express";
import { check } from "express-validator";
import { getAllUsers, signUp, login } from "../controllers/user-controller.js";
import { authenticate } from "../utils/authenticate.js";

const userRouter = express.Router();

userRouter.get("/getalluser", authenticate, getAllUsers);
userRouter.post(
  "/signup",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Enter a valid email"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  signUp
);
userRouter.post(
  "/login",
  [
    check("email").isEmail().withMessage("Enter a valid email"),
    check("password").notEmpty().withMessage("Password cannot be empty"),
  ],
  login
);

export default userRouter;
