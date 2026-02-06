import foodModel from "../models/food.model";

export const createFood = async (req,res) => {

    console.log(req.foodPartner);
    
    const {name, video, description, foodPartner} = req.body;

}