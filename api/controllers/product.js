// ,
import { Product } from "../models/Product.js"
import { User } from "../models/User.js";

//ADD PRODUCT
export const addProduct = async (req, res, next) => {
    try {
        const newProduct = new Product({ ...req.body, userId: req.user.id });
        const saveProduct = await newProduct.save();
        const admins = await User.find({ isAdmin: true });
        const data = {
            message:`Created New product `,
            product:saveProduct
        }
      
    const lists = await Promise.all(admins.map((admin)=>{
            return User.findOneAndUpdate(admin, {$push:{notification:{...data}}});
       }));

        res.status(200).json({
                message: "product created successfully",
                saveProduct, 
                success: true,

            });
       
       
    } catch (err) {
        next(err);
    }
}

//UPDATE PORDUCT
export const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({
            message: "product hasbeen updated !",
            updatedProduct,
            success: true
        });
    } catch (err) {
        next(err);
    }
}


//DELETE PORDUCT
export const deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            res.status(200).json({
                message: "product not not found",
                success: false,
            });
        } else {
            res.status(200).json(
                {
                    message: "product deleted sucessfullly ",
                    success: true,
                }
            )
        }

    } catch (err) {
        next(err);
    }
}

//get PORDUCT
export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({
            message: "product details ",
            success: true,
            product
        });
    } catch (err) {
        next(err);
    }
}

//get all  PORDUCT
export const getAllProducts = async (req, res, next) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(8)
        } else if (qCategory) {
            products = await Product.find({ categories: { $in: [qCategory] } }).limit(8)
        } else {
            products = await Product.find().limit(8);
        }
        res.status(200).json({
            message: "All products lists",
            products,
            success: true
        });
    } catch (err) {
        next(err);
    }
}


export const getbyCategory = async(req, res, next)=>{
    try{    
       

    }catch(err){
        next(err)
    }
}


            