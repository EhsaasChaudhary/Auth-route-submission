import express from "express";
import {
  getAllBlogs,
  addBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
  getBlogByUid,
} from "../controllers/blog-controller.js";
import { authenticate } from "../utils/authenticate.js";
import { check } from "express-validator";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post(
  "/",
  [
    check("title").not().isEmpty().withMessage("Title is required"),
    check("description").not().isEmpty().withMessage("Description is required"),
    check("image").not().isEmpty().withMessage("Image URL is required"),
    check("user").isMongoId().withMessage("Valid user ID is required"),
  ],
  authenticate,
  addBlog
);
blogRouter.put(
  "/:id",
  [
    check("title")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Title must not be empty"),
    check("description")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Description must not be empty"),
  ],
  authenticate,
  updateBlog
);
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/:id", authenticate, deleteBlog);
blogRouter.get("/user/:id", authenticate, getBlogByUid);

export default blogRouter;
