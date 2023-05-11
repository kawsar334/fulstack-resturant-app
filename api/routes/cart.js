import express from "express";
import { addCart, updateCart, deleteCart, getuserCart, getAllCarts } from "../controllers/cart.js";
import { verifyToken, verifyTokenAndAdmin } from "../verifyToken";
const router = express.Router();


//creat New cart 
router.post("/addcart", verifyToken, addCart);

//update cart 
router.put("/:id", verifyTokenAndAdmin, updateCart)

//delete cart 
router.delete("/:id", verifyTokenAndAdmin, deleteCart)
// get user cart 
router.get("/findd/:userId", getuserCart,)
router.get("/", verifyTokenAndAdmin, getAllCarts);




export default router; 