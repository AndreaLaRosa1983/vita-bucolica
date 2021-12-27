import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to Vita Bucolica API");
});
const CONNECTION_URL = "";

const PORT = process.env.PORT || 5000;
/*   .connect(process.env.CONNECTION_URL) */
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// http://www.mongodb.com/cloud/atlas
