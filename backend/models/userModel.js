import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },

}, {
    timestamps: true,  // Automatically add createdAt and updatedAt fields
    // the timestamps option is placed inside the schema options object, which is the second argument passed to mongoose.Schema()
});

// Create the User model based on the schema
const User = mongoose.model("User", userSchema);

export default User;