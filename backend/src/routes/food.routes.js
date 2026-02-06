import express from "express"
import { createFood } from "../controllers/food.controller";
import { authFoodPartnerMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();
// /api/food 
// needs to be protected as users can't add food items
router.post("/", authFoodPartnerMiddleware, createFood);

export default router;