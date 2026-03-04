import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  register,
  logIn,
  getLoggedInUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", logIn);
router.get("/users", getLoggedInUser);

export default router;
