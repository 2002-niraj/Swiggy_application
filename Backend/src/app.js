import express from "express";
import userRoute from "./routes/user.routes.js";
import orderRoute from "./routes/order.routes.js";
import userOrdersRoute from "./routes/userOrders.routes.js";
import cors from "cors"
const app = express();


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true 
}));
app.use(express.json());
app.use("/api",userRoute);
app.use("/api",orderRoute);
app.use("/api",userOrdersRoute);


export default app;