import mongoose from "mongoose";

const MySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  age:{
    type:Number,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Users = new mongoose.model('Users',MySchema);


export default Users;
