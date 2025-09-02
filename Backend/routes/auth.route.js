import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controller/auth.controller.js";
const router = express.Router();

// REGISTER ROUTE
router.post("/register", registerUser);

//LOGIN ROUTE
router.post("/login", loginUser);

// LOGOUT
router.get("/logout", logoutUser);

export default router;