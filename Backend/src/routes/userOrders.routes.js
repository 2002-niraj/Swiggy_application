import express from "express";
import { getUserOrders } from "../controllers/userOrders.controller.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/orders/:userId",authenticateToken, getUserOrders);

export default router;