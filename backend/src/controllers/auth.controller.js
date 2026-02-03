import userModel from "../models/user.model";
import bcrypt from "bcrypt.js";
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

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
    "e2d40c5e1bcb739aac4c90d4f1c818f4",
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User generated successfully",
    
  })
};
