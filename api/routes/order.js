import express from "express";
const router = express.Router();

import { neworder, updateOrder, getIncome,get0rder,getAllorders,deleteOrder } from "../controllers/order.js";
import { verifyToken, verifyTokenAndAdmin, veritokenAndAutorization } from "../verifyToken.js";



router.post("/neworder",verifyToken, neworder );
//update Order 
router.put("/:id", verifyTokenAndAdmin, updateOrder)

//DELETE ORDER
router.delete("/:id",verifyTokenAndAdmin, deleteOrder)
//GET ORDER
router.get("/find/:userId", veritokenAndAutorization, get0rder)
//GET ALL ORDER
router.get("/", verifyTokenAndAdmin, getAllorders)
// GET INCOME 
router.get("/income", verifyTokenAndAdmin, getIncome );





export default router; 