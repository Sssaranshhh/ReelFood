import foodPartnerModel from "../models/foodPartner.model.js";
import * as storageService from "../service/storage.service.js";
import { v4 as uuid } from "uuid";

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

export const uploadProfilePhoto = async (req, res) => {
    try {
        // Upload photo to storage service
        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());
        
        // Update food partner's profile photo
        const updatedPartner = await foodPartnerModel.findByIdAndUpdate(
            req.foodPartner._id,
            { profilePhoto: fileUploadResult.url },
            { new: true } // Return updated document
        );

        if (!updatedPartner) {
            return res.status(404).json({ message: "Food partner not found" });
        }

        return res.status(200).json({
            message: "Profile photo uploaded successfully",
            profilePhoto: fileUploadResult.url,
            foodPartner: updatedPartner
        });
    } catch (err) {
        console.error("Upload profile photo error:", err);
        return res.status(500).json({ message: err.message });
    }
}