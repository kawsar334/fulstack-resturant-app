import express from "express";
import { updateUser, deleteUser, getAllUsers, getUser, getUserStats } from "../controllers/user.js";
import { verifyToken, verifyTokenAndAdmin, veritokenAndAutorization } from "../verifyToken.js";
const router = express.Router();


//UPDATE USER
router.put("/:id", veritokenAndAutorization, updateUser)
//DELETE USER
router.delete("/:id", verifyToken, deleteUser)
//GET USER
router.get("/find/:id",verifyToken, getUser)
// GET ALL USERS 
router.get("/", verifyTokenAndAdmin, getAllUsers)
router.get("/stats", getUserStats)
 
export default router; 