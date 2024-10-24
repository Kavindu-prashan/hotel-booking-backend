import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export const postUser = async (req, res) => {
    try {
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      const user = req.body;
      const saltRounds = 10;
      const passwordHash = bcrypt.hashSync(user.password, saltRounds);
      user.password = passwordHash;
  
      const newUser = new User(user);
      await newUser.save();
  
      res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        message: "User creation failed",
        error: error.message,
      });
    }
  };
  


export function loginUser(req, res) {
    const credentials = req.body;
  
    User.findOne({ email: credentials.email }).then((user) => {
  
      if (user == null) {
        res.status(403).json({
          message: 'User not found',
        });
      } else {
        const isPasswordValid = bcrypt.compareSync(credentials.password, user.password);
  
        if (!isPasswordValid) {
          res.status(403).json({
            message: 'Incorrect password',
          });
        } else {
          const payload = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            type: user.type,
          };
  
          const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '48h' });
  
          res.json({
            message: 'User found',
            user: user,
            token: token,
          });
        }
      }
    });
  }
  export function isAdminValid(req){

    if(req.user == null){
      return false
    }
    if(req.user.type != "admin"){
      return false
    }
    return true;
    
  }
  export function isCustomerValid(req){
  
    if(req.user == null){
      return false
    }
    console.log(req.user)
    if(req.user.type != "customer"){
      return false
    }
  
    return true;
    
  }