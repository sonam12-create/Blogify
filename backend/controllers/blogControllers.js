import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

const uploadImageToCloudinary = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "blog-assign",
  });
  return result.secure_url;
};

export const saveDraft = async (req, res) => {
  try {
    const { blogId, title, content, tags } = req.body;
    const file = req.file?.path;

    let mediaUrl = "";

    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(userId);

    let existingBlog;
    if (blogId) {
      existingBlog = await Blog.findOne({ _id: blogId, author: req.userId });
      if (!existingBlog) {
        return res.status(404).json({ message: "Draft not found." });
      }
    }

    if (file) {
      mediaUrl = await uploadImageToCloudinary(file);
    } else if (existingBlog) {
      mediaUrl = existingBlog.mediaUrl;
    }

    const update = {
      title,
      authorName: user.name,
      content,
      tags: tags || [],
      status: "draft",
      mediaUrl: mediaUrl || "",
    };

    let blog;
    if (blogId) {
      blog = await Blog.findOneAndUpdate(
        { _id: blogId, author: req.userId },
        update,
        { new: true }
      );
    } else {
      blog = new Blog({
        title,
        authorName: user.name,
        content,
        tags: tags || [],
        status: "draft",
        mediaUrl,
        author: req.userId,
      });

      const savedBlog = await blog.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { blogs: blog._id },
      });
    }

    res.status(200).json({ success: true, message: "Draft updated", blog });
  } catch (error) {
    console.error("Error saving draft:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const publishBlog = async (req, res) => {
  try {
    const { blogId, title, content, tags } = req.body;
    const file = req.file?.path;

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(userId);

    let mediaUrl = "";

    let existingBlog;
    if (blogId) {
      existingBlog = await Blog.findOne({ _id: blogId, author: req.userId });
      if (!existingBlog) {
        return res.status(404).json({ message: "Draft not found to publish." });
      }
    }

    if (file) {
      mediaUrl = await uploadImageToCloudinary(file);
    } else if (existingBlog) {
      mediaUrl = existingBlog.mediaUrl;
    }

    const payload = {
      title,
      autherName: user.name,
      content,
      tags: tags || [],
      status: "published",
      mediaUrl: mediaUrl || "",
    };

    let blog;
    if (blogId) {
      blog = await Blog.findOneAndUpdate(
        { _id: blogId, author: req.userId },
        payload,
        { new: true }
      );
    } else {
      blog = new Blog({
        author: req.userId,
        ...payload,
      });
      await blog.save();

      await User.findByIdAndUpdate(req.userId, {
        $push: { blogs: blog._id },
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blog published", blog });
  } catch (error) {
    console.error("Error publishing blog:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "published" });
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Optional: If draft, show only to author
    if (blog.status === "draft") {
      const userId = req.userId;
      if (!userId || userId !== blog.author._id.toString()) {
        return res
          .status(403)
          .json({ message: "Unauthorized access to draft" });
      } else if (userId === blog.author._id.toString()) {
        // If the user is the author, return the draft
        return res.status(200).json(blog);
      }
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.userId });
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const blog = await Blog.findOneAndDelete({
      _id: blogId,
    }).populate("author", "name email");

    const user = await User.findById(userId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.author._id.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await User.findByIdAndUpdate(userId, {
      $pull: { blogs: blogId },
    });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server error" });
  }
};
