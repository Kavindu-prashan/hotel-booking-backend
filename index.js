// index.js
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';
import galleryItemRouter from './routes/galleryItemRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import roomRouter from './routes/roomRoute.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
const app = express();

const connectionString = process.env.MONGO_URL;


mongoose.connect(connectionString).then(
    ( )=> {
        console.log("Connect to the Database");
    },

).catch(
    ()=>{
        console.log("Failed to connect");
    }
)

app.use(bodyParser.json());

app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = decoded; // Set decoded payload to req.user
        next();
      });
    } else {
      next();
    }
  });
  


app.use("/api/users", userRouter);

app.use("/api/gallery", galleryItemRouter);

app.use("/api/category",categoryRouter);

app.use("/api/rooms", roomRouter);






app.listen(5000, () => {
    console.log("Server listening on port 5000");
});
