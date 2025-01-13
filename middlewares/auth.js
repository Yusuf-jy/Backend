import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if(!token || !token.startsWith("Bearer ")){
            return res.status(401).json({
                message: "No token, authorization denied"
            });
        }
        
        const tokenPart = token.split(" ")[1];
        if(!tokenPart){
            return res.status(401).json({
                message: "Token format is invalid"
            });
        }

        const verified = jwt.verify(tokenPart, process.env.JWT_SECRET);
        const user = await User.findById(verified.id);
        if(!user || user.token !== tokenPart){
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }

        req.user = { id: user._id, name: user.name, email: user.email };
        next();

    } 
    catch(error){
        res.status(401).json({
            message: "Token is invalid or expired"
        });
    }
};

export default auth;