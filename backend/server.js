// const express=require('express');
import path from 'path'
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import messageRoute from "./routes/message.routes.js";
import userRoute from "./routes/user.routes.js";
import connectTOMongoDB from "./db/connectionMongoDb.js";
import {app,server} from './socket/socket.js';

const __dirname = path.resolve()
dotenv.config();

// const app = express();
app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use ("/api/messages",messageRoute)
app.use ("/api/users",userRoute);

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

// userRoute

server.listen(process.env.PORT, () => {
  connectTOMongoDB()
//   mongoose.connect("mongodb://0.0.0.0:27017/mern_chat_app");
//   mongoose.connect(process.env.MONGO_URI)
  console.log(`listening on port ${process.env.PORT}...`);
});
