import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    'name':{
        type:String,
    },
    'email':{
        type:String,
    },
    'password':{
        type:String,
    },
    'role':{
        type:String,
        enum:['super_admin', 'admin', 'user'],
        default:'user'
    },
    'token':{
        type:String,
    },
    'amount':{
        type:Number,
        default: 0
    },
    'available_posts_count':{
        type: Number,
        default:0
    }
});

const User = mongoose.model('User', userSchema)
export { User }