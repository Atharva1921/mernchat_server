import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"

const protect = asyncHandler( async (req,res,next) => {
    try {
        const token = req.cookies.jwt_token;
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET); //returns object with id in verify token
        const rootUser = await  User.findById(verifyToken.id);


        if(!rootUser) {
            throw new Error('User not found')
        }

        req.body = rootUser
        


        next();
        
    } catch (error) {
        res.status(401).json({
            message:'Unauthorized:No token provided!'
        })
        console.log(error);
    }
});

export default protect;