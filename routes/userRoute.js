
import express from 'express';
import { postUser, loginUser } from '../controllers/userControllers.js';


const userRouter = express.Router();


userRouter.post("/", postUser);        
userRouter.post("/login", loginUser);  

export default userRouter;


