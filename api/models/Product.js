import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array },
    price: { type: Number, required: true },
    isStack: {
        type: Boolean,
        default: true,
    },
    feedback: {
        type: [String],

    }

}, { timestamps: true });
export const Product = mongoose.model("Product", ProductSchema)