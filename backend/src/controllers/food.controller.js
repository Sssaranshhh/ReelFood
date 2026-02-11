import foodModel from "../models/food.model.js";
import * as storageService from "../service/storage.service.js"
import {v4 as uuid} from "uuid";

export const createFood = async (req,res) => {

    // console.log(req.foodPartner);
    // console.log(req.body)
    // console.log(req.file)

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

    // console.log(fileUploadResult)
    
    const foodItem = await  foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    // res.send("Food created successfully.")
    res.status(201).json({
        message: "food created successfully",
        food: foodItem
    })

}

export const getFood = async (req,res) => {
    const foodItems = await foodModel.find({});
    res.status(200).json({
        message: "Food fetched successfully",
        foodItems
    })
}