import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import notificationsRoutes from "./routes/notifications.js";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();


dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/notifications", notificationsRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to Vita Bucolica API");
});
const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;
/*   .connect(process.env.CONNECTION_URL) */
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
  httpServer.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
  const httpServer = createServer(app);
  const io = new Server(httpServer, { /* options */ });
  let interval;

  io.on("connection", (socket) => {
    console.log("Client connected " + socket.id);
    if (interval) {
      clearInterval(interval);
    }
    /* interval = setInterval(() => getApiAndEmit(socket), 1000); */
    socket.on("connectionTags", (arg) => {
      if(arg) { socket.join(arg);
      console.log("la " + socket.id + " ha joinato le stanze " + arg) }
      ;
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });
    
  app.set("io", io);

  export default app;
