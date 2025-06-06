import express from "express";
import userRoute from "./routes/user.routes.js";
import cors from "cors"
const app = express();


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true 
}));
app.use(express.json());
app.use("/api",userRoute);


export default app;