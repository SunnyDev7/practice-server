import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unqiue: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    minlength: [3, "Password should be minimum of 3 or more characters"],
  },
});

export const User = mongoose.model("User", UserSchema);
