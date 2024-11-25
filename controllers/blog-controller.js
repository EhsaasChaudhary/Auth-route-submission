import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";
import { validationResult } from "express-validator";

export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    if (!blogs.length) {
      return res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json({ blogs });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching blogs", error: err.message });
  }
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const existingUser = await User.findById(user);
    if (!existingUser)
      return res.status(400).json({ message: "Unable to find user by ID" });

    const blog = new Blog({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding blog", error: err.message });
  }
};

export const updateBlog = async (req, res, next) => {
  const blogId = req.params.id;
  const { title, description } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { title, description },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error updating blog", error: err.message });
  }
};

export const getBlogById = async (req, res, next) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "No Blog found" });
    }
    return res.status(200).json({ blog });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching blog", error: err.message });
  }
};

export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findByIdAndDelete(blogId).populate("user");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.user.blogs.pull(blog);
    await blog.user.save();

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error deleting blog", error: err.message });
  }
};

export const getBlogByUid = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const userBlogs = await User.findById(userId).populate("blogs");
    if (!userBlogs) {
      return res.status(404).json({ message: "No blogs found for this user" });
    }
    return res.status(200).json({ blogs: userBlogs.blogs });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching user's blogs", error: err.message });
  }
};
