import express from "express";
import { getUserOrders } from "../controllers/userOrders.controller.js";
const router = express.Router();

router.get("/orders/:userId",getUserOrders);

export default router;