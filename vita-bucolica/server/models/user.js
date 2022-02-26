import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tags: { type: [String], required: true },
  id: { type: String },
  isCreator: { type: Boolean, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
