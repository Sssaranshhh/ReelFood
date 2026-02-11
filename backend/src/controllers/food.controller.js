import foodModel from "../models/food.model.js";
import * as storageService from "../service/storage.service.js"
import {v4 as uuid} from "uuid";

export const createFood = async (req,res) => {

    console.log(req.foodPartner);
    console.log(req.body)
    console.log(req.file)

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

    console.log(fileUploadResult)

    res.send("Food created successfully.")
    // const {name, video, description, foodPartner} = req.body;

}