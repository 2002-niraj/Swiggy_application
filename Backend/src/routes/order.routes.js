import express from "express";
const router = express.Router();
import { createOrder } from "../controllers/order.controller.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

router.post("/order",authenticateToken, createOrder) 

export default router;
