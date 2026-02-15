import mongoose from "mongoose";

const foodPartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactName: {
    type: String,
    required: true 
  },
  phone: {
    type: String,
    required: true
  }, address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    required: false // Optional field for profile photo URL
  },
});

const foodPartnerModel = mongoose.model("foodpartner", foodPartnerSchema);

export default foodPartnerModel;