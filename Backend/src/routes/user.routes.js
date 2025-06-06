import express from "express";
const router = express.Router();
import { getAllUsers,registerUser,loginUser } from "../controllers/user.controller.js";


router.get("/users",getAllUsers);
router.post("/signup",registerUser);
router.post("/login",loginUser);

export default router;