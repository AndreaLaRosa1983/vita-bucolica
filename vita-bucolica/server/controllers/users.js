import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import ConnectionLog from "../models/connectionLog.js"

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist." });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials." });
    const token = await jwt.sign({ email: oldUser.email, id: oldUser._id }, "test", {
      expiresIn: "1h",
    });
    
    const lastConnection = await ConnectionLog.find({ user: oldUser._id}).sort({createdAt:-1}).limit(1);
    if(!lastConnection)
      return res.status(404).json({ message: "Impossible to retrive last connection"})
      //connection Log
    const connectionLog = await ConnectionLog.create({
      user: oldUser._id,
      createdAt: new Date().toISOString()
    });
    if(!connectionLog)
    return res.status(404).json({ message: "Can't create a connection Log"})
    
    res.status(200).json({ result: oldUser, token, lastConnection });
  } catch (error) {
    res.status(500) - json({ message: "Something went wrong!" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, tags, isCreator } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exist." });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("here")
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      tags,
      isCreator
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    const connectionLog = await ConnectionLog.create({
      user: result._id,
      createdAt: new Date().toISOString()
    });
    /* if(!connectionLog) return res.status(404).json({ message: "Can't create a connection Log"}) */
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500) - json({ message: "Something went wrong!" });
  }
};
