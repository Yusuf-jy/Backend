import mongoose from'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    },
    age:{
        type: Number,
    },
    token:{
        type: String,
        
    },
},{timestamps: true})

const User = mongoose.model("User",userSchema)
export default User;