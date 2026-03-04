import { User } from "../models/user.model.js";
import { randomBytes, createHmac } from "node:crypto";
import jwt from "jsonwebtoken";
import "dotenv/config";

//Register
export const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser)
    return res
      .status(400)
      .json({ error: `User with email ${email} already exists ` });

  const salt = randomBytes(256).toString("hex");

  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const user = await User.insertOne({
    fullName,
    email,
    password: hashedPassword,
    salt,
  });

  return res.status(201).json({ user });
};

//Login
export const logIn = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser)
    return res.status(400).json({ error: `Email ${email} not found` });

  const hashedPassword = existingUser.password;
  const existingSalt = existingUser.salt;

  const newHash = createHmac("sha256", existingSalt)
    .update(password)
    .digest("hex");

  if (newHash !== hashedPassword)
    return res.status(400).json({ error: "Invalid Password" });

  const payload = {
    id: existingUser._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY);

  return res.status(200).json({ status: "Success", data: { token } });
};
