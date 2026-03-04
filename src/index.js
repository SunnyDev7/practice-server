import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import authRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

const PORT = 8000 ?? process.env.PORT;

try {
  await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log(`MongoDB Connected Successfully!`);
  });
} catch (error) {
  console.log(error);
}

app.get("/", (req, res) => {
  res.send("Welcome to practice server");
});

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server up on ${PORT}`);
});
