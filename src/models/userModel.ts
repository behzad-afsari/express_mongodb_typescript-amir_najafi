import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String, 
    email: String,
    password: String,
    age: {
        type: Number,
        default : 0
    },
    birthDay: Date,
    site: String
})

const userModel = mongoose.model('users', userSchema)

export default userModel
