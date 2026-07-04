// create server
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import foodRoutes from "./routes/food.routes.js";
import foodPartnerRoutes from "./routes/food-partner.routes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
let frontendOrigin = (process.env.FRONTEND_URL || "http://localhost:5173").trim();
if (frontendOrigin.endsWith("/")) {
  frontendOrigin = frontendOrigin.slice(0, -1);
}

app.use(cors({
  origin: frontendOrigin,
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());

// Serve local videos statically
app.use("/videos", express.static(path.join(__dirname, "../../videos")));

app.get("/", (req, res) => {
  res.send("Hello World!!");
});
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);

export default app;

