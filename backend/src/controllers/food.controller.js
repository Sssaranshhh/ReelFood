import foodModel from "../models/food.model.js";
import foodPartnerModel from "../models/foodPartner.model.js";
import * as storageService from "../service/storage.service.js"
import {v4 as uuid} from "uuid";
import path from "path";

export const createFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No video file received. Make sure you are sending a multipart/form-data request with a 'video' field." })
        }

        const ext = path.extname(req.file.originalname) || ".mp4";
        const fileName = `${uuid()}${ext}`;

        console.log("Uploading file to ImageKit:", req.file.originalname, "as", fileName, req.file.size, "bytes")
        const fileUploadResult = await storageService.uploadFile(req.file.buffer, fileName)
        console.log("Upload success, url:", fileUploadResult.url)


        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id
        })
        res.status(201).json({ message: "food created successfully", food: foodItem })
    } catch (err) {
        console.error("Create food error:", err)
        res.status(500).json({ message: err.message })
    }
}

export const getFood = async (req,res) => {
    const foodItems = await foodModel.find({}).populate('foodPartner', 'name contactName phone address');
    res.status(200).json({
        message: "Food fetched successfully",
        foodItems
    })
}