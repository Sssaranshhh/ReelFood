import express from "express";
import { authFoodPartnerMiddleware } from "../middlewares/auth.middleware.js";
import { getFoodPartnerById, uploadProfilePhoto } from "../controllers/food-partner.controller.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
});

/*GET api/food-partner/:id [public - anyone can view a store]*/
router.get("/:id", getFoodPartnerById);

/*POST api/food-partner/upload-photo [protected - food partner only]*/
router.post("/upload-photo", authFoodPartnerMiddleware, upload.single("photo"), uploadProfilePhoto);

export default router;