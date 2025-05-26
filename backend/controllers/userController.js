import asyncHandler from "../middleware/asyncHandler.js" // Importing the asyncHandler utility
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req,res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email: email }); // finds the email from the db
    const passwordChack = await user.matchPassword(password); // chacks if passwords are the same in the userModel
    
    if (user && passwordChack) {

        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            easterPerk: user.toObject().easterPerk,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    console.log(user);
});

// @desc Logout User / clear the cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req,res) => {

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({  message: 'Logged out successfully' })
});

// @desc Registr user 
// @route POST /api/users
// @access Public
const registrUser = asyncHandler(async (req,res) => {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error('There is alreasy a User with this email');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req,res) => {

    const user = await User.findById(req.user._id);

    if (user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            easterPerk: user.toObject().easterPerk,
        });
    }else {
        res.status(404);
        throw new Error('User not found');
    }

    console.log(user)

});


// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req,res) => {

    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }
    }else{
        res.status(404);
        throw new Error('User not found');
    }

    const updatedUser = await user.save();

    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
    })

});


// @desc GET users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req,res) => {

    const users = await User.find({});

    if (users.length > 0) {
        res.status(200).json(
            users.map(user => ({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            }))
        );
    }else{
        res.status(404);
        throw new Error('there are no users');
    }

});

// @desc DELETE users
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req,res) => {

    const user = await User.findById(req.params.id);

    if(user){
        if(!user.isAdmin){
            await user.deleteOne({ _id: user._id });
            res.status(200).json({ message: 'User deleted successfully' });
        }
        else{
            res.status(400);
            throw new Error("Cannot delete admin user!");
        }   
    } 
    else {
        res.status(404);
        throw new Error("User not fount!");s
    }

});


// @desc GET user by id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req,res) => {

    const user = await User.findById(req.params.id);

    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            easterPerk: user.easterPerk,
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }

});

// @desc Update user
// @route UPDATE /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req,res) => {

    const user = await User.findById(req.params.id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin) || user.isAdmin;

        const updatedUser = await user.save();

        res.status(200).json({ 
            _id: updateUser._id,
            name: updateUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Unlock Easter Egg Perk
// @route POST /api/users/unlock-perk
// @access Private
const unlockEasterPerk = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      user.easterPerk = 'rainbow'; 
      await user.save();
      res.status(200).json({ message: '🎉 You unlocked a special perk!' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
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
    unlockEasterPerk,
}