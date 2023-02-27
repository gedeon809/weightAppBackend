import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import weightRoutes from "./routes/weight.js";
import authRoutes from "./routes/auth.js";


const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
// connect to my MongoDB server
const connect = () => {
    mongoose
      .connect(process.env.MONGO)
      .then(() => {
        console.log("Connected to DB");
      })
      .catch((err) => {
        throw err;
      });
  };
app.listen(PORT, () => {
    connect();
  console.log(`Server is running on port ${PORT}`);
});
//middleware
app.use(cookieParser())
//allowing the app to take a json file from outside
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/weight", weightRoutes);

//Handling errors with express
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });
