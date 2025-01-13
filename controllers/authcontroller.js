/**
 * Register
 */

import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async(req,res)=>{
    try{
        const {name,email,password,age} = req.body;
        console.log(req.body)
        if(!name || !email || !password || !age){
            return res.status(404).json({
                message:"All fields are required"
            });
        }
        /* Check if user already exists */
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                message: "Email already registered",
            });
        }
        /* Hash the password */
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        /* Make a new user & save it */
        const newUser = new User({
            name,email,password:hashedPassword,age
        });
        await newUser.save();
        /* Return the JSON Value */
        res.status(200).json({
            message:"User registered successfully"
        });
    }
    catch(error){
        res.status(500).json({
            message:"Internal Server Error"
        });
    }
}


/**
 * Login
 */

export const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "All fields are mandatory"
            });
        }
        /* Check if user exists */
        const user = await User.findOne({email});
        if(!user){
           return res.status(404).json({
                message: "User not found"
            });
        }
        /* Check if password matches */
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(401).json({
                message: "Invalid Credentials"
            });
        }
        /* Generate token & start the session*/
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN || '1h'}
        );
        console.log(token)
        user.token = token;
        await user.save();
        res.status(200).json({token,user:{
            id: user._id,
            name: user.name,
            email: user.email,
            age: user.age
        }});    
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * Logout
 */

export const logout = async(req, res)=>{
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({
                msg: "User not found"
            });
        }
        user.token = "";
        await user.save();
        res.status(200).json({
            msg: "Logged out successfully"
        });
    }
    catch(error){
       console.log(error)
        }
    }
