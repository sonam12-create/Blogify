// backend/models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog", // This references the Blog model
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
