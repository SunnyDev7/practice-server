import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

const PORT = 8000 ?? process.env.PORT;

try {
  await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log(`MongoDB Connected Successfully!`);
  });
} catch (error) {
  console.log(error);
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to practice server");
});

app.listen(PORT, () => {
  console.log(`Server up on ${PORT}`);
});
