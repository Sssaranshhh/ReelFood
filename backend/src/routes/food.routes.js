import express from "express";
import { createFood } from "../controllers/food.controller.js";
import { authFoodPartnerMiddleware } from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
});
// /api/food
// needs to be protected as users can't add food items
router.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood); 
//name inside single i.e video is just a name and should be same in req

export default router;
