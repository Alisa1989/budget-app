const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const config = require("config");

const User = require('../models/userModel');

// @desc Register new user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler (async (req, res) => {
    if(req.body.googleAccessToken){
        //google auth
        axios.get("https://www.googleapis.com/oauth2/v3/uderinfo", {
            headers:{
                "Authorization": `Bearer ${req.body.googleAccessToken}`
            }
        }).then(async response => {
            const email = response.data.email;

            const user = await User.findOne({email})
            if(user){
                return res.statusMessage(400).json({message: "user already exists!"})
            }
            const result = await User.create(email);

            res.status(200).json({result, token: user._id})
        }).catch(err=>{
            res.status(400).json({message: "Invalid Information! ", err})
        })
    } else {
        //email
        const {email, password} = req.body;
        if (!email || !password){
            res.status(400).json({Error: "All fields are mandatory!"})
        }
        const existingUser = await User.findOne({email});
        if (existingUser) {
            res.status(400).json({Error: "User already exists!"})
        }
        
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            email,
            password: hashedPassword
        })
        
        console.log(`User created: ${user}`);

        if (user) {
            res.status(201).json({
                _id: user._id, 
                email: user.email, 
                token: generateToken(user._id)});
        } else {
            res.status(400).json({Error: "User was not created"})
        }
    }
});


// @desc login user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler (async (req, res) => {
    if(req.body.googleAccessToken){
        //google
        axios.get("https://www.googleapis.com/oauth2/v3/uderinfo", {
            headers:{
                "Authorization": `Bearer ${req.body.googleAccessToken}`
            }
        }),then(async response => {
            const email = response.data.email;

            const user = await User.findOne({email})

            if(!user){
                return res.statusMessage(400).json({message: "user already exists!"})
            }

            res.status(200).json({result: alreadyExistUser, token: generateToken(user._id)})
        })

    } else {
        //email
        const { email, password } = req.body;
        if (!password || !email) {
            res.status(400).json({Error: "All fields are mandatory!"});
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(201).json({
                _id: user._id, 
                email: user.email, 
                token: generateToken(user._id)});            
        } else {
            res.status(400).json({Error: "Invalid credentials"});
        }
    }
});


// @desc get user data
// @route POST /api/users/getuser
// @access private
const getUser = asyncHandler (async (req, res) => {
    res.status(200).json(req.user)
});


//generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {registerUser, loginUser, getUser};