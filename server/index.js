import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

//Routes
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";

const app = express();
dotenv.config();

//MiddleWare
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@library-cluster.cvuhikl.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );

    app.listen(PORT, () => {
      console.log("server started on port" + PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
