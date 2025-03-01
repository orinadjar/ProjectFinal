import asyncHandler from "../middleware/asyncHandler.js" // Importing the asyncHandler utility
import User from "../models/userModel.js"
import jwt from 'jsonwebtoken';

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req,res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email: email }); // finds the email from the db
    const passwordChack = await user.matchPassword(password); // chacks if passwords are the same in the userModel
    
    if (user && passwordChack) {

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { 
            expiresIn: '30d'
         });

        // set JWT as HTTP only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milisecondes
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    console.log(req.body);

});

// @desc Registr user 
// @route POST /api/users
// @access Public
const registrUser = asyncHandler(async (req,res) => {

    res.send('register user');

});

// @desc Logout User / clear the cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req,res) => {

    res.send('logout user');

});


// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req,res) => {

    res.send('get user profile');

});


// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req,res) => {

    res.send('update user profile');

});


// @desc GET users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req,res) => {

    res.send('Users');

});

// @desc DELETE users
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req,res) => {

    res.send('DELETE user');

});


// @desc GET user by id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req,res) => {

    res.send('get user by id');

});

// @desc Update user
// @route UPDATE /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req,res) => {

    res.send('Update user by id');

});


export {
    authUser,
    registrUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    updateUser,
    getUserById, 
}