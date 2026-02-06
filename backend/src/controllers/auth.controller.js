import userModel from "../models/user.model.js";
import foodPartnerModel from "../models/foodPartner.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });
  if (isUserAlreadyExists) {
    return res.status(400).json({ message: "User already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User generated successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
};

export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
};

export const registerFoodPartner = async (req, res) => {
  const { name, email, password } = req.body;

  const isFoodPartnerAlreadyRegistered = await foodPartnerModel.findOne({
    email,
  });

  if (isFoodPartnerAlreadyRegistered) {
    return res.status(400).json({ message: "Food Partner already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "Food Partner registered successfully",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
};

export const loginFoodPartner = async (req, res) => {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({ email });

  if (!foodPartner) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  const isPasswordMatch = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  return res.status(200).json({message: "Food Partner login successful"})
};

export const logoutFoodPartner = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({message: "Food Partner logged out successfully"})
}