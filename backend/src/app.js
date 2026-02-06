// create server
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import foodRoutes from "./routes/food.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!!");
});
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

export default app;
