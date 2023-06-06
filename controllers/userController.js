const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { use } = require("../routes/contactRoutes");

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    
    if(!username || !email || !password)
    {
        res.status(404);
        throw new Error("All fields are mandatory");
    }

    const userAviable = await User.findOne({email});
    if(userAviable){
        res.status(404);
        throw new Error('User already register');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password:hashPassword
    })

    if(user){
        res.status(201);
        res.json({_id:user.id, email:user.email});
    }
    else
    {
        res.status(400);
        throw new Error('User data not valid');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password)
    {
        res.status(401);
        throw new Error('All fields are mandatory');
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessTocken = jwt.sign(
        {
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
        },
        process.env.ACCESS_TOCKEN_SECRATE,
        {expiresIn:"30m"}
        );  
        res.status(201).json({accessTocken})
    }
    else
    {
        res.status(401);
        throw new Error('Invalid Username & Passsword');
    }

    res.json({message : 'login user'})
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {registerUser, loginUser, currentUser}