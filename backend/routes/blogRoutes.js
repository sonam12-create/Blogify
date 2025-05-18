import express from "express";
import {
  saveDraft,
  publishBlog,
  getAllBlogs,
  getBlogById,
  getUserBlogs,
  deleteBlog,
} from "../controllers/blogControllers.js";
import authenticateUser from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
const blogRouter = express.Router();

blogRouter.post(
  "/save-draft",
  authenticateUser,
  upload.single("image"),
  saveDraft
);
blogRouter.post(
  "/publish",
  authenticateUser,
  upload.single("image"),
  publishBlog
);
blogRouter.get("/user-blogs", authenticateUser, getUserBlogs);
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.get("/user-blogs/:id", authenticateUser, getBlogById);
blogRouter.delete("/delete/:id", authenticateUser, deleteBlog);

export default blogRouter;
