import { User } from "../models/user.model.js";
import { randomBytes, createHmac } from "node:crypto";
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

  return res.status(200).json({ user });
};
