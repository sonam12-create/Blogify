import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/userControllers.js";
import authenticateUser from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", authenticateUser, getProfile);

export default userRouter;
