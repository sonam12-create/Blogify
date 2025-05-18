// backend/models/blogModel.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",      // Reference to the user who created the blog
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  tags: {
    type: [String],
    default: [],
  },

  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },

  mediaUrl: {
    type: String,
    default: "",
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt
});

export default mongoose.model("Blog", blogSchema);
