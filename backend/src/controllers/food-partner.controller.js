import foodPartnerModel from "../models/foodPartner.model.js";

export const getFoodPartnerById = async (req, res) => {
    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);

    if(!foodPartner){
        return res.status(404).json({message: "Food partner not found"});
    }

    return res.status(200).json({
        message: "Food partner fetched successfully",
        foodPartner
    })
}