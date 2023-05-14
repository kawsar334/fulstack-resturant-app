import express from "express";
import { addProduct, updateProduct, deleteProduct, getAllProducts, getProduct, getbyCategory } from "../controllers/product.js";
import { verifyTokenAndAdmin } from "../verifyToken.js";
const router = express.Router();

router.post("/addproduct", verifyTokenAndAdmin, addProduct);
// UPDATE PRODUCT
router.put("/:id", verifyTokenAndAdmin, updateProduct)
// DELETE PRODUCT 
router.delete("/:id", verifyTokenAndAdmin, deleteProduct)
// GET SINGLE PRODUCT 
router.get("/find/:id", getProduct);
//GET ALL PRODUCTS 
router.get("/", getAllProducts);
router.get("/category", getbyCategory);

export default router; 