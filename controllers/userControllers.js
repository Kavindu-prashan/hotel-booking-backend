import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export const postUser = async (req, res) => {  
    try {
        const user = req.body;
        const password = req.body.password;

        const saltRounds = 10;
        const passwordHash = bcrypt.hashSync(password,saltRounds);

        console.log(passwordHash); 
        user.password = passwordHash

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


export const loginUser = async (req, res) => {
    
    const credentials = req.body

    try {
        const { email, password } = req.body;  

       
        const user = await User.findOne({ email, password });

        if (!user) {
            
            return res.status(403).json({
                message: "User not found",
            });
        }else{
            const isPasswordValid = bcrypt.compareSync(credentials.password, user.password);
        }
            if (!isPasswordValid) {
                res.status(403).json({
                    message: "Invalid password",
                });
            }else{
                
            

      
        const payload = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            type: user.type,
        };

        
        const token = jwt.sign(payload,process.env.JWT_KEY, { expiresIn: "1h" });
        

       
        res.status(200).json({
            message: "User found",
            user: user,  
            token: token, 
        });
        }
    
    } catch (error) {
       
        console.error("Error logging in user:", error);
        res.status(500).json({
            message: "Login failed",
            error: error.message,  
        });
    }
    
};
