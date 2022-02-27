import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Log from "../models/log.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist." });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials." });
    const token = await jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      "test",
      {
        expiresIn: "1h",
      }
    );
    const log = await Log.create({
      user: oldUser._id,
      createdAt: new Date().toISOString(),
      log: "SIGNIN",
    });

    if (!log) return res.status(404).json({ message: "Can't create a log" });
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500) - json({ message: "Something went wrong!" });
  }
};

export const signup = async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    tags,
    isCreator,
  } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exist." });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      tags,
      isCreator,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    const LogSignUp = await Log.create({
      user: result._id,
      createdAt: new Date().toISOString(),
      log: "SIGNUP",
    });
    const LogNotification = await Log.create({
      user: result._id,
      createdAt: new Date().toISOString(),
      log: "NOTIFICATIONOK",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500) - json({ message: "Something went wrong!" });
  }
};

export const update = async (req, res) => {
  const user = req.body;
  try {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const result = await User.findByIdAndUpdate(user._id, { ...user, password:hashedPassword });
    const newUser = await User.findOne({ _id : user._id });
    
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result:newUser, token });
  } catch (error) {
    res.status(500) - json({ message: "Something went wrong!" });
  }
};
// continua da qui 
export const updatePassword = async (req, res) => {
  const user = req.body;
  try {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const result = await User.findByIdAndUpdate(user._id, { ...user, password:hashedPassword });
    const newUser = await User.findOne({ _id : user._id });

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result:newUser, token });
  } catch (error) {
    res.status(500) - json({ message: "Something went wrong!" });
  }
};