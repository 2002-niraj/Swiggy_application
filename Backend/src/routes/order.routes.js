import express from "express";
const router = express.Router();
import { createOrder } from "../controllers/order.controller.js";

router.post("/order",createOrder) 

export default router;
