import foodPartnerModel from "../models/foodPartner.model.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authFoodPartnerMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await foodPartnerModel.findById(decoded.id);
    if (!foodPartner) {
      return res.status(401).json({ message: "Unauthorized. Please login as a food partner." });
    }
    req.foodPartner = foodPartner;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
};

export const authUserMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({
      message: "Please login first."
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized. Please login as a user." });
    }
    req.user = user;
    next();
  } catch(err){
    res.status(401).json({
      message: "Invalid token"
    })
  }
}

export const authAnyMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Please login first." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Try user first, then food partner
    const user = await userModel.findById(decoded.id);
    if (user) {
      req.user = user;
      return next();
    }

    const foodPartner = await foodPartnerModel.findById(decoded.id);
    if (foodPartner) {
      req.foodPartner = foodPartner;
      return next();
    }

    return res.status(401).json({ message: "Unauthorized." });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};