import User from "../models/userModel.js";
import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import generateToken from "../config/generateToken.js";



const showUser = asyncHandler( async (req,res) => {
    const ID = req.query.userID
    try {
        const user = await User.findById(ID)
        const friend = {'id': user._id,'name' : user.name,
        'email' : user.email}
    if(user) {
    res.status(200).json(friend)
    }
    } catch (error) {
        res.status(500).json(error)
    }
    

});

const registerUser = asyncHandler( async (req,res) => {
    const {name,email,password,confirmpassword} = req.body 
    const userExists = await User.findOne({email});

    if(!name || !email || !password || !confirmpassword) {
        res.status(400).json({
            message: 'Please enter all the fields'
        });
        throw new Error('please enter all the fields');
    }
    else if(password !== confirmpassword) {
        res.status(400).json({
            message: 'Passwords do not match!'
        });
        throw new Error('Passwords do not match');
    } 
    else if(userExists) {
        res.status(400).json({
            message: 'User already exists'
        });
        throw new Error("User already exists");
    }
    else{
        const round = parseInt(process.env.ROUND)
        const salt = await bcrypt.genSalt(round);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        res.status(200).json(user)
    }
    
    

});

const loginUser = asyncHandler( async (req,res) => {
    const {email,password} = req.body;
    const userExists = await User.findOne({email});
    
    if(!email || !password) {
        res.status(400).json({
            message: 'Please enter all the fields'
        })
        throw new Error('Please enter all the fields');
    }
    else if(userExists && (await bcrypt.compare(password,userExists.password))) {
        //generate token
        const token = await generateToken(userExists._id)
        //send cookie
        res.cookie("jwt_token",token,{ expires: new Date(Date.now() + 86400000) ,httpOnly:true,});
        //console.log(token)
        res.status(201).json({
            user: userExists.name,
            message: 'Login Succesfull'
        })
    }
    else{
        res.status(400).json({
            message: 'Invalid Email or Password'
        })
        throw new Error('Invalid email or password');
    }
    
    
    res.status(200).json()
});

const searchUser = asyncHandler( async (req,res) => {

    try {
        const search = await User.find({
           
            email:{$regex:req.params.key}
        })    
        res.send(search);
    } catch (error) {
        res.json(error)
    }
    
    
});

const logoutUser = asyncHandler( async (req,res) => {
    
    try {
        res.clearCookie("jwt_token");
        res.status(200).json({ message: 'Logged out successfully!'})
    } catch (error) {
        res.status(500).json(error)
    }
    

});





export {showUser,registerUser,loginUser, searchUser,logoutUser};