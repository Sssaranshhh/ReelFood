import foodModel from "../models/food.model.js";
import foodPartnerModel from "../models/foodPartner.model.js";
import * as storageService from "../service/storage.service.js"
import {v4 as uuid} from "uuid";

export const createFood = async (req, res) => {
    try {
        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())
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