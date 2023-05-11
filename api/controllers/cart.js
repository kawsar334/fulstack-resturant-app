
import { Cart } from "../models/Cart.js";


//add cart 
export const addCart = async (req, res, next) => {
    try {
        const cart = new Cart({ ...req.body, userId: req.user.id })
        const saveCart = cart.save();
        res.status(200).json({
            message: "your cart",
            saveCart,
            success: true
        })
    } catch (err) {
        next(err);
    }
};
//update cart 
export const updateCart = async (req, res, next) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({
            message: "cart updated successfully !", updatedCart,
            success: true
        })
    } catch (err) {
        next(err);
    }
};
//delete cart 
export const deleteCart = async (req, res, next) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Deleted successfully !",
            success: true,

        });
    } catch (err) {
        next(err);
    }
};


//getuserCart
export const getuserCart = async(req, res,next)=>{
    try{
        const cart = await Cart.findOne(req.params.userId);
        if(!cart){
            return res.status(200).json({
                message:"cart Not found ",
                success:false
            })
        }else{
            res.status(200).json({
                message:"your cart ",
                cart,
                success:true,
            })
        }

    }catch(err){
        next(err);
    }
}



//get all users cart
export const getAllCarts = async(req, res,next )=>{
    try{
        const carts = await Cart.find();
        res.status(200).json({
            message:"users cart lists ",
            carts,
            success:true,
        });
    }catch(err){
        next(err)
    }
}