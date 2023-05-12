import express from "express";
import env from "dotenv";
import { database } from "./db.js";
env.config();
const PORT = process.env.PORT;
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"
import orderRoute from "./routes/order.js"
import productRoute from "./routes/product.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename,)

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


app.use("/api/auth/", authRoute)
app.use("/api/user/", userRoute);
app.use("/api/order/", orderRoute)
app.use("/api/product/", productRoute);

// file upload 

const uploadfiles = "./uploads/";

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, uploadfiles)
    },
    filename:(req, file, cb)=>{
        
        const name = Date.now() +"-"+file.originalname
        cb(null,name)
    }
}); 

const upload= multer({storage:storage});

  
app.post("/api/photo/", upload.single("file"), (req, res,)=>{
    
    try{
        res.status(200).json("file uploaded "); 
    }catch(err){
        console.log(err);
    }

})


//MIDDLEWARE 
app.use((err, req, res, next) => {
    const message = err.message || "something went wrong";
    const status = err.status || 500;

    return res.status(status).json({
        message,
        status,
        success: false,
    });
});

//connection database 
database();

//connecting server 
app.listen(PORT, () => {
    console.log(`server running on port number ${PORT}`)
})
