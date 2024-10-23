// index.js

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';
import galleryItemRouter from './routes/galleryItemRoute.js';
import jwt from 'jsonwebtoken'

const app = express();

const connectionString = "mongodb+srv://tester:123@cluster0.ty3wd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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

app.use((req, res, next) =>{
    const token =req.header("Authorization")?.replace("Bearer","")
    if(token!=null){
        jwt.verify(token,"secret",(err,decoded)=>{
            if(decoded==null){
                req.user = decoded;
                console.log(decoded);
                next();
            }
        });
    }else{
        next();
    }
})


app.use("/api/users", userRouter);

app.use("/api/gallery", galleryItemRouter);


app.listen(5000, () => {
    console.log("Server listening on port 5000");
});
