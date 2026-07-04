import express from "express";
import { createFood, getFood } from "../controllers/food.controller.js";
import { authFoodPartnerMiddleware } from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
});
// /api/food
// only POST (creating food) is restricted to food partners
router.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood); 

/*GET api/food [public - anyone can browse the feed]*/
router.get("/", getFood)

export default router;