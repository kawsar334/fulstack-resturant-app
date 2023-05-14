import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    username: { type: String, required: true, },
    email: { type: String, required: true, },
    password: { type: String, required: true },
    img:{
        type:String,
        default:""
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    notification:{
        type:Array,
        default:[]
    },
    seenNotificaton:{
        type:Array,
        default:[]
    }


}, { timestamps: true });


export const User = mongoose.model("User", userSchema)